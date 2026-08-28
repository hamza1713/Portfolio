import { TRPCError } from "@trpc/server";
import type { Request } from "express";
import { describe, expect, it } from "vitest";
import { enforceRateLimit, getClientIp, globalRateLimiter } from "./_core/rateLimiter";

describe("Rate Limiter System", () => {
  it("allows requests under the maximum limit", () => {
    const testKey = `test-user-${Date.now()}`;
    const result1 = globalRateLimiter.check(testKey, 1000, 3);
    const result2 = globalRateLimiter.check(testKey, 1000, 3);

    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(2);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(1);
  });

  it("blocks requests once the limit is exceeded and provides retry time", () => {
    const testKey = `test-blocked-${Date.now()}`;
    globalRateLimiter.check(testKey, 5000, 2);
    globalRateLimiter.check(testKey, 5000, 2);

    const blockedResult = globalRateLimiter.check(testKey, 5000, 2);
    expect(blockedResult.allowed).toBe(false);
    expect(blockedResult.remaining).toBe(0);
    expect(blockedResult.retryAfterSec).toBeGreaterThan(0);
  });

  it("enforceRateLimit throws a 429 TOO_MANY_REQUESTS TRPCError when exceeded", () => {
    const uniqueIp = `192.168.1.${Math.floor(Math.random() * 200) + 10}`;
    const mockReq = {
      ip: uniqueIp,
      headers: {},
    } as unknown as Request;

    const options = {
      actionName: "test-action",
      maxRequests: 1,
      windowMs: 10000,
    };

    // First request should succeed without error
    expect(() => enforceRateLimit(mockReq, options)).not.toThrow();

    // Second request should throw TRPCError
    expect(() => enforceRateLimit(mockReq, options)).toThrowError(TRPCError);
    try {
      enforceRateLimit(mockReq, options);
    } catch (err) {
      if (err instanceof TRPCError) {
        expect(err.code).toBe("TOO_MANY_REQUESTS");
        expect(err.message).toContain("test-action");
      }
    }
  });

  it("resolves client IP correctly from x-forwarded-for headers", () => {
    const mockReqSingle = {
      headers: { "x-forwarded-for": "203.0.113.195" },
    } as unknown as Request;

    const mockReqMulti = {
      headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18, 150.172.238.178" },
    } as unknown as Request;

    expect(getClientIp(mockReqSingle)).toBe("203.0.113.195");
    expect(getClientIp(mockReqMulti)).toBe("203.0.113.195");
  });
});
