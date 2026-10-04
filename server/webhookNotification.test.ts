import { beforeEach, describe, expect, it, vi } from "vitest";
import { dispatchWebhookNotification } from "./_core/notification";

describe("Webhook Notifications", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("formats Discord embeds correctly when given a discord webhook URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const payload = {
      title: "New project inquiry: RAG knowledge system",
      content: "Client: Alice (alice@example.com)\nBudget: $1,500 – $5,000",
    };

    const result = await dispatchWebhookNotification(
      payload,
      "https://discord.com/api/webhooks/123/abc"
    );

    expect(result).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const callArgs = fetchMock.mock.calls[0];
    expect(callArgs[0]).toBe("https://discord.com/api/webhooks/123/abc");
    const sentBody = JSON.parse(callArgs[1].body);
    expect(sentBody.embeds).toBeDefined();
    expect(sentBody.embeds[0].title).toBe("🎯 New project inquiry: RAG knowledge system");
    expect(sentBody.embeds[0].description).toContain("Client: Alice");
  });

  it("formats Slack messages correctly when given a slack webhook URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const payload = {
      title: "Assistant follow-up request",
      content: "Email: visitor@example.com",
    };

    const result = await dispatchWebhookNotification(
      payload,
      "https://hooks.slack.com/services/T00/B00/X00"
    );

    expect(result).toBe(true);
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.text).toContain("*🎯 Assistant follow-up request*");
    expect(sentBody.text).toContain("Email: visitor@example.com");
  });

  it("handles delivery failure gracefully without throwing", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network timeout"));
    vi.stubGlobal("fetch", fetchMock);

    const result = await dispatchWebhookNotification(
      { title: "Test", content: "Test" },
      "https://example.com/webhook"
    );

    expect(result).toBe(false);
  });
});
