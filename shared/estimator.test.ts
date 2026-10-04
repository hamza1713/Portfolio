import { describe, expect, it } from "vitest";
import {
  ARCHITECTURES,
  MODELS,
  calculateArchitectureROI,
} from "./estimator";

describe("Architecture Token & Cost Estimator", () => {
  it("calculates baseline cost for RAG with Gemini Flash", () => {
    const result = calculateArchitectureROI({
      architecture: "rag",
      model: "gemini-flash",
      monthlyQueries: 50_000,
      cacheHitPercent: 0,
    });

    expect(result.monthlyQueries).toBe(50_000);
    expect(result.inputTokensMillion).toBe(160); // 50000 * 3200 / 1M = 160
    expect(result.outputTokensMillion).toBe(19); // 50000 * 380 / 1M = 19
    expect(result.uncachedCost).toBeGreaterThan(0);
    expect(result.effectiveCost).toBe(result.uncachedCost);
    expect(result.monthlySavings).toBe(0);
    expect(result.p95LatencyMs).toBeGreaterThan(300);
  });

  it("calculates realistic savings when semantic caching is enabled", () => {
    const uncached = calculateArchitectureROI({
      architecture: "rag",
      model: "gpt-4o-mini",
      monthlyQueries: 100_000,
      cacheHitPercent: 0,
    });

    const cached = calculateArchitectureROI({
      architecture: "rag",
      model: "gpt-4o-mini",
      monthlyQueries: 100_000,
      cacheHitPercent: 40,
    });

    expect(cached.effectiveCost).toBeLessThan(uncached.effectiveCost);
    expect(cached.monthlySavings).toBeGreaterThan(0);
    expect(cached.cachedLatencyMs).toBeLessThan(100);
  });

  it("computes storage footprint based on document count", () => {
    const result = calculateArchitectureROI({
      architecture: "rag",
      model: "gemini-flash",
      monthlyQueries: 10_000,
      cacheHitPercent: 0,
    });

    // 25,000 docs / 10,000 * 48 MB = 120 MB
    expect(result.estimatedStorageMb).toBe(120);
  });
});
