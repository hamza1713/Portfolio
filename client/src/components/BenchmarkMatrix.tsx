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
    title: "AI Code Review Agent — 14-Case Ground Truth Suite",
    subtitle: "Empirical evaluation on deterministic scanners + multi-agent LLM review with sandbox execution.",
    metrics: [
      { label: "Verdict Accuracy", value: "100%", note: "14/14 test cases correctly evaluated" },
      { label: "Finding Recall", value: "100%", note: "All ground-truth security defects identified" },
      { label: "Finding Precision", value: "79.2%", note: "19/24 findings empirically verified" },
      { label: "F1 Score", value: "88.4%", note: "Harmonic balance between precision and recall" },
    ],
    cases: [
      {
        id: "TC-01",
        name: "Command Injection in Shell Helper",
        category: "Security Vulnerability",
        expected: "Flagged & Reproduced",
        observed: "Test harness executed; exit code 1",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "Unsanitized user string passed directly into subprocess. Pytester reproduced the defect in sandbox.",
      },
      {
        id: "TC-02",
        name: "SQL Prepared Statements Migration",
        category: "Correctness / Policy",
        expected: "Clean Verdict",
        observed: "0 static analysis defects; no false alarm",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Parameterized query safely binds user arguments. Evaluator correctly suppressed speculation.",
      },
      {
        id: "TC-03",
        name: "Proprietary Protocol Deserialization",
        category: "Missing Runtime",
        expected: "Flagged with Disclaimer",
        observed: "Dependency unavailable in sandbox",
        badge: "UNVERIFIED",
        badgeVariant: "warning",
        summary: "Heuristic suggests unsafe pickle load; sandbox lacked external dependency, so verdict was explicitly badged UNVERIFIED.",
      },
      {
        id: "TC-04",
        name: "Hardcoded Credential in Config Chunk",
        category: "Static Policy Check",
        expected: "Deterministic Block",
        observed: "Caught by Semgrep before model call",
        badge: "REPRODUCED",
        badgeVariant: "success",
        summary: "Regex entropy scanner caught API token; blocked immediately without requiring costly LLM reasoning.",
      },
    ],
  },
  finsight: {
    title: "FinSight — Enterprise RAG & RBAC Evals",
    subtitle: "RAGAS synthetic evaluation + role boundary isolation benchmarks.",
    metrics: [
      { label: "Faithfulness", value: "0.94", note: "RAGAS score measuring claims grounded in retrieved context" },
      { label: "Answer Relevance", value: "0.91", note: "RAGAS score measuring direct answer quality" },
      { label: "Context Recall", value: "0.89", note: "Retrieved passages containing the target truth" },
      { label: "RBAC Boundary Leak", value: "0.00%", note: "100% containment across 6 protected roles" },
    ],
    cases: [
      {
        id: "RBAC-01",
        name: "Cross-Department Payroll Query",
        category: "Access Boundary Test",
        expected: "Hard Block at Retrieval Layer",
        observed: "Access denied; 0 documents exposed",
        badge: "ISOLATED",
        badgeVariant: "success",
        summary: "Marketing role requested compensation bands. Request blocked before vector similarity search was executed.",
      },
      {
        id: "RBAC-02",
        name: "Structured SQL Aggregation",
        category: "Natural-Language SQL",
        expected: "DuckDB Deterministic Query",
        observed: "Parsed to SQL AST; correct table targeted",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Finance director requested Q3 travel expenses > $10,000. Text-to-SQL routed to DuckDB with exact sum verified.",
      },
    ],
  },
  factscope: {
    title: "Factscope AI — Claim Verification & Fallback Evals",
    subtitle: "Article claim decomposition, source grounding, and multi-tier latency resilience.",
    metrics: [
      { label: "Claim Extraction", value: "94.6%", note: "Accuracy of breaking prose into discrete propositions" },
      { label: "Source Grounding", value: "92.1%", note: "Verification against live Google Search snippets" },
      { label: "Tier 1 Latency", value: "1,250ms", note: "Gemini Grounded Search end-to-end response" },
      { label: "Cache Latency", value: "55ms", note: "P95 latency on semantic vector cache hit" },
    ],
    cases: [
      {
        id: "FACT-01",
        name: "Statistical Claim with Primary Source",
        category: "Claim Verification",
        expected: "Verified with Citation",
        observed: "Confidence 0.96; 3 citations linked",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Extracted claim: 'Renewable energy accounted for 30% of power in 2024'. Matched authoritative IEA release.",
      },
      {
        id: "FACT-02",
        name: "Search Quota Exhaustion Simulation",
        category: "Fallback Tier Resilience",
        expected: "Graceful Fallback to Tier 2",
        observed: "Tier 2 model invoked; disclaimer attached",
        badge: "PASSING",
        badgeVariant: "neutral",
        summary: "Injected 429 quota failure on primary API; pipeline routed to fallback grounded model in 1.4s without crashing.",
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
            <Target size={14} className="text-primary" />
            <span>Empirical Evaluations & Benchmarks</span>
          </span>
          <h3>Reliability Metrics & Ground Truth Testing</h3>
          <p className="benchmark-subtitle">
            AI systems engineered with rigorous evaluation suites (RAGAS, confusion matrices, and sandboxed reproduction tests) rather than optimistic demos.
          </p>
        </div>

        <div className="benchmark-nav">
          {(["code-review", "finsight", "factscope"] as ProjectEvalKey[]).map(key => (
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
          {benchmark.metrics.map(m => (
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
            {benchmark.cases.map(c => (
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
