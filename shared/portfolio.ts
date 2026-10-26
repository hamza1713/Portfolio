export const profile = {
  name: "Hamza Ali",
  role: "GenAI Application & AI Systems Engineer",
  location: "Pakistan · Remote",
  email: "hamza1713@gmail.com",
  github: "https://github.com/hamza1713",
  linkedin: "https://www.linkedin.com/in/hamza-ali-b9b8b22a6",
  resume: "/assets/Hamza_Ali_Resume_GenAI_Engineer.pdf",
  introduction:
    "I engineer production-grade GenAI platforms, multi-agent threat verification pipelines, and enterprise RAG systems that stay grounded, verifiable, and cost-lean.",
  biography:
    "Computer Science graduate from Abbottabad University of Science and Technology (2026), focused on Generative AI systems engineering, agentic workflows, deterministic AST analysis, and empirical evaluation harnesses. Certified in Machine Learning (Stanford / DeepLearning.AI), RAG Systems, and CrewAI Multi-Agent Systems.",
  experience:
    "During my 2024 Data Science internship at ATS AI Lab, I engineered pipelines over ~1 million NOAA lightning-strike telemetry records, transforming geospatial data into operational risk intelligence. Today, I build production AI architectures with strict authorization boundaries, deterministic proof engines, and instrumented evaluations.",
};

export type ProjectType =
  | "RAG knowledge system"
  | "AI agent / workflow"
  | "LLM reliability audit"
  | "Other AI product work";

export type Step = { title: string; description: string; detail: string };

export type Scenario = {
  id: string;
  label: string;
  input: string;
  steps: Step[];
  outcome: string;
  status: "success" | "blocked" | "fallback";
};

export type EvidenceItem = {
  value: string;
  label: string;
  scope: string;
  source: string;
};

export type ProjectDecision = {
  title: string;
  description: string;
  why?: string;
  tradeoff?: string;
};

export type ProjectPillar = {
  title: string;
  badge: string;
  description: string;
  capabilities: string[];
};

export type Project = {
  slug: string;
  title: string;
  version?: string;
  category: string;
  tagline?: string;
  summary: string;
  description: string;
  repository: string;
  image: string;
  video: string;
  accent: string;
  stack: string[];
  projectType: ProjectType;
  architectureDiagram?: string;
  evidence: EvidenceItem[];
  problem: string;
  contribution: string;
  decisions: ProjectDecision[];
  pillars?: ProjectPillar[];
  limitations: string[];
  lessons: string;
  scenarios: Scenario[];
  metricsBadge?: { label: string; value: string };
};

const finsightRepository = `${profile.github}/Enterprise-RAG-Chatbot-with-Role-Base-Access-Control-`;
const codeRepository = `${profile.github}/AI-Code-Review-Agent`;
const factscopeRepository = `${profile.github}/Factscope-AI`;

