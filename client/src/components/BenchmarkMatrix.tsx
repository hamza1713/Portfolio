import { useState } from "react";
import { CheckCircle2, FileCode, Filter, Shield, Target } from "lucide-react";

type ProjectEvalKey = "code-review" | "finsight" | "factscope";

type EvalMetric = {
  label: string;
  value: string;
  note: string;
};

type BenchmarkCase = {
  id: string;
  name: string;
  category: string;
  expected: string;
  observed: string;
  badge: "REPRODUCED" | "PASSING" | "UNVERIFIED" | "ISOLATED";
  badgeVariant: "success" | "neutral" | "warning";
  summary: string;
};

const BENCHMARKS: Record<
  ProjectEvalKey,
  {
    title: string;
    subtitle: string;
    metrics: EvalMetric[];
    cases: BenchmarkCase[];
  }
> = {
  "code-review": {
    title: "AI Code Review Agent v3.0 — 14-Case Ground Truth Benchmark",
    subtitle: "Scorer v2 evaluation combining polyglot Tree-Sitter AST, slopsquatting interceptor, cross-family adversarial consensus, and Docker sandbox fuzzing.",
    metrics: [
      { label: "Verdict Accuracy", value: "100.0%", note: "14/14 test cases correctly evaluated with 0 errors" },
      { label: "Finding Precision", value: "100.0%", note: "Scorer v2 upgraded from initial 79.2% baseline" },
      { label: "Finding Recall", value: "100.0%", note: "Zero missed security or silent defect vulnerabilities" },
      { label: "False Positive Rate", value: "0.0%", note: "0 false alarms generated across clean control cases" },
    ],
    cases: [
      {
        id: "TC-01",
        name: "AI Slopsquatting & Dependency Provenance (SEC-SLOPSQUAT-001)",
        category: "Supply Chain Security",
        expected: "Immediate Pre-Ingestion Block",
        observed: "PyPI/OSV check failed; diff quarantined before LLM",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "PR added hallucinated package 'flask-auth-helpers'. Pre-ingestion shield checked registry; blocked immediately without wasting LLM tokens.",
      },
      {
        id: "TC-02",
        name: "Trojan Source & Invisible Unicode Bidi (SEC-TROJAN-001)",
        category: "Compiler Security",
        expected: "CVE-2021-42574 Stripped",
        observed: "Directional override sanitized; visual deception neutralized",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "Hidden bidirectional control characters attempted to reverse execution order of admin check. Sanitizer stripped characters prior to AST parsing.",
      },
      {
        id: "TC-03",
        name: "Unawaited Async Coroutine Auth Bypass (AI-ASYNC-001)",
        category: "AI Defect Detection",
        expected: "AST Taint Sink Flagged",
        observed: "Pytester reproduced bypass in Docker container (exit 1)",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "Async def check_creds() called without await in if statement (evaluated truthy in Python). Docker reproduction test confirmed silent bypass.",
      },
      {
        id: "TC-04",
        name: "Command Injection in Subprocess Helper (SEC-003)",
        category: "Inter-Procedural Taint",
        expected: "Multi-Hop Taint Path Flagged",
        observed: "Taint traced: routes.py:42 -> helpers.py:89 -> subprocess.run",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "User input traversed 3 function hops into subprocess.run(shell=True). AST engine generated human-readable taint trace for instant PR review.",
      },
      {
        id: "TC-05",
        name: "Parameterized SQLAlchemy Migration (CLEAN-001)",
        category: "Clean Control Case",
        expected: "Approved Verdict Without Warning",
        observed: "0 AST taint sinks; consensus agreed clean",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Parameterized query safely binds user arguments. Evaluator suppressed speculative warnings (does not certify unanalyzed codebase).",
      },
      {
        id: "TC-06",
        name: "Proprietary Deserialization in Missing Container (UNVERIFIED-001)",
        category: "Missing Runtime Handling",
        expected: "Badged UNVERIFIED",
        observed: "Docker daemon unavailable; fallback to static warning",
        badge: "UNVERIFIED",
        badgeVariant: "warning",
        summary: "Heuristic flagged unsafe pickle load, but container daemon was unreachable. System honestly labeled outcome UNVERIFIED rather than asserting proof.",
      },
    ],
  },
  finsight: {
    title: "FinSight — 3-Track Evaluation & Security Benchmark",
    subtitle: "Synthesized ground-truth evaluation across Quota-Free deterministic evals, RAGAS LLM-as-judge, and 90 automated tests.",
    metrics: [
      { label: "Context Relevancy", value: "0.894", note: "RAGAS LLM-as-judge score across multi-tenant document corpus" },
      { label: "Faithfulness", value: "0.850", note: "Answers mathematically grounded in retrieved passages" },
      { label: "RBAC Compliance", value: "0.933", note: "Zero cross-department leakages across 6 enterprise roles" },
      { label: "Redis Cache TTFT", value: "< 20ms", note: "Sub-20ms streaming replay on role-scoped duplicate queries" },
    ],
    cases: [
      {
        id: "RBAC-01",
        name: "Cross-Department Executive Payroll Query",
        category: "3-Layer RBAC Boundary",
        expected: "Hard Block at Pre-LLM Guard",
        observed: "Access denied; 0 documents retrieved from ChromaDB",
        badge: "ISOLATED",
        badgeVariant: "success",
        summary: "Analyst role requested executive payroll figures. JWT live role check and Pre-LLM Guard intercepted query before embedding search was executed.",
      },
      {
        id: "RBAC-02",
        name: "Sandboxed DuckDB Financial Aggregation",
        category: "In-Memory SQL OLAP",
        expected: "Deterministic SQL Execution",
        observed: "enable_external_access=False; 256MB cap respected",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Natural language query 'sum of Q3 marketing expenses' routed to DuckDB in-memory table. Microsecond execution with zero external disk access.",
      },
      {
        id: "RBAC-03",
        name: "Adversarial Prompt Injection in Invoice Data",
        category: "OWASP LLM Top 10",
        expected: "Sanitized & Quarantined",
        observed: "Malicious override trapped by OWASP security middleware",
        badge: "ISOLATED",
        badgeVariant: "success",
        summary: "Simulated prompt injection payload inside an uploaded invoice was neutralized before vector ingestion, preventing prompt leak.",
      },
      {
        id: "RBAC-04",
        name: "Role-Scoped Duplicate Query Replay",
        category: "Redis 7 Caching",
        expected: "Sub-20ms Cached Replay",
        observed: "TTFT = 14ms (P95 < 20ms); bypassed LLM generation",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Duplicate financial query by authorized researcher served from SHA-256 hashed Redis role cache, eliminating token spend and model latency.",
      },
    ],
  },
  factscope: {
    title: "Factscope AI — Claim Verification & Fallback Evals",
    subtitle: "Article claim decomposition, live Google Search grounding, and multi-tier latency resilience.",
    metrics: [
      { label: "Claim Extraction", value: "94.6%", note: "Accuracy of deconstructing raw prose into checkable claims" },
      { label: "Source Grounding", value: "92.1%", note: "Verification against authoritative Google Search results" },
      { label: "Tier 1 Latency", value: "1,250ms", note: "Gemini 2.5 Flash + Google Search grounding round-trip" },
      { label: "Cache Latency", value: "48ms", note: "P95 latency on 24h normalized input database cache hit" },
    ],
    cases: [
      {
        id: "FACT-01",
        name: "Medical Health Claim with Authoritative Citations",
        category: "Grounding Verification",
        expected: "Debunked with Peer-Reviewed Citations",
        observed: "Verdict: FAKE (97% confidence); 2 medical citations linked",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Claim 'lemon water cures diabetes' deconstructed and cross-referenced with ADA and Harvard Health citations directly.",
      },
      {
        id: "FACT-02",
        name: "Primary Search Quota Exhaustion Simulation",
        category: "3-Tier Fallback Circuit Breaker",
        expected: "Seamless Failover to Tier 2 / Tier 3",
        observed: "HTTP 429 caught; routed to Gemini 3.1 Flash Lite",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Injected rate-limit failure on primary Gemini endpoint; fallback circuit breaker maintained service availability with degraded-freshness UI banner.",
      },
    ],
  },
};

