import { describe, expect, it } from "vitest";
import {
  getPortfolioFacts,
  getProject,
  getScenario,
  moveStep,
  projects,
} from "./portfolio";
import { getPageMetadata, publicRoutes } from "./seo";

describe("guided architecture scenarios", () => {
  it("stops restricted requests at the access boundary", () => {
    const restricted = getScenario(getProject("finsight")!, "restricted");
    expect(restricted.status).toBe("blocked");
    expect(restricted.steps.map(step => step.title)).toEqual([
      "Check access",
      "Stop at the boundary",
    ]);
    expect(restricted.steps.at(-1)?.detail).toContain("no model call");
  });

  it("keeps missing test evidence separate from reproduced findings", () => {
    const review = getProject("ai-code-review-agent")!;
    expect(getScenario(review, "unsafe").outcome).toContain("REPRODUCED");
    expect(getScenario(review, "unverified").outcome).toContain("UNVERIFIED");
    expect(getScenario(review, "clean").outcome).toContain("does not certify");
  });

  it("does not imply fresh verification when a provider is unavailable", () => {
    const fallback = getScenario(getProject("factscope-ai")!, "fallback");
    expect(fallback.status).toBe("fallback");
    expect(fallback.outcome).toContain("fresh verification is not implied");
    expect(fallback.steps.at(-1)?.title).toBe("Explain freshness");
    expect(fallback.steps.at(-1)?.detail).toContain("without Search");
  });

  it("bounds previous and next controls for every scenario", () => {
    for (const project of projects)
      for (const scenario of project.scenarios) {
        const count = scenario.steps.length;
        expect(moveStep(0, -1, count)).toBe(0);
        expect(moveStep(count - 1, 1, count)).toBe(count - 1);
        expect(moveStep(0, 1, count)).toBe(1);
      }
  });

  it("shares scoped evidence with the assistant", () => {
    expect(getPortfolioFacts()).toContain("14-case");
    expect(getPortfolioFacts()).toContain("79.2%");
    expect(getPortfolioFacts()).toContain("not universal accuracy");
  });
});

describe("public page discovery", () => {
  it("assigns unique titles and images to the four public routes", () => {
    expect(
      new Set(publicRoutes.map(path => getPageMetadata(path).title)).size
    ).toBe(4);
    expect(
      new Set(publicRoutes.map(path => getPageMetadata(path).image)).size
    ).toBe(4);
    expect(publicRoutes.every(path => !getPageMetadata(path).noindex)).toBe(
      true
    );
  });

  it("excludes private, confirmation, and unknown paths from indexing", () => {
    for (const path of [
      "/admin",
      "/thank-you",
      "/missing",
      "/projects/finsight/extra",
    ])
      expect(getPageMetadata(path).noindex).toBe(true);
  });
});