export const projects: Project[] = [
  {
    slug: "ai-code-review-agent",
    title: "AI Code Review Agent",
    version: "v3.0",
    category: "Developer Tooling · Zero-Trust Threat Verification",
    tagline: "The Zero-Trust Code Review & Threat Verification Agent for the AI Generation Era.",
    summary: "Deterministic AST dataflow, supply-chain slopsquatting defense, Trojan Source shields & empirical container sandbox proofs.",
    description:
      "A zero-trust code review platform that combines polyglot Tree-Sitter AST & inter-procedural taint analysis, AI supply-chain verification, cross-model adversarial consensus, assertion-locked test self-healing, and an interactive verification workbench.",
    repository: codeRepository,
    image: "/assets/projects/ai-code-review-agent",
    video: "/videos/CodeReview.mp4?v=20261013",
    accent: "violet",
    stack: [
      "FastAPI",
      "Tree-Sitter",
      "Model Context Protocol",
      "Gemini 2.5 Pro",
      "Claude 3.7",
      "Docker",
      "React 19",
      "OASIS SARIF",
    ],
    projectType: "AI agent / workflow",
    architectureDiagram: "/assets/codereview-architecture.svg",
    metricsBadge: { label: "Benchmark F1", value: "100.0%" },
    evidence: [
      {
        value: "100.0%",
        label: "Benchmark F1 & Accuracy",
        scope:
          "Reports 100.0% verdict accuracy, 100.0% precision, 100.0% recall, and 0.0% false positive rate on its 14-case ground-truth suite (scorer v2, upgraded from an initial 79.2% finding precision baseline). This is a scoped benchmark suite and not universal accuracy across every arbitrary external codebase.",
        source: `${codeRepository}#-evaluation--ground-truth-benchmarks`,
      },
      {
        value: "37+ Tests",
        label: "Automated test suites",
        scope:
          "Comprehensive pytest suites covering OASIS SARIF v2.1.0 export, real-time SSE streaming, supply-chain slopsquatting, Trojan Source Unicode Bidi stripping, and cross-family consensus.",
        source: `${codeRepository}#testing--quality-assurance`,
      },
      {
        value: "6 Languages",
        label: "Polyglot AST Support",
        scope:
          "Compiler-grade Tree-Sitter AST and inter-procedural taint graphs across Python, TypeScript, JavaScript, Go, Java, and Rust.",
        source: `${codeRepository}#pillar-2-deterministic-polyglot-engine--map-reduce-chunker`,
      },
      {
        value: "8 Tools",
        label: "Model Context Protocol",
        scope:
          "Standardized JSON-RPC 2.0 MCP server exposing SAST, governance rules (.code-review.yaml), AST callgraphs, and reproduction test generation to Claude Code & Cursor.",
        source: `${codeRepository}#model-context-protocol-mcp-server`,
      },
    ],
    pillars: [
      {
        title: "Pillar 1: Pre-Ingestion Shield & Supply Chain Verification",
        badge: "Zero-Trust Gate",
        description:
          "Intercepts AI-hallucinated packages (slopsquatting SEC-SLOPSQUAT-001) and typosquatting (SEC-TYPOSQUAT-002, Levenshtein <= 2) across PyPI, npm, Go, and Cargo. Strips Trojan Source Unicode Bidi overrides (CVE-2021-42574) and wraps untrusted diffs in canary-token XML sandboxes.",
        capabilities: [
          "Slopsquatting & dependency provenance verifier",
          "Trojan Source & invisible Unicode stripper",
          "Canary-token XML prompt injection defense",
          "Signed memory guard for immutable security invariants",
        ],
      },
      {
        title: "Pillar 2: Deterministic Polyglot Engine & Map-Reduce Chunker",
        badge: "Tree-Sitter AST",
        description:
          "Extracts compiler-grade ASTs across 6 programming languages, resolves multi-hop cross-file taint paths (routes -> services -> repositories), and enforces AI failure mode detectors (unawaited async auth bypass, blocking I/O, hollow stubs).",
        capabilities: [
          "Polyglot Tree-Sitter AST (Python, TS, JS, Go, Java, Rust)",
          "Inter-procedural call and taint graph resolution",
          "Risk-ranked Map-Reduce diff noise filtering",
          "AI defect detectors: AI-ASYNC-001, AI-STUB-001, AI-CONTRACT-001",
        ],
      },
      {
        title: "Pillar 3: Bounded Agentic ReAct Tool Loop",
        badge: "ReAct Agents",
        description:
          "Agents execute an iterative ReAct tool loop (up to 4 tool hops per agent) querying repository symbols, semantic vector context, live Ruff linting, and .code-review.yaml governance rules evaluated in < 1ms with 0 token cost.",
        capabilities: [
          "Bounded ReAct tool execution with loop caps",
          "Repository symbol & multi-hop taint querying",
          "Semantic vector RAG for cross-file context",
          "Sub-millisecond .code-review.yaml compliance checks",
        ],
      },
      {
        title: "Pillar 4: Cross-Family Adversarial Ensembles",
        badge: "Red-Team Critic",
        description:
          "Solves the LLM independence trap by pairing the Primary Reviewer (Gemini 2.5 Pro) with an orthogonal Adversarial Red-Team Critic (Claude 3.7 Sonnet) instructed to find adversarial counterexamples, emitting CONSENSUS_AGREED or ADVERSARIAL_DIVERGENCE.",
        capabilities: [
          "Cross-family model diversity (Google + Anthropic)",
          "Adversarial counterexample search before posting",
          "Consensus agreement telemetry and divergence tracking",
          "False alarm suppression via sanitizer discovery",
        ],
      },
      {
        title: "Pillar 5: Empirical Sandbox Proof & Assertion-Locked Self-Healing",
        badge: "Docker Sandbox",
        description:
          "Executes generated pytest reproduction suites inside an isolated container mounted at head_sha. When tests fail from API drift, the AST self-healer updates mock imports while locking AST assertions so tests cannot pass by deleting checks.",
        capabilities: [
          "Full-worktree Docker container execution at head_sha",
          "Hypothesis property-based test fuzzing",
          "AST assertion-locked test self-healer",
          "Verified reproducible exit codes (REPRODUCED / PASSING)",
        ],
      },
      {
        title: "Pillar 6: Cryptographic Attestation & Real-Time SSE Workbench",
        badge: "SARIF 2.1.0",
        description:
          "Calculates mathematical geometric-decay risk scoring, stamps immutable SHA-256 review receipts, exports OASIS SARIF v2.1.0 for GitHub Code Scanning, and streams 6 pipeline stages in real time via Server-Sent Events to a React 19 workbench.",
        capabilities: [
          "Geometric-decay risk scoring reconciler",
          "SHA-256 cryptographic review receipt",
          "OASIS SARIF v2.1.0 native GitHub code scanning export",
          "Real-time SSE streaming workbench (/api/review/stream)",
        ],
      },
    ],
    problem:
      "AI coding assistants write 70–90% of pull requests today. While syntactically clean, AI-generated code frequently introduces catastrophic silent failures: hallucinated dependency imports (slopsquatting), unawaited async authentication bypasses, hollow mock stubs, and invisible Unicode Bidi control characters that human reviewers miss.",
    contribution:
      "Architected an end-to-end zero-trust review platform: 6-pillar engine, multi-language Tree-Sitter AST indexer, pre-ingestion slopsquatting & Trojan Source sanitizers, cross-family adversarial verification (Gemini + Claude), containerized reproduction test runners, 8 MCP tools, 11 PR slash commands, and an interactive React 19 workbench.",
    decisions: [
      {
        title: "Proof over opinion: Deterministic checks before LLMs",
        description:
          "Static AST taint analysis, slopsquatting scanners, and policy governance run before LLM calls. If an issue can be proven mathematically or via compiler AST, no model speculation is tolerated.",
        why: "LLMs hallucinate false positives and suffer from prompt injection; compiler-grade ASTs provide 100% deterministic proofs.",
        tradeoff: "Requires maintaining polyglot Tree-Sitter grammars across 6 languages rather than relying on a single prompt.",
      },
      {
        title: "Cross-family adversarial consensus",
        description:
          "Paired Google Gemini 2.5 Pro with Anthropic Claude 3.7 Sonnet as an orthogonal red-team critic to disprove safety findings.",
        why: "Reviewers sharing the same model family as the coding assistant share correlated blind spots. Cross-family critique eliminates shared blind spots.",
        tradeoff: "Doubles LLM invocation latency on complex hunks, mitigated by risk-ranked diff chunking and static pre-filtering.",
      },
      {
        title: "AST assertion-locked test self-healing",
        description:
          "When sandboxed reproduction tests fail due to import or signature drift, the self-healer modifies mock scaffolding while cryptographically locking assertion nodes in the AST.",
        why: "Standard LLM test self-healing often cheats by weakening assertions or deleting the failing check altogether.",
        tradeoff: "Requires custom AST manipulation passes on pytest syntax trees.",
      },
    ],
    limitations: [
      "The 14-case ground-truth regression suite validates synthetic and real-world vulnerability patterns; it is a scoped benchmark and does not certify total absence of vulnerabilities across unanalyzed codebases.",
      "Dynamic Docker sandbox execution requires a container daemon; environments without Docker fall back to deterministic AST and static analysis verification.",
      "The final SARIF report attests to findings checked against defined CWEs, governance rules, and AST taint flows.",
    ],
    lessons:
      "True engineering trust in AI-generated code requires shifting from probabilistic text generation to deterministic proofs: compiler-grade ASTs, supply-chain verification, cross-model critique, and sandboxed reproduction tests.",
    scenarios: [
      {
        id: "unsafe",
        label: "Slopsquatting & Command Injection",
        input: "PR diff adds hallucinated package `flask-auth-helpers` + `subprocess.run(shell=True, input=user_input)`.",
        status: "success",
        outcome:
          "BLOCKING VERDICT — Caught by SEC-SLOPSQUAT-001 (package not found in PyPI) and SEC-003. Sandbox reproduction test confirmed exit code 1. Status: REPRODUCED.",
        steps: [
          {
            title: "Pre-Ingestion Shield",
            description: "Scan dependencies against PyPI/OSV and strip Unicode Bidi characters.",
            detail: "flask-auth-helpers -> SEC-SLOPSQUAT-001 (hallucinated package blocked)",
          },
          {
            title: "Polyglot AST & Taint Engine",
            description: "Tree-Sitter traces untrusted user_input directly into subprocess.run with shell=True.",
            detail: "AST taint sink -> SEC-003 (CWE-78 Command Injection)",
          },
          {
            title: "Adversarial Critic & Sandbox",
            description: "Claude 3.7 confirms vulnerability; Docker sandbox executes pytest reproduction suite.",
            detail: "Pytest in container -> exit code 1 (defect successfully reproduced)",
          },
          {
            title: "Cryptographic Attestation",
            description: "Emit SHA-256 receipt, SARIF v2.1.0 finding, and proposed AST patch diff.",
            detail: "SARIF 2.1.0 -> BLOCKING (badge: REPRODUCED)",
          },
        ],
      },
      {
        id: "clean",
        label: "Clean Parameterized Query",
        input: "PR diff refactors database access to use parameterized SQLAlchemy queries and pinned dependencies.",
        status: "success",
        outcome:
          "APPROVED — All static rules passed, dependency provenance verified, 0 AST taint paths detected. does not certify the rest of the unanalyzed codebase.",
        steps: [
          {
            title: "Pre-Ingestion Scan",
            description: "Verify package provenance on PyPI; check for Trojan Source Bidi characters.",
            detail: "Dependencies verified clean; zero Bidi characters",
          },
          {
            title: "AST Constant & Taint Check",
            description: "Analyze prepared statement bindings and AST query nodes.",
            detail: "Parameterized query safely binds arguments; 0 taint sinks found",
          },
          {
            title: "Consensus Verification",
            description: "Both models confirm clean pattern; no false alarm generated.",
            detail: "CONSENSUS_AGREED -> clean review verdict",
          },
        ],
      },
      {
        id: "unverified",
        label: "Missing Container Runtime",
        input: "PR review generates a regression test, but the Docker daemon or private dependency registry is unreachable.",
        status: "fallback",
        outcome:
          "WARNING — Finding reported based on AST taint analysis, but execution status is explicitly badged UNVERIFIED due to missing container runtime.",
        steps: [
          {
            title: "Identify Defect Candidate",
            description: "AST analysis detects suspicious deserialization pattern (CWE-502).",
            detail: "pickle.loads() without signature check -> candidate finding",
          },
          {
            title: "Check Container Runtime",
            description: "Execution sandbox cannot mount container or reach private dependency mirror.",
            detail: "Docker daemon unavailable -> sandbox skipped",
          },
          {
            title: "Badge Evidence Transparently",
            description: "Report the static finding clearly distinguished from sandboxed empirical proofs.",
            detail: "Evidence badge -> UNVERIFIED (limitation explicitly recorded)",
          },
        ],
      },
    ],
  },
  {
    slug: "finsight",
    title: "FinSight",
    version: "Staging Candidate",
    category: "Enterprise Knowledge · RAG + Natural Language SQL",
    tagline: "Role-Scoped Enterprise Knowledge Workspace with Hybrid RRF & In-Memory DuckDB SQL Sandbox.",
    summary: "Ask company data. Keep the boundaries. 4-stage hybrid RRF, 3-layer RBAC, and sub-20ms role-scoped Redis cache replay.",
    description:
      "A production-staged, role-aware AI workspace that combines hybrid dense+sparse retrieval (ChromaDB + SQLite FTS5 BM25 + Reciprocal Rank Fusion + Cohere Rerank v3) with an in-memory DuckDB SQL analytics sandbox, protected by 3-layer authorization.",
    repository: finsightRepository,
    image: "/assets/projects/finsight",
    video: "/videos/Finsight.mp4?v=20261013",
    accent: "teal",
    stack: [
      "FastAPI",
      "React 19",
      "TypeScript",
      "ChromaDB",
      "SQLite FTS5",
      "DuckDB",
      "Redis",
      "Cohere Rerank",
      "RAGAS",
      "Docker",
    ],
    projectType: "RAG knowledge system",
    architectureDiagram: "/assets/finsight-architecture.svg",
    metricsBadge: { label: "Automated Tests", value: "90 Passed" },
    evidence: [
      {
        value: "90",
        label: "automated tests passed",
        scope:
          "60 backend API & RBAC tests, 5 rate-limiting and role-scoped cache resilience tests, 20 OWASP security regression tests, and 5 frontend NDJSON stream tests.",
        source: `${finsightRepository}#-testing`,
      },
      {
        value: "0.894",
        label: "RAGAS answer relevancy",
        scope:
          "Measured via Gemini LLM-as-judge on curated enterprise QA pairs, with 0.850 average faithfulness (up to 1.00 on Engineering) and 0.933 overall RBAC security score.",
        source: `${finsightRepository}#-evaluation-scorecard`,
      },
      {
        value: "< 20ms",
        label: "cached query replay",
        scope:
          "Role-scoped multi-tier query cache (Redis 7 + memory fallback) with SHA-256 role-isolated keys and sub-20ms streaming NDJSON replay.",
        source: `${finsightRepository}#-5-production-resilience-rate-limiting--multi-tier-caching`,
      },
      {
        value: "6",
        label: "protected roles",
        scope:
          "Department isolation covering C-Level, Finance, HR, Marketing, Engineering, and General across document and structured CSV collections.",
        source: `${finsightRepository}#-role--permission-matrix`,
      },
    ],
    pillars: [
      {
        title: "Pillar 1: 3-Layer Role-Based Access Control (RBAC)",
        badge: "Zero Cross-Dept Leak",
        description:
          "Layer 1 verifies JWT and re-fetches current database role per request to defend against stale tokens. Layer 2 executes a pre-LLM department phrase guard blocking cross-role queries before retrieval. Layer 3 enforces ChromaDB metadata filters and DuckDB table whitelists.",
        capabilities: [
          "Layer 1: JWT HS256 auth + live DB role re-fetch",
          "Layer 2: Pre-LLM department guard (0 token cost on denial)",
          "Layer 3: ChromaDB role filter + DuckDB table whitelist",
          "100% RBAC filter correctness across 6 enterprise roles",
        ],
      },
      {
        title: "Pillar 2: 4-Stage Hybrid Retrieval & RRF Fusion",
        badge: "RRF + Cohere",
        description:
          "Stage 1 expands queries into 3 semantic variants in parallel. Stage 2 executes concurrent ChromaDB dense vector search and SQLite FTS5 BM25 keyword search. Stage 3 fuses candidates via Reciprocal Rank Fusion (RRF). Stage 4 applies Cohere Rerank v3 cross-encoder scoring.",
        capabilities: [
          "Stage 1: Parallel Gemini semantic query expansion (x3)",
          "Stage 2: Dense ChromaDB cosine + Sparse SQLite FTS5 BM25",
          "Stage 3: Reciprocal Rank Fusion (RRF score = sum 1 / (60 + rank))",
          "Stage 4: Cohere Rerank v3 cross-encoder scoring -> top 6 chunks",
        ],
      },
      {
        title: "Pillar 3: In-Memory DuckDB SQL Sandbox",
        badge: "OWASP Sandbox",
        description:
          "Natural language queries targeting CSV tables are converted to SQL and executed in an isolated DuckDB in-memory sandbox with external file access disabled, a 256MB memory cap, 10s timeout, and automatic fallback to RAG on empty results.",
        capabilities: [
          "duckdb.connect(':memory:', config={'enable_external_access': False})",
          "SELECT-only AST query validation (no DDL/DML)",
          "10-second interrupt timer & 1,000-row result cap",
          "Automatic SQL -> RAG fallback on ambiguous intent",
        ],
      },
      {
        title: "Pillar 4: Production Resilience & Role-Scoped Caching",
        badge: "Redis < 20ms",
        description:
          "SlowAPI rate limiters defend sensitive endpoints (/login 5/min, /upload-docs 10/min, /chat 30/min). Role-scoped Redis cache stores queries under role-digest keys for instant sub-20ms streaming replay with zero cross-tenant cache bleeding.",
        capabilities: [
          "SlowAPI tiered rate limiting per IP and authenticated user",
          "Role-scoped Redis query caching (finsight:query:{role}:{digest})",
          "Sub-20ms streaming NDJSON replay on cache hits",
          "Self-healing database reconciliation on server startup",
        ],
      },
    ],
    problem:
      "Enterprise knowledge is divided across unstructured documents (PDFs, policies, runbooks) and structured data (CSV spreadsheets, transactions). Employees spend hours reading reports to find single data points, while existing AI tools lack department governance, risking catastrophic leaks of payroll records or financial statements.",
    contribution:
      "Designed and shipped FinSight: FastAPI backend with 3-layer RBAC defense, 4-stage hybrid RRF retrieval (ChromaDB + SQLite FTS5 + Cohere), in-memory DuckDB SQL sandbox, SlowAPI rate limiting, role-isolated Redis caching, self-healing startup routines, dual-track RAGAS evaluations, and a React 19 streaming chat interface.",
    decisions: [
      {
        title: "Authorization before classification and retrieval",
        description:
          "Department access boundaries are evaluated at Layer 1 and Layer 2 before any query classification, retrieval, or LLM call is made.",
        why: "Prevents prompt injection attacks from jailbreaking department boundaries and eliminates LLM token spend on unauthorized queries.",
        tradeoff: "Requires maintaining department phrase dictionaries and role mappings alongside database permissions.",
      },
      {
        title: "Reciprocal Rank Fusion (RRF) for hybrid dense + sparse retrieval",
        description:
          "Fuses dense embeddings from ChromaDB with sparse BM25 keyword ranks from SQLite FTS5 using reciprocal rank math.",
        why: "Dense vectors capture semantic intent but miss exact acronyms and part numbers; BM25 catches exact tokens but misses paraphrases. RRF combines both without retraining.",
        tradeoff: "Requires executing two parallel retrieval queries and deduplicating document candidates.",
      },
      {
        title: "In-memory DuckDB sandbox with external access disabled",
        description:
          "Runs generated SQL queries exclusively inside an isolated in-memory DuckDB instance where only authorized table DataFrames are copied in.",
        why: "Guarantees that generated SQL can never read host files, write to disk, or access tables outside the user's role.",
        tradeoff: "Incurs small in-memory table copy overhead on startup.",
      },
    ],
    limitations: [
      "The indexer, evaluation lock, and local databases use process-local state; production deployments use a single Uvicorn backend worker or require shared external redis/database services for multi-node horizontal scale.",
      "The DuckDB sandbox enforces a 1,000-row cap and a 10-second interrupt timer to prevent runaway queries.",
      "Semantic overlap between general company terms and department keywords requires ongoing phrase calibration.",
    ],
    lessons:
      "High-reliability enterprise AI is 80% data routing, access control, and retrieval engineering, and only 20% prompt construction: permissions must precede generation, and structured data must never be left to LLM hallucination.",
    scenarios: [
      {
        id: "document",
        label: "Department Document RAG",
        input: "HR user: ‘Summarize the employee onboarding policy.’",
        status: "success",
        outcome:
          "SUCCESS — Verified source-cited answer streamed via NDJSON from HR-scoped ChromaDB + SQLite FTS5 collection.",
        steps: [
          {
            title: "Check access",
            description: "Establish user role and verify JWT token in database.",
            detail: "HR access -> HR document and table scope verified",
          },
          {
            title: "Route the question",
            description: "Query classifier routes policy question to RAG pipeline.",
            detail: "Question type -> HybridMultiQueryRetriever",
          },
          {
            title: "Retrieve context",
            description: "ChromaDB dense search + SQLite FTS5 BM25 fused via RRF.",
            detail: "RRF score -> top 6 passages reranked via Cohere",
          },
          {
            title: "Ground the answer",
            description: "Gemini streams source-grounded response with citation links.",
            detail: "Context + query -> real-time NDJSON stream",
          },
        ],
      },
      {
        id: "sql",
        label: "Structured CSV Analytics",
        input: "Finance user: ‘Show vendor expenses greater than $50,000.’",
        status: "success",
        outcome:
          "SUCCESS — Structured tabular answer generated from DuckDB in-memory sandbox with verified SQL query and source file citation.",
        steps: [
          {
            title: "Check access",
            description: "Verify user belongs to Finance department.",
            detail: "Finance role -> authorized finance tables whitelist",
          },
          {
            title: "Route to SQL",
            description: "Gemini classifier routes aggregation request to SQL agent.",
            detail: "Analytics intent -> NL-to-SQL generation",
          },
          {
            title: "Execute in Sandbox",
            description: "Query runs inside isolated in-memory DuckDB sandbox.",
            detail: "DuckDB :memory: -> filtered vendor expense rows",
          },
          {
            title: "Present Result",
            description: "Conceal raw SQL from client and format clean verified table.",
            detail: "Structured Data badge -> formatted tabular output",
          },
        ],
      },
      {
        id: "restricted",
        label: "Cross-Department Denial",
        input: "HR user: ‘What is Finance’s gross margin?’",
        status: "blocked",
        outcome:
          "ACCESS DENIED — Pre-LLM department guard blocked the query before retrieval or model invocation. Zero tokens consumed, zero data exposed.",
        steps: [
          {
            title: "Check access",
            description: "Layer 2 department guard scans query intent against user department.",
            detail: "HR access != Finance scope (finance phrase detected)",
          },
          {
            title: "Stop at the boundary",
            description: "Formatted denial returned immediately without invoking LLM or data store.",
            detail: "Denied -> no model call, no data accessed, 0 token spend",
          },
        ],
      },
    ],
  },
  {
    slug: "factscope-ai",
    title: "Factscope AI",
    version: "v2.0 · Web + Electron",
    category: "Information Integrity · Real-Time Web Grounding",
    tagline: "AI-Assisted News Credibility & Claim Analysis — Web and Desktop.",
    summary: "Deconstruct articles into checkable claims, ground against live Google Search, and stream auditable verdicts with 3-tier fallback.",
    description:
      "A full-stack information integrity platform that decomposes articles or URLs into discrete factual propositions, verifies them against live Google Search grounding, and provides confidence-scored verdicts with a 3-tier failover engine and desktop Electron 36 packaging.",
    repository: factscopeRepository,
    image: "/assets/projects/factscope-ai",
    video: "/videos/Factscope.mp4",
    accent: "amber",
    stack: [
      "Gemini 2.5 Flash",
      "Google Search",
      "React 19",
      "Express",
      "Electron 36",
      "Tailwind v4",
      "TypeScript",
      "Vercel Serverless",
    ],
    projectType: "Other AI product work",
    architectureDiagram: "/assets/factscope-pipeline.svg",
    metricsBadge: { label: "Deployment", value: "Web + Desktop" },
    evidence: [
      {
        value: "3 Tiers",
        label: "AI failover engine",
        scope:
          "Automatic model degradation: Gemini 2.5 Flash + Search -> Gemini 3.1 Flash Lite + Search -> Gemini 3.1 Flash Lite Searchless. Recovers from quota errors.",
        source: factscopeRepository,
      },
      {
        value: "24h",
        label: "intelligent caching",
        scope:
          "Normalized input and URL hash caching in local database, eliminating redundant API charges and latency on duplicate analyses.",
        source: factscopeRepository,
      },
      {
        value: "Web + Desktop",
        label: "deployment modes",
        scope:
          "React 19 + Express serverless web deployment and Electron 36 native desktop packaging with tray controls, dynamic port binding, and local key storage.",
        source: factscopeRepository,
      },
      {
        value: "5",
        label: "credibility labels",
        scope:
          "Classifies content into REAL, FAKE, MISLEADING, SATIRE, or UNVERIFIED with granular per-claim verdicts and direct citation links.",
        source: factscopeRepository,
      },
    ],
    pillars: [
      {
        title: "Pillar 1: Structured Claim Deconstruction",
        badge: "Claim Extraction",
        description:
          "Deconstructs raw text or scraped URLs into 2–4 checkable factual propositions, filtering rhetoric and opinion from verifiable claims.",
        capabilities: [
          "Custom server-side HTML parser (no headless browser needed)",
          "Dual input mode: raw text or direct URL scraping",
          "Automated claim isolation with entity extraction",
        ],
      },
      {
        title: "Pillar 2: Real-Time Web Grounding & 3-Tier Fallback",
        badge: "Search Grounding",
        description:
          "Verifies claims against live Google Search results. If primary quotas are exhausted, seamlessly falls back across 3 resilience tiers.",
        capabilities: [
          "Live Google Search grounding citations",
          "Tier 1: Gemini 2.5 Flash + Search",
          "Tier 2: Gemini 3.1 Flash Lite + Search",
          "Tier 3: Gemini 3.1 Flash Lite Searchless",
        ],
      },
      {
        title: "Pillar 3: Contextual Q&A & Global Analytics",
        badge: "Analytics Dashboard",
        description:
          "Enables multi-turn conversational exploration of analysis reports, while a persistent database tracks historical checks, verdict distribution, and debunked claims.",
        capabilities: [
          "Full analysis report injected into chat context",
          "Persistent historical database (data/db.json)",
          "Global verdict distribution & debunked claims feed",
          "One-click formatted report clipboard export",
        ],
      },
    ],
    problem:
      "Misinformation spreads 6x faster than accurate news on social platforms, while standard LLMs suffer from knowledge cutoffs and hallucinate plausible-sounding falsehoods when asked to verify current events.",
    contribution:
      "Engineered a full-stack credibility verification platform: server-side HTML text extractor, 3-tier Gemini fallback engine with Google Search grounding, 24-hour cache layer, contextual follow-up chat, persistent analytics dashboard, and native Electron 36 desktop application.",
    decisions: [
      {
        title: "Decompose articles into discrete claims before verification",
        description:
          "Articles often mix true background facts with misleading conclusions. Checking individual claims isolates the falsehood.",
        why: "A single binary true/false label for an entire article is too coarse; granular claim scoring provides auditable reasoning.",
        tradeoff: "Requires multi-step LLM extraction before search verification.",
      },
      {
        title: "3-tier automatic model degradation",
        description:
          "When Gemini 2.5 Flash or search tools encounter rate limits, the system automatically falls back to lightweight flash-lite models, and finally to searchless mode with explicit caveats.",
        why: "Guarantees application availability during breaking news traffic spikes or API quota limits.",
        tradeoff: "Tier 3 lacks fresh search grounding and must be explicitly flagged to the user.",
      },
      {
        title: "Server-side HTML scraper without headless browsers",
        description:
          "Built a lightweight regex-based HTML text extractor stripping scripts, styles, and SVGs directly on the Node.js/Express server.",
        why: "Eliminates heavy Puppeteer/Playwright headless browser dependencies, keeping deployment light and serverless-compatible.",
        tradeoff: "Cannot render JavaScript-heavy single-page news apps.",
      },
    ],
    limitations: [
      "A confidence score is a calibrated metric of evidence agreement, not a mathematical guarantee of factual truth.",
      "Google Search grounding depends on authoritative web sources; emerging breaking news may lack indexed primary reporting.",
      "Tier 3 fallback operates without search grounding and relies solely on pre-trained knowledge.",
    ],
    lessons:
      "Resilience in AI applications requires multi-tier failovers, caching, and honest UI status indicators: users must always know whether an answer was grounded in live search or generated from model memory.",
    scenarios: [
      {
        id: "verify",
        label: "Analyze News Article",
        input: "Breaking claim: ‘Scientists discover that lemon water cures type 2 diabetes in 30 days.’",
        status: "success",
        outcome:
          "VERDICT: FAKE (97% Confidence) — Claim isolated, disproved via Harvard Medical School and ADA sources. Per-claim verdict: FALSE.",
        steps: [
          {
            title: "Deconstruct claims",
            description: "Isolate specific checkable propositions from input.",
            detail: "Input -> 2 checkable medical claims",
          },
          {
            title: "Search Grounding",
            description: "Query Google Search for peer-reviewed medical publications.",
            detail: "Google Search -> Harvard Health & ADA guidelines",
          },
          {
            title: "Score Credibility",
            description: "Cross-reference retrieved sources with claims to produce verdict.",
            detail: "Verdict: FAKE (97% confidence, 2 citations linked)",
          },
          {
            title: "Persist Analytics",
            description: "Cache result for 24h and record debunked claim in database.",
            detail: "Saved to data/db.json -> available in dashboard",
          },
        ],
      },
      {
        id: "fallback",
        label: "Search Quota Fallback",
        input: "High-volume request triggers HTTP 429 quota exhaustion on primary Gemini Search API.",
        status: "fallback",
        outcome:
          "FALLBACK ACTIVE — Tier 2 / Tier 3 invoked. Claim verified using fallback model; fresh verification is not implied without Search grounding.",
        steps: [
          {
            title: "Detect Quota Error",
            description: "Primary Gemini 2.5 Flash API returns 429 rate limit.",
            detail: "HTTP 429 -> trigger 3-tier fallback engine",
          },
          {
            title: "Switch to Tier 2",
            description: "Retry request with Gemini 3.1 Flash Lite while retaining search.",
            detail: "gemini-3.1-flash-lite + Search -> fallback attempt",
          },
          {
            title: "Explain freshness",
            description: "If search quota fails, invoke Tier 3 searchless mode with explicit disclaimer.",
            detail: "Gemini 3.1 Flash Lite without Search -> degraded result badge",
          },
        ],
      },
    ],
  },
];

