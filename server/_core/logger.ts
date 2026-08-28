import { ENV } from "./env";

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  level: LogLevel;
  tag: string;
  message: string;
  error?: unknown;
  meta?: Record<string, unknown>;
  timestamp: string;
}

function formatError(error: unknown): string {
  if (!error) return "";
  if (error instanceof Error) {
    return error.stack || `${error.name}: ${error.message}`;
  }
  if (typeof error === "object") {
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

async function dispatchWebhookAlert(payload: LogPayload): Promise<void> {
  if (!ENV.errorWebhook || payload.level !== "error") return;

  try {
    const errorDetails = payload.error ? `\n\`\`\`\n${formatError(payload.error).slice(0, 1000)}\n\`\`\`` : "";
    const body = JSON.stringify({
      content: `🚨 **[${payload.tag}] Critical Error**\n**Message**: ${payload.message}${errorDetails}\n*Time: ${payload.timestamp}*`,
      username: "Portfolio Error Monitor",
    });

    await fetch(ENV.errorWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch (err) {
    // Fail silently so logging never crashes the application
    console.error("[Logger] Failed to dispatch webhook error alert:", err);
  }
}

function log(level: LogLevel, tag: string, message: string, error?: unknown, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();
  const payload: LogPayload = { level, tag, message, error, meta, timestamp };
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${tag}]`;

  switch (level) {
    case "debug":
      if (!ENV.isProduction) {
        console.debug(`${prefix} ${message}`, meta ?? "");
      }
      break;
    case "info":
      console.info(`${prefix} ${message}`, meta ? JSON.stringify(meta) : "");
      break;
    case "warn":
      console.warn(`${prefix} ${message}`, error ? `\nDetails: ${formatError(error)}` : "", meta ? JSON.stringify(meta) : "");
      break;
    case "error":
      console.error(`${prefix} ${message}`, error ? `\nStack trace:\n${formatError(error)}` : "", meta ? `\nMeta: ${JSON.stringify(meta, null, 2)}` : "");
      void dispatchWebhookAlert(payload);
      break;
  }
}

export const logger = {
  debug: (tag: string, message: string, meta?: Record<string, unknown>) => log("debug", tag, message, undefined, meta),
  info: (tag: string, message: string, meta?: Record<string, unknown>) => log("info", tag, message, undefined, meta),
  warn: (tag: string, message: string, error?: unknown, meta?: Record<string, unknown>) => log("warn", tag, message, error, meta),
  error: (tag: string, message: string, error?: unknown, meta?: Record<string, unknown>) => log("error", tag, message, error, meta),
};
