export type ModelKey =
  | "gemini-flash"
  | "claude-sonnet"
  | "gpt-4o-mini"
  | "gemini-pro";

export type ArchitectureKey = "rag" | "multi-agent" | "fact-check";

export type ModelConfig = {
  id: ModelKey;
  name: string;
  provider: string;
  inputPerMillion: number; // in USD
  outputPerMillion: number; // in USD
  avgTtftMs: number; // Time to first token
};

export const MODELS: Record<ModelKey, ModelConfig> = {
  "gemini-flash": {
    id: "gemini-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    inputPerMillion: 0.075,
    outputPerMillion: 0.3,
    avgTtftMs: 320,
  },
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    inputPerMillion: 0.15,
    outputPerMillion: 0.6,
    avgTtftMs: 420,
  },
  "claude-sonnet": {
    id: "claude-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputPerMillion: 3.0,
    outputPerMillion: 15.0,
    avgTtftMs: 780,
  },
  "gemini-pro": {
    id: "gemini-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    inputPerMillion: 1.25,
    outputPerMillion: 5.0,
    avgTtftMs: 890,
  },
};

export type ArchitectureConfig = {
  id: ArchitectureKey;
  title: string;
  description: string;
  avgContextTokens: number;
  avgOutputTokens: number;
  retrievalLatencyMs: number;
  docsCount: number;
  storageMbPer10kDocs: number;
};

export const ARCHITECTURES: Record<ArchitectureKey, ArchitectureConfig> = {
  rag: {
    id: "rag",
    title: "Enterprise RAG + RBAC",
    description: "Hybrid vector search, role boundary enforcement, and grounded synthesis.",
    avgContextTokens: 3200,
    avgOutputTokens: 380,
    retrievalLatencyMs: 140,
    docsCount: 25000,
    storageMbPer10kDocs: 48,
  },
  "multi-agent": {
    id: "multi-agent",
    title: "Multi-Agent Code Review Crew",
    description: "Deterministic AST scanner, specialist review agents, and test harness.",
    avgContextTokens: 7500,
    avgOutputTokens: 1600,
    retrievalLatencyMs: 60,
    docsCount: 5000,
    storageMbPer10kDocs: 15,
  },
  "fact-check": {
    id: "fact-check",
    title: "Fact Verification & Decomposition",
    description: "Claim isolation, live source checking, and confidence scoring.",
    avgContextTokens: 4800,
    avgOutputTokens: 550,
    retrievalLatencyMs: 280,
    docsCount: 15000,
    storageMbPer10kDocs: 30,
  },
};

export type EstimatorInput = {
  architecture: ArchitectureKey;
  model: ModelKey;
  monthlyQueries: number;
  cacheHitPercent: number; // 0 to 100
};

export type EstimatorResult = {
  monthlyQueries: number;
  uncachedCost: number;
  effectiveCost: number;
  monthlySavings: number;
  inputTokensMillion: number;
  outputTokensMillion: number;
  estimatedStorageMb: number;
  p95LatencyMs: number;
  cachedLatencyMs: number;
  latencyBreakdown: {
    retrievalMs: number;
    ttftMs: number;
    generationMs: number;
  };
};

export function calculateArchitectureROI(input: EstimatorInput): EstimatorResult {
  const arch = ARCHITECTURES[input.architecture];
  const model = MODELS[input.model];

  const queries = Math.max(100, input.monthlyQueries);
  const cacheHitRatio = Math.min(100, Math.max(0, input.cacheHitPercent)) / 100;

  const totalInputTokens = queries * arch.avgContextTokens;
  const totalOutputTokens = queries * arch.avgOutputTokens;

  const inputTokensMillion = totalInputTokens / 1_000_000;
  const outputTokensMillion = totalOutputTokens / 1_000_000;

  const uncachedCost =
    inputTokensMillion * model.inputPerMillion +
    outputTokensMillion * model.outputPerMillion;

  // Cached requests incur negligible cost (~10% for embedding search / vector lookup)
  const effectiveCost =
    uncachedCost * (1 - cacheHitRatio) + uncachedCost * cacheHitRatio * 0.05;

  const monthlySavings = uncachedCost - effectiveCost;

  const estimatedStorageMb = Math.round(
    (arch.docsCount / 10_000) * arch.storageMbPer10kDocs
  );

  const generationMs = Math.round((arch.avgOutputTokens / 45) * 1000 * 0.08);
  const p95LatencyMs = arch.retrievalLatencyMs + model.avgTtftMs + generationMs;
  const cachedLatencyMs = Math.min(75, arch.retrievalLatencyMs * 0.35);

  return {
    monthlyQueries: queries,
    uncachedCost: Number(uncachedCost.toFixed(2)),
    effectiveCost: Number(effectiveCost.toFixed(2)),
    monthlySavings: Number(monthlySavings.toFixed(2)),
    inputTokensMillion: Number(inputTokensMillion.toFixed(2)),
    outputTokensMillion: Number(outputTokensMillion.toFixed(2)),
    estimatedStorageMb,
    p95LatencyMs,
    cachedLatencyMs,
    latencyBreakdown: {
      retrievalMs: arch.retrievalLatencyMs,
      ttftMs: model.avgTtftMs,
      generationMs,
    },
  };
}