export const services: {
  title: string;
  description: string;
  deliverable: string;
  projectType: ProjectType;
  projectSlug: string;
}[] = [
  {
    title: "Enterprise RAG & Hybrid Knowledge Retrieval",
    description:
      "Production-grade enterprise knowledge systems with 4-stage hybrid retrieval (RRF + Cohere rerank), 3-layer RBAC department isolation, and in-memory SQL sandboxes.",
    deliverable: "Production Architecture + Tested Implementation + Handoff",
    projectType: "RAG knowledge system",
    projectSlug: "finsight",
  },
  {
    title: "Autonomous Multi-Agent Workflows & Threat Defense",
    description:
      "Zero-trust multi-agent pipelines orchestrated with Tree-Sitter AST taint tracking, Model Context Protocol (MCP) servers, and sandboxed test self-healing.",
    deliverable: "Agent Workflow + MCP Server + SARIF CI/CD Pipeline",
    projectType: "AI agent / workflow",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "LLM Quality Audits, Caching & Evaluation Harnesses",
    description:
      "Eliminate hallucinations, brittle prompts, and runaway token bills with dual-tier semantic caching, P95 latency profiling, and RAGAS benchmark suites.",
    deliverable: "Technical Audit + RAGAS Ground-Truth Harness + Cost Telemetry",
    projectType: "LLM reliability audit",
    projectSlug: "factscope-ai",
  },
];

