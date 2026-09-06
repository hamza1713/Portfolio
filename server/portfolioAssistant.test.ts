import { describe, expect, it, vi } from "vitest";

const { invokeLLMMock } = vi.hoisted(() => ({
  invokeLLMMock: vi.fn().mockResolvedValue({
    id: "test-id",
    created: Date.now(),
    model: "test-model",
    choices: [{ message: { role: "assistant", content: "FinSight routes queries between RAG and SQL." }, finish_reason: "stop", index: 0 }],
  }),
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: invokeLLMMock,
  listLLMModels: vi.fn().mockResolvedValue({ object: "list", data: [] }),
}));

import { appRouter } from "./routers";
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

describe("portfolio assistant procedure integration", () => {
  it("accepts multi-turn history where previous assistant answers exceed 700 characters", async () => {
    const caller = appRouter.createCaller({
      req: { headers: {}, ip: "127.0.0.1" } as never,
      res: {} as never,
      user: null,
    });

    const longAnswer = "This is a detailed assistant explanation of FinSight and its architecture. ".repeat(15);
    expect(longAnswer.length).toBeGreaterThan(700);

    const result = await caller.portfolioAssistant.ask({
      question: "How does FinSight route questions?",
      history: [
        { role: "user", content: "Tell me about FinSight" },
        { role: "assistant", content: longAnswer },
      ],
    });

    expect(result).toHaveProperty("answer");
    expect(typeof result.answer).toBe("string");
    expect(result.answer.length).toBeGreaterThan(0);
  });

  it("rejects history messages that exceed 4000 characters", async () => {
    const caller = appRouter.createCaller({
      req: { headers: {}, ip: "127.0.0.1" } as never,
      res: {} as never,
      user: null,
    });

    const extremeContent = "A".repeat(4001);
    await expect(
      caller.portfolioAssistant.ask({
        question: "How does it work?",
        history: [{ role: "user", content: extremeContent }],
      })
    ).rejects.toThrow();
  });
});
