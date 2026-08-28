import { beforeEach, describe, expect, it, vi } from "vitest";

const { listProjectInquiriesMock, listAssistantFollowUpsMock } = vi.hoisted(() => ({
  listProjectInquiriesMock: vi.fn(),
  listAssistantFollowUpsMock: vi.fn(),
}));

vi.mock("./db", () => ({
  createProjectInquiry: vi.fn(),
  createAssistantFollowUp: vi.fn(),
  listProjectInquiries: listProjectInquiriesMock,
  listAssistantFollowUps: listAssistantFollowUpsMock,
}));

import { appRouter } from "./routers";

describe("admin lead review", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listProjectInquiriesMock.mockResolvedValue([]);
    listAssistantFollowUpsMock.mockResolvedValue([]);
  });

  it("rejects a non-admin from reading lead records", async () => {
    const caller = appRouter.createCaller({ user: { role: "user" } } as never);
    await expect(caller.admin.leads()).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(listProjectInquiriesMock).not.toHaveBeenCalled();
  });

  it("returns inquiries and follow-ups only for the owner role", async () => {
    listProjectInquiriesMock.mockResolvedValue([{ id: 7, email: "client@example.com" }]);
    listAssistantFollowUpsMock.mockResolvedValue([{ id: 11, email: "visitor@example.com" }]);
    const caller = appRouter.createCaller({ user: { role: "admin" } } as never);
    await expect(caller.admin.leads()).resolves.toEqual({ inquiries: [{ id: 7, email: "client@example.com" }], followUps: [{ id: 11, email: "visitor@example.com" }] });
  });
});
