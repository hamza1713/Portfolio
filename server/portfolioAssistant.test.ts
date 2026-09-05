import { describe, expect, it } from "vitest";
import { PORTFOLIO_SYSTEM_PROMPT, getFallbackPortfolioAnswer, sanitizePortfolioHistory } from "./portfolioAssistant";

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
    expect(PORTFOLIO_SYSTEM_PROMPT).toContain("AI Code Review Agent");
    expect(PORTFOLIO_SYSTEM_PROMPT).toContain("Never invent facts");
  });

  it("returns accurate grounded answers via getFallbackPortfolioAnswer", () => {
    expect(getFallbackPortfolioAnswer("Tell me about FinSight")).toContain("FinSight");
    expect(getFallbackPortfolioAnswer("What is Factscope AI?")).toContain("Factscope AI");
    expect(getFallbackPortfolioAnswer("How do you build a RAG system?")).toContain("RAG");
    expect(getFallbackPortfolioAnswer("Tell me about the code review agent")).toContain("AI Code Review Agent");
    expect(getFallbackPortfolioAnswer("Where can I contact Hamza?")).toContain("hamza1713@gmail.com");
  });
});
