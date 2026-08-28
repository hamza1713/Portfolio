import { beforeEach, describe, expect, it, vi } from "vitest";

const { createProjectInquiryMock, createAssistantFollowUpMock, notifyOwnerMock } = vi.hoisted(() => ({
  createProjectInquiryMock: vi.fn(),
  createAssistantFollowUpMock: vi.fn(),
  notifyOwnerMock: vi.fn(),
}));

vi.mock("./db", () => ({ createProjectInquiry: createProjectInquiryMock, createAssistantFollowUp: createAssistantFollowUpMock }));
vi.mock("./_core/notification", () => ({ notifyOwner: notifyOwnerMock }));

import { appRouter, projectInquiryInput } from "./routers";

describe("project inquiry input", () => {
  const validInquiry = {
    name: "Aisha Khan",
    email: "aisha@example.com",
    company: "Example Co",
    projectType: "RAG knowledge system",
    budget: "$500 – $1,500",
    timeline: "This month",
    details: "We need a source-aware support assistant for a collection of product and policy documents.",
    website: "",
    startedAt: Date.now() - 5_000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    createProjectInquiryMock.mockResolvedValue(undefined);
    createAssistantFollowUpMock.mockResolvedValue(undefined);
    notifyOwnerMock.mockResolvedValue(true);
  });

  it("accepts an inquiry with budget and expected timeline", () => {
    expect(projectInquiryInput.safeParse(validInquiry).success).toBe(true);
  });

  it("rejects a submission with an unsupported budget", () => {
    expect(projectInquiryInput.safeParse({ ...validInquiry, budget: "No limit" }).success).toBe(false);
  });

  it("stores a valid inquiry and alerts the portfolio owner", async () => {
    const caller = appRouter.createCaller({} as never);

    await expect(caller.projectInquiry.submit(validInquiry)).resolves.toEqual({ success: true });
    expect(createProjectInquiryMock).toHaveBeenCalledWith(expect.objectContaining({
      name: validInquiry.name,
      email: validInquiry.email,
      projectType: validInquiry.projectType,
      budget: validInquiry.budget,
      timeline: validInquiry.timeline,
      details: validInquiry.details,
    }));
    expect(notifyOwnerMock).toHaveBeenCalledWith(expect.objectContaining({
      title: "New project inquiry: RAG knowledge system",
      content: expect.stringContaining("Budget: $500 – $1,500"),
    }));
  });

  it("silently drops a honeypot submission without storing or notifying", async () => {
    const caller = appRouter.createCaller({} as never);
    await expect(caller.projectInquiry.submit({ ...validInquiry, website: "https://spam.example" })).resolves.toEqual({ success: true });
    expect(createProjectInquiryMock).not.toHaveBeenCalled();
    expect(notifyOwnerMock).not.toHaveBeenCalled();
  });
});
