import { useState } from "react";
import {
  Layers,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Cpu,
  Database,
  Lock,
  Code2,
  Terminal,
} from "lucide-react";

export function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: "agents",
      number: "L0 // ZERO-TRUST REVIEW & POLYGLOT AST",
      title: "Polyglot AST & Cross-Family Adversarial Ensembles",
      tag: "Tree-Sitter · Gemini + Claude · SARIF 2.1.0",
      description:
        "Combines compiler-grade Tree-Sitter AST taint graphs across 6 languages with pre-ingestion slopsquatting interceptors, orthogonal red-team critics (Gemini 2.5 Pro + Claude 3.7 Sonnet), containerized pytest fuzzing, and signed SARIF 2.1.0 receipts.",
      bullets: [
        "Tree-Sitter AST & inter-procedural taint flow graph",
        "Pre-ingestion slopsquatting & Unicode Bidi defense",
        "Cross-family adversarial consensus (Gemini + Claude)",
        "Docker sandbox fuzzing & OASIS SARIF 2.1.0 attestation",
      ],
      icon: Code2,
      preview: {
        headline: "Deterministic AST & Adversarial Telemetry",
        stat1: "100.0%",
        stat1Label: "Benchmark F1 (14 CWEs)",
        stat2: "0.0%",
        stat2Label: "False Positive Rate",
        codeSnippet: `PRE_SHIELD: 'flask-auth-helpers' -> BLOCKED (SEC-SLOPSQUAT-001)
AST_TAINT: user_input -> subprocess.run(shell=True) (CWE-78)
CRITIC: Claude 3.7 disproves safety -> CONSENSUS_AGREED
SANDBOX: Docker container pytest -> exit code 1 (REPRODUCED)
RECEIPT: SHA-256 e8f3a9... -> OASIS SARIF v2.1.0 exported`,
      },
    },
    {
      id: "security",
      number: "L1 // 3-LAYER RBAC & DUCKDB SANDBOX",
      title: "3-Layer RBAC & In-Memory Analytical Sandbox",
      tag: "ChromaDB · DuckDB · Cohere Rerank v3",
      description:
        "Department-isolated vector partitioning enforced at three distinct layers (live JWT claim re-fetch, pre-LLM department guard, and ChromaDB metadata barriers). Sandboxed in-memory DuckDB executes financial SQL with external file access completely disabled.",
      bullets: [
        "3-layer defensive RBAC across 6 enterprise roles",
        "4-stage hybrid retrieval (dense + BM25 + RRF + Cohere)",
        "In-memory DuckDB sandbox (256MB cap, 10s timeout)",
        "0 cross-department leakages across 90 test suites",
      ],
      icon: Lock,
      preview: {
        headline: "Multi-Tenant Department Barrier",
        stat1: "100%",
        stat1Label: "RBAC Isolation Compliance",
        stat2: "0",
        stat2Label: "Department Boundary Leaks",
        codeSnippet: `PRE_LLM_GUARD: User role 'analyst' -> authorized depts: ['research']
RETRIEVAL: ChromaDB dense + SQLite FTS5 BM25 -> RRF fusion score 0.912
RERANK: Cohere v3 cross-encoder top-3 chunks selected
DUCKDB_SANDBOX: enable_external_access=False, mem_limit='256MB'
VERDICT: 100% RBAC compliance, unauthorized 'finance' docs blocked`,
      },
    },
    {
      id: "evals",
      number: "L2 // STREAM REPLAY & EMPIRICAL EVALUATION",
      title: "Sub-20ms Redis Cache & RAGAS LLM-as-Judge",
      tag: "Redis 7 · RAGAS · SlowAPI",
      description:
        "Tiered SlowAPI rate limiting coupled with role-scoped Redis 7 caching for sub-20ms streaming replay on duplicate queries. Continuous LLM-as-judge evaluation measuring Faithfulness (0.850) and Context Relevancy (0.894).",
      bullets: [
        "Sub-20ms Redis cached stream replay",
        "RAGAS Relevancy: 0.894 | Faithfulness: 0.850",
        "SlowAPI multi-tiered IP/user rate limiting",
        "Automated OWASP LLM Top 10 mitigation suite",
      ],
      icon: Activity,
      preview: {
        headline: "Role-Scoped Cache & Evals Engine",
        stat1: "0.894",
        stat1Label: "RAGAS Context Relevancy",
        stat2: "< 20ms",
        stat2Label: "Redis Cache Stream Replay",
        codeSnippet: `CACHE_KEY: sha256(role: 'analyst' + query: 'Q3 balance sheet')
EXACT_CACHE: HIT -> Redis 7 in-memory stream replay
LATENCY: TTFT = 14ms (P95 < 20ms) vs 1,450ms un-cached
EVALUATION: RAGAS Relevancy = 0.894, Faithfulness = 0.850
TELEMETRY: 90 automated tests passed (60 RBAC, 20 OWASP, 10 Evals)`,
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
          I think in diagrams and build in code. Every GenAI platform starts with an inspectable architecture you can trace from input to verdict — then it becomes resilient production code.
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
              <span>architecture_version: v3.0</span>
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
