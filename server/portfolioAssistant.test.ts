import { describe, expect, it } from "vitest";
import { PORTFOLIO_SYSTEM_PROMPT, sanitizePortfolioHistory } from "./portfolioAssistant";

describe("portfolio assistant guardrails", () => {
  it("retains only the most recent valid visitor and assistant messages", () => {
    const result = sanitizePortfolioHistory([
      { role: "user", content: "one" },
      { role: "assistant", content: "two" },
      { role: "user", content: "three" },
      { role: "assistant", content: "four" },
      { role: "user", content: "five" },
      { role: "assistant", content: "six" },
      { role: "user", content: "seven" },
    ]);

    expect(result).toHaveLength(6);
    expect(result[0]?.content).toBe("two");
    expect(result[5]?.content).toBe("seven");
  });

  it("keeps the assistant grounded in verified portfolio evidence", () => {
    expect(PORTFOLIO_SYSTEM_PROMPT).toContain("FinSight");
    expect(PORTFOLIO_SYSTEM_PROMPT).toContain("Factscope AI");
    expect(PORTFOLIO_SYSTEM_PROMPT).toContain("Never invent facts");
  });
});
