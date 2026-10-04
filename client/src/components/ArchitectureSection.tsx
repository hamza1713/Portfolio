import { useState } from "react";
import {
  Layers,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Cpu,
  Database,
  Lock,
} from "lucide-react";

export function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: "agents",
      number: "L0 // AGENT SWARMS & MCP",
      title: "Multi-Agent Swarms & MCP Execution",
      tag: "CrewAI · MCP · Python",
      description:
        "Specialized agents collaborate across isolated duties. The Model Context Protocol (MCP) coordinates AST security scans, regression tests, and tool execution without hallucinated side effects.",
      bullets: [
        "CrewAI multi-agent hierarchical swarms",
        "MCP JSON-RPC 2.0 tool execution",
        "Deterministic AST callgraph analysis",
        "Sandboxed reproduction & SARIF export",
      ],
      icon: Layers,
      preview: {
        headline: "Deterministic Swarm Topology",
        stat1: "14/14",
        stat1Label: "Benchmark Cases Passed",
        stat2: "< 1.2s",
        stat2Label: "Agent Cycle Latency",
        codeSnippet: `POST /mcp/v1/tools/call
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "ast_callgraph_impact",
    "arguments": { "scope": "diff", "max_depth": 3 }
  }
}
→ Result: 0 regressions, verified clean`,
      },
    },
    {
      id: "security",
      number: "L1 // BOUNDARY & RBAC",
      title: "Enterprise RBAC & Grounded Boundaries",
      tag: "PostgreSQL · RBAC · ChromaDB",
      description:
        "Multi-tenant data isolation enforced before retrieval even starts. Strict departmental permissions guarantee Finance never leaks into Engineering, with 100% RBAC boundary compliance.",
      bullets: [
        "Department-scoped vector metadata filtering",
        "Zero cross-tenant data leakage",
        "PII redaction and prompt guardrails",
        "Audited retrieval query trails",
      ],
      icon: Lock,
      preview: {
        headline: "Multi-Tenant Department Barrier",
        stat1: "100%",
        stat1Label: "RBAC Isolation Compliance",
        stat2: "0%",
        stat2Label: "Cross-Tenant Leakage",
        codeSnippet: `SELECT * FROM vector_store
WHERE tenant_id = 'org_442'
  AND department IN ('finance')
  AND classification <= 'confidential'
ORDER BY embedding <=> query_vector
LIMIT 5;
→ Filtered 284 candidate docs to 3 authorized chunks`,
      },
    },
    {
      id: "evals",
      number: "L2 // EVALS & COST TELEMETRY",
      title: "RAGAS Evals, Caching & Cost Control",
      tag: "RAGAS · DuckDB · Gemini",
      description:
        "Stop flying blind on LLM quality and spend. Dual-tier semantic caching cuts token bills by up to 45%, while RAGAS continuously verifies faithfulness and context relevance on every query.",
      bullets: [
        "RAGAS Faithfulness: 0.94 score",
        "Semantic similarity caching with Redis + DuckDB",
        "P95 latency waterfall tracking (TTFT + Generation)",
        "Automated regression test matrix",
      ],
      icon: Activity,
      preview: {
        headline: "Semantic Caching & Evals Engine",
        stat1: "0.94",
        stat1Label: "RAGAS Faithfulness Score",
        stat2: "45%",
        stat2Label: "Token Cost Savings",
        codeSnippet: `Query: "Summarize Q3 balance sheet debt-to-equity"
→ Exact Cache: MISS
→ Semantic Cache (threshold 0.88): HIT (score 0.92)
→ Bypassed LLM generation: Saved 1,420 tokens
→ Verified against ground truth: PASS (0.95 relevance)`,
      },
    },
  ];

  const current = layers[activeLayer];
  const IconComponent = current.icon;

  return (
    <section id="architecture" className="section-wrap architecture-section scroll-mt-24">
      {/* Monospace section heading */}
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">01</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">architecture</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Complex AI systems,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            explained visually.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          I think in diagrams and build in code. Every GenAI engagement starts with an inspectable architecture you can actually trace — then it becomes resilient production code.
        </p>
      </div>

      {/* Beam Card Container */}
      <div className="beam-card mt-8 rounded-3xl border border-white/10 bg-[#0c1220]/90 relative overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Spotlight Radial Glow */}
        <div
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#64D8C3]/10 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Layer Switcher & Details */}
          <div className="flex-1 p-6 md:p-10 relative z-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {layers.map((layer, idx) => {
                const LayerIcon = layer.icon;
                const isSelected = activeLayer === idx;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayer(idx)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex items-start gap-4 ${
                      isSelected
                        ? "border-[#64D8C3]/60 bg-[#64D8C3]/[0.08] shadow-[0_0_30px_rgba(100,216,195,0.12)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-[#64D8C3]/50 bg-[#64D8C3]/20 text-[#64D8C3]"
                          : "border-white/10 bg-white/5 text-neutral-400"
                      }`}
                    >
                      <LayerIcon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-[10px] tracking-wider uppercase ${
                            isSelected ? "text-[#64D8C3]" : "text-neutral-500"
                          }`}
                        >
                          {layer.number}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400 border border-white/10 rounded-full px-2 py-0.5">
                          {layer.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-white mt-1">
                        {layer.title}
                      </h3>
                      {isSelected && (
                        <p className="mt-2 text-xs md:text-sm text-neutral-300 leading-relaxed">
                          {layer.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro bullets */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              {current.bullets.map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#64D8C3] shrink-0" />
                  <span className="truncate">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Interactive Architecture Preview */}
          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/10 p-6 md:p-10 flex flex-col justify-between bg-black/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64D8C3] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#64D8C3]" />
                  </span>
                  Live Architecture Telemetry
                </span>
                <span className="font-mono text-xs text-[#64D8C3] bg-[#64D8C3]/10 border border-[#64D8C3]/30 rounded-full px-2.5 py-0.5">
                  Verified In Production
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-4">
                {current.preview.headline}
              </h4>

              {/* Metrics preview */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-white/10 bg-[#0e1626] p-4">
                  <span className="font-mono text-2xl font-bold text-white block">
                    {current.preview.stat1}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 mt-1 block">
                    {current.preview.stat1Label}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0e1626] p-4">
                  <span className="font-mono text-2xl font-bold text-[#64D8C3] block">
                    {current.preview.stat2}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 mt-1 block">
                    {current.preview.stat2Label}
                  </span>
                </div>
              </div>

              {/* Inspectable code / trace */}
              <div className="rounded-xl border border-white/10 bg-[#090d16] p-4 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 font-mono text-[10px] text-neutral-400">
                  <span>execution_trace.log</span>
                  <span className="text-[#64D8C3]">status: 200 OK</span>
                </div>
                <pre className="font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre overflow-x-auto">
                  {current.preview.codeSnippet}
                </pre>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>architecture_version: v2.4</span>
              <a
                href="#lab"
                className="text-[#64D8C3] hover:underline flex items-center gap-1"
              >
                Inspect in systems lab <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
