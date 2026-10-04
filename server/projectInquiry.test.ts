import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  createProjectInquiryMock,
  createAssistantFollowUpMock,
  notifyOwnerMock,
} = vi.hoisted(() => ({
  createProjectInquiryMock: vi.fn(),
  createAssistantFollowUpMock: vi.fn(),
  notifyOwnerMock: vi.fn(),
}));

vi.mock("./db", () => ({
  createProjectInquiry: createProjectInquiryMock,
  createAssistantFollowUp: createAssistantFollowUpMock,
}));
vi.mock("./_core/notification", () => ({ notifyOwner: notifyOwnerMock }));

import { appRouter, projectInquiryInput } from "./routers";
import { globalRateLimiter } from "./_core/rateLimiter";

describe("project inquiry input", () => {
  const validInquiry = {
    name: "Aisha Khan",
    email: "aisha@example.com",
    company: "Example Co",
    projectType: "RAG knowledge system",
    budget: "$500 – $1,500",
    timeline: "This month",
    details:
      "We need a source-aware support assistant for a collection of product and policy documents.",
    website: "",
    startedAt: Date.now() - 5_000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    globalRateLimiter.reset();
    createProjectInquiryMock.mockResolvedValue(undefined);
    createAssistantFollowUpMock.mockResolvedValue(undefined);
    notifyOwnerMock.mockResolvedValue(true);
  });

  it("accepts an inquiry with budget and expected timeline", () => {
    expect(projectInquiryInput.safeParse(validInquiry).success).toBe(true);
  });

  it("rejects a submission with an unsupported budget", () => {
    expect(
      projectInquiryInput.safeParse({ ...validInquiry, budget: "No limit" })
        .success
    ).toBe(false);
  });

  it("stores a valid inquiry and alerts the portfolio owner", async () => {
    const caller = appRouter.createCaller({} as never);

    await expect(caller.projectInquiry.submit(validInquiry)).resolves.toEqual({
      success: true,
    });
    expect(createProjectInquiryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: validInquiry.name,
        email: validInquiry.email,
        projectType: validInquiry.projectType,
        budget: validInquiry.budget,
        timeline: validInquiry.timeline,
        details: validInquiry.details,
      })
    );
    expect(notifyOwnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New project inquiry: RAG knowledge system",
        content: expect.stringContaining("Budget: $500 – $1,500"),
      })
    );
  });

  it("silently drops a honeypot submission without storing or notifying", async () => {
    const caller = appRouter.createCaller({} as never);
    await expect(
      caller.projectInquiry.submit({
        ...validInquiry,
        website: "https://spam.example",
      })
    ).resolves.toEqual({ success: true });
    expect(createProjectInquiryMock).not.toHaveBeenCalled();
    expect(notifyOwnerMock).not.toHaveBeenCalled();
  });

  it("does not confirm or notify when durable storage fails", async () => {
    createProjectInquiryMock.mockRejectedValue(
      new Error("Database unavailable")
    );
    const caller = appRouter.createCaller({} as never);
    await expect(
      caller.projectInquiry.submit(validInquiry)
    ).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      message: expect.stringContaining("could not be saved"),
    });
    expect(notifyOwnerMock).not.toHaveBeenCalled();
  });

  it("confirms a stored inquiry even when notification fails", async () => {
    notifyOwnerMock.mockRejectedValue(
      new Error("Notification provider unavailable")
    );
    const caller = appRouter.createCaller({} as never);
    await expect(caller.projectInquiry.submit(validInquiry)).resolves.toEqual({
      success: true,
    });
    expect(createProjectInquiryMock).toHaveBeenCalledTimes(1);
    expect(createProjectInquiryMock.mock.invocationCallOrder[0]).toBeLessThan(
      notifyOwnerMock.mock.invocationCallOrder[0]
    );
  });

  it("waits for storage to finish before notifying or returning success", async () => {
    let finishSave!: () => void;
    createProjectInquiryMock.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          finishSave = resolve;
        })
    );
    const pending = appRouter
      .createCaller({} as never)
      .projectInquiry.submit(validInquiry);
    await vi.waitFor(() =>
      expect(createProjectInquiryMock).toHaveBeenCalledTimes(1)
    );
    expect(notifyOwnerMock).not.toHaveBeenCalled();
    finishSave();
    await expect(pending).resolves.toEqual({ success: true });
    expect(notifyOwnerMock).toHaveBeenCalledTimes(1);
  });
});
