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
      logger.error("tRPC", `Error in procedure [${path ?? "unknown"}]`, error, {
        path,
        ip: req.ip,
      });
    }
  },
});

// Support both /api/trpc and /trpc mount points
app.use("/api/trpc", trpcMiddleware);
app.use("/trpc", trpcMiddleware);

// Fallback routing for procedure calls if URL is rewritten
app.use((req, res, next) => {
  if (
    req.url.includes("portfolioAssistant") ||
    req.url.includes("projectInquiry") ||
    req.url.includes("assistantFollowUp") ||
    req.url.includes("system")
  ) {
    return trpcMiddleware(req, res, next);
  }
  next();
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api", timestamp: new Date().toISOString() }));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api", timestamp: new Date().toISOString() }));

export default function handler(req: any, res: any) {
  return app(req, res);
}