export const capabilities = [
  {
    title: "Hybrid Retrieval & RRF",
    detail: "ChromaDB · SQLite FTS5 · DuckDB · Cohere Rerank v3",
    projectSlug: "finsight",
  },
  {
    title: "Multi-Agent & MCP Systems",
    detail: "Model Context Protocol · Tree-Sitter AST · Adversarial Crews",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "Empirical Evals & Benchmarks",
    detail: "RAGAS · DeepEval · Ground-Truth Regression Suites · SARIF 2.1.0",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "Production Infrastructure",
    detail: "FastAPI · Redis · Docker · React 19 · Electron 36",
    projectSlug: "finsight",
  },
];

export function getProject(slug: string) {
  return projects.find(project => project.slug === slug);
}

export function getScenario(project: Project, id: string) {
  return (
    project.scenarios.find(scenario => scenario.id === id) ??
    project.scenarios[0]
  );
}

export function moveStep(current: number, delta: number, count: number) {
  return Math.max(0, Math.min(count - 1, current + delta));
}

export function getPortfolioFacts() {
  return [
    profile.biography,
    profile.experience,
    `Contact: ${profile.email}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}. CV: ${profile.resume}.`,
    ...capabilities.map(c => `Capability: ${c.title} — ${c.detail}.`),
    ...projects.map(
      p =>
        `${p.title} (${p.category}): Tech stack: ${p.stack.join(", ")}. ${p.description} ${p.contribution} Evidence: ${p.evidence.map(e => `${e.value} ${e.label}: ${e.scope}`).join(" ")} Limitations: ${p.limitations.join(" ")} Case study: /projects/${p.slug}. Source: ${p.repository}.`
    ),
    ...services.map(
      s =>
        `Service: ${s.title}. ${s.description} Deliverable: ${s.deliverable}.`
    ),
    "Open to full-time remote GenAI and AI/ML systems engineering opportunities, contracts, and startup consulting.",
  ].join("\n");
}
