import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { logger } from "./_core/logger";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
  onError({ path, error, req }) {
    if (error.code !== "UNAUTHORIZED" && error.code !== "FORBIDDEN" && error.code !== "TOO_MANY_REQUESTS") {
      let clientIp = "127.0.0.1";
      try {
        clientIp = req.ip || req.socket?.remoteAddress || "127.0.0.1";
      } catch {
        clientIp = req.socket?.remoteAddress || "127.0.0.1";
      }
      logger.error("tRPC", `Error in procedure [${path ?? "unknown"}]`, error, {
        path,
        ip: clientIp,
      });
    }
  },
});

// Normalize tRPC URLs so createExpressMiddleware always receives /<procedure> regardless of mount prefix
app.use((req, _res, next) => {
  if (req.url.startsWith("/api/trpc/")) {
    req.url = req.url.slice("/api/trpc".length);
  } else if (req.url.startsWith("/trpc/")) {
    req.url = req.url.slice("/trpc".length);
  } else if (req.url.startsWith("/api/") && (
    req.url.includes("portfolioAssistant") ||
    req.url.includes("projectInquiry") ||
    req.url.includes("assistantFollowUp") ||
    req.url.includes("system")
  )) {
    req.url = req.url.slice("/api".length);
  }
  next();
});

// Primary tRPC handler
app.use(trpcMiddleware);

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api", timestamp: new Date().toISOString() }));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api", timestamp: new Date().toISOString() }));

export default function handler(req: any, res: any) {
  // If Vercel rewrote the URL to /api, recover the intended path from routing headers
  const matchedPath = (req.headers?.["x-matched-path"] || req.headers?.["x-forwarded-uri"] || req.headers?.["x-forwarded-url"] || "") as string;
  if (matchedPath && (req.url === "/api" || req.url === "/" || req.url.startsWith("/api?") || req.url.startsWith("/?"))) {
    const queryIndex = req.url.indexOf("?");
    const query = queryIndex !== -1 ? req.url.slice(queryIndex) : "";
    req.url = matchedPath.includes("?") ? matchedPath : `${matchedPath}${query}`;
  }
  return app(req, res);
}
