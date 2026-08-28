import { TRPCError } from "@trpc/server";
import type { Request } from "express";
import { logger } from "./logger";

interface RateLimitRecord {
  timestamps: number[];
}

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Run cleanup every 5 minutes to prevent memory growth
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref();
      }
    }
  }

  public check(key: string, windowMs: number, maxRequests: number): { allowed: boolean; remaining: number; retryAfterSec: number } {
    const now = Date.now();
    const windowStart = now - windowMs;

    let record = this.store.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.store.set(key, record);
    }

    // Filter out timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= maxRequests) {
      const oldestInWindow = record.timestamps[0] ?? now;
      const retryAfterMs = Math.max(0, oldestInWindow + windowMs - now);
      const retryAfterSec = Math.ceil(retryAfterMs / 1000);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec,
      };
    }

    record.timestamps.push(now);
    const remaining = Math.max(0, maxRequests - record.timestamps.length);

    return {
      allowed: true,
      remaining,
      retryAfterSec: 0,
    };
  }

  public reset(key?: string) {
    if (key) {
      this.store.delete(key);
    } else {
      this.store.clear();
    }
  }

  private cleanup() {
    const now = Date.now();
    // Delete keys where all timestamps are older than 1 hour
    const maxAge = 60 * 60 * 1000;
    for (const [key, record] of this.store.entries()) {
      record.timestamps = record.timestamps.filter((ts: number) => ts > now - maxAge);
      if (record.timestamps.length === 0) {
        this.store.delete(key);
      }
    }
  }
}

export const globalRateLimiter = new InMemoryRateLimiter();

export function getClientIp(req?: Request): string {
  if (!req) return "127.0.0.1";
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() || req.ip || "127.0.0.1";
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  actionName: string;
}

export function enforceRateLimit(req: Request | undefined, options: RateLimitOptions) {
  const ip = getClientIp(req);
  const key = `${options.actionName}:${ip}`;
  const result = globalRateLimiter.check(key, options.windowMs, options.maxRequests);

  if (!result.allowed) {
    logger.warn("RateLimiter", `Rate limit exceeded for [${options.actionName}] from IP: ${ip}`, undefined, {
      ip,
      action: options.actionName,
      retryAfterSec: result.retryAfterSec,
    });

    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Too many requests for ${options.actionName}. Please try again in ${result.retryAfterSec} second${result.retryAfterSec === 1 ? "" : "s"}.`,
    });
  }
}