export function BenchmarkMatrix() {
  const [activeProject, setActiveProject] = useState<ProjectEvalKey>("code-review");
  const benchmark = BENCHMARKS[activeProject];

  return (
    <div className="benchmark-matrix" id="evals-matrix">
      <div className="benchmark-header">
        <div className="benchmark-title-wrap">
          <span className="status-tag">
            <Target size={14} className="text-[#64D8C3]" />
            <span>Empirical Evaluations & Benchmarks</span>
          </span>
          <h3>Reliability Metrics & Ground Truth Testing</h3>
          <p className="benchmark-subtitle">
            AI systems engineered with rigorous evaluation suites (RAGAS, confusion matrices, and sandboxed reproduction tests) rather than optimistic demos.
          </p>
        </div>

        <div className="benchmark-nav">
          {(["code-review", "finsight", "factscope"] as ProjectEvalKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveProject(key)}
              className={`benchmark-nav-btn ${activeProject === key ? "benchmark-nav-btn--active" : ""}`}
            >
              {key === "code-review" ? "AI Code Review" : key === "finsight" ? "FinSight RAG" : "Factscope AI"}
            </button>
          ))}
        </div>
      </div>

      <div className="benchmark-content">
        {/* Metric Cards Row */}
        <div className="eval-metrics-row">
          {benchmark.metrics.map((m) => (
            <div key={m.label} className="eval-metric-card">
              <span className="eval-metric-label">{m.label}</span>
              <span className="eval-metric-value">{m.value}</span>
              <p className="eval-metric-note">{m.note}</p>
            </div>
          ))}
        </div>

        {/* Test Case Inspection Table */}
        <div className="eval-cases-table-wrap">
          <div className="eval-table-header">
            <h4>
              <FileCode size={16} /> Sample Ground-Truth Test Cases
            </h4>
            <span className="eval-table-badge">
              <Filter size={12} /> Scoped evaluation suite
            </span>
          </div>

          <div className="eval-cases-list">
            {benchmark.cases.map((c) => (
              <div key={c.id} className="eval-case-card">
                <div className="eval-case-top">
                  <div className="eval-case-id-group">
                    <span className="eval-case-id">{c.id}</span>
                    <span className="eval-case-name">{c.name}</span>
                    <span className="eval-case-cat">{c.category}</span>
                  </div>
                  <span className={`evidence-pill evidence-pill--${c.badgeVariant}`}>
                    {c.badge}
                  </span>
                </div>

                <p className="eval-case-summary">{c.summary}</p>

                <div className="eval-case-footer">
                  <div>
                    <span className="eval-label">Expected:</span>
                    <span className="eval-val">{c.expected}</span>
                  </div>
                  <div>
                    <span className="eval-label">Observed:</span>
                    <span className="eval-val">{c.observed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
