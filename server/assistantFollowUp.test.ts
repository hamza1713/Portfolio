import { beforeEach, describe, expect, it, vi } from "vitest";

const { createAssistantFollowUpMock, notifyOwnerMock } = vi.hoisted(() => ({
  createAssistantFollowUpMock: vi.fn(),
  notifyOwnerMock: vi.fn(),
}));

vi.mock("./db", () => ({
  createProjectInquiry: vi.fn(),
  createAssistantFollowUp: createAssistantFollowUpMock,
}));
vi.mock("./_core/notification", () => ({ notifyOwner: notifyOwnerMock }));

import { appRouter, assistantFollowUpInput } from "./routers";

describe("assistant follow-up", () => {
  const request = { email: "visitor@example.com", website: "", startedAt: Date.now() - 5_000 };

  beforeEach(() => {
    vi.clearAllMocks();
    createAssistantFollowUpMock.mockResolvedValue(undefined);
    notifyOwnerMock.mockResolvedValue(true);
  });

  it("accepts a consent-based email request", () => {
    expect(assistantFollowUpInput.safeParse(request).success).toBe(true);
  });

  it("stores the follow-up email and notifies the owner", async () => {
    const caller = appRouter.createCaller({} as never);
    await expect(caller.assistantFollowUp.request(request)).resolves.toEqual({ success: true });
    expect(createAssistantFollowUpMock).toHaveBeenCalledWith({ email: request.email });
    expect(notifyOwnerMock).toHaveBeenCalledWith(expect.objectContaining({ title: "Portfolio assistant follow-up request" }));
  });

  it("silently drops honeypot requests", async () => {
    const caller = appRouter.createCaller({} as never);
    await expect(caller.assistantFollowUp.request({ ...request, website: "https://spam.example" })).resolves.toEqual({ success: true });
    expect(createAssistantFollowUpMock).not.toHaveBeenCalled();
    expect(notifyOwnerMock).not.toHaveBeenCalled();
  });
});
