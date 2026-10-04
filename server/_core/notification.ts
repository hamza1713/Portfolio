import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const buildEndpointUrl = (baseUrl: string): string => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

export async function dispatchWebhookNotification(
  payload: NotificationPayload,
  targetUrl?: string
): Promise<boolean> {
  const url =
    targetUrl ||
    process.env.LEAD_NOTIFICATION_WEBHOOK ||
    process.env.ERROR_NOTIFICATION_WEBHOOK ||
    ENV.errorWebhook;
  if (!url) return false;

  const isDiscord = url.includes("discord.com") || url.includes("discordapp.com");
  const isSlack = url.includes("slack.com");

  let body: unknown;
  if (isDiscord) {
    body = {
      embeds: [
        {
          title: `🎯 ${payload.title}`,
          description: payload.content,
          color: 0x64d8c3,
          footer: { text: "Hamza Ali Portfolio Notification" },
          timestamp: new Date().toISOString(),
        },
      ],
    };
  } else if (isSlack) {
    body = {
      text: `*🎯 ${payload.title}*\n\n${payload.content}`,
    };
  } else {
    body = {
      title: payload.title,
      content: payload.content,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (err) {
    console.warn("[Webhook] Delivery error:", err);
    return false;
  }
}

/**
 * Dispatches a project-owner notification through webhooks (Discord/Slack/generic)
 * or the Forge notification service.
 * Returns `true` if any notification channel succeeded, `false` otherwise.
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);
  let delivered = false;

  // 1. Dispatch webhook if configured
  if (
    process.env.LEAD_NOTIFICATION_WEBHOOK ||
    process.env.ERROR_NOTIFICATION_WEBHOOK ||
    ENV.errorWebhook
  ) {
    const webhookOk = await dispatchWebhookNotification({ title, content });
    if (webhookOk) delivered = true;
  }

  // 2. Dispatch Forge/Manus service if configured
  if (ENV.forgeApiUrl && ENV.forgeApiKey) {
    try {
      const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${ENV.forgeApiKey}`,
          "content-type": "application/json",
          "connect-protocol-version": "1",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        delivered = true;
      } else {
        const detail = await response.text().catch(() => "");
        console.warn(
          `[Notification] Forge service returned ${response.status}${detail ? `: ${detail}` : ""}`
        );
      }
    } catch (error) {
      console.warn("[Notification] Error calling Forge service:", error);
    }
  }

  return delivered;
}
