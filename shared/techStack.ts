export type TechCategory =
  | "all"
  | "ai-agents"
  | "data-retrieval"
  | "frameworks"
  | "cloud-devops";

export type TechItem = {
  id: string;
  name: string;
  category: "ai-agents" | "data-retrieval" | "frameworks" | "cloud-devops";
  categoryLabel: string;
  role: string;
  description: string;
  brandColor: string;
  experienceLevel: "Production" | "Advanced" | "Core";
  projects?: { name: string; slug: string }[];
};

export const TECH_CATEGORIES: { id: TechCategory; label: string; count?: number }[] = [
  { id: "all", label: "All Technologies" },
  { id: "ai-agents", label: "AI & Agents" },
  { id: "data-retrieval", label: "Vector & Data" },
  { id: "frameworks", label: "Backend & Systems" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
];

export const TECH_STACK: TechItem[] = [
  // AI & Agents
  {
    id: "crewai",
    name: "CrewAI",
    category: "ai-agents",
    categoryLabel: "Agentic Framework",
    role: "Multi-Agent Orchestration",
    description: "Orchestrated specialist reviewer agents (Security, Correctness, Performance) with role-based collaboration in the AI Code Review Agent.",
    brandColor: "#FF4B4B",
    experienceLevel: "Production",
    projects: [{ name: "AI Code Review Agent", slug: "ai-code-review-agent" }],
  },
  {
    id: "mcp",
    name: "Model Context Protocol",
    category: "ai-agents",
    categoryLabel: "Agent Standards",
    role: "Tool & Context Interoperability",
    description: "Built JSON-RPC 2.0 MCP servers and tool clients exposing deterministic scanners and AST callgraph engines directly to AI agents.",
    brandColor: "#D97706",
    experienceLevel: "Production",
    projects: [{ name: "AI Code Review Agent", slug: "ai-code-review-agent" }],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "ai-agents",
    categoryLabel: "Foundation Models",
    role: "Multimodal & Grounded LLMs",
    description: "Integrated Gemini 2.5 Flash & 1.5 Pro with Google Search grounding for real-time article claim verification and portfolio assistance.",
    brandColor: "#4E88F5",
    experienceLevel: "Production",
    projects: [
      { name: "Factscope AI", slug: "factscope-ai" },
      { name: "AI Code Review Agent", slug: "ai-code-review-agent" },
    ],
  },
  {
    id: "ragas",
    name: "RAGAS",
    category: "ai-agents",
    categoryLabel: "AI Evaluation",
    role: "Automated RAG Benchmarking",
    description: "Synthesized ground-truth evaluation suites measuring Faithfulness (0.94), Answer Relevance (0.91), and Context Recall across FinSight's document store.",
    brandColor: "#9333EA",
    experienceLevel: "Advanced",
    projects: [{ name: "FinSight", slug: "finsight" }],
  },
  {
    id: "langchain",
    name: "LangChain & LangGraph",
    category: "ai-agents",
    categoryLabel: "Orchestration",
    role: "Chains & State Machines",
    description: "Engineered recursive prompt templates, output parsers, and stateful multi-step reasoning workflows.",
    brandColor: "#2E7D32",
    experienceLevel: "Advanced",
  },
  {
    id: "huggingface",
    name: "Transformers & FastEmbed",
    category: "ai-agents",
    categoryLabel: "Embedding Models",
    role: "Local Vector Embedding",
    description: "Embedded high-density vector representations using BGE and Sentence-Transformers with local ONNX runtime acceleration.",
    brandColor: "#FFD21E",
    experienceLevel: "Core",
  },

  // Vector & Data
  {
    id: "chromadb",
    name: "ChromaDB",
    category: "data-retrieval",
    categoryLabel: "Vector Database",
    role: "Dense Document Retrieval",
    description: "Partitioned department-isolated embedding collections with cosine distance metrics for FinSight's role-based enterprise RAG.",
    brandColor: "#F97316",
    experienceLevel: "Production",
    projects: [{ name: "FinSight", slug: "finsight" }],
  },
  {
    id: "duckdb",
    name: "DuckDB",
    category: "data-retrieval",
    categoryLabel: "Analytical SQL OLAP",
    role: "High-Speed In-Process Analytics",
    description: "Executed deterministic natural-language SQL queries over financial transaction tables with zero server overhead and microsecond query times.",
    brandColor: "#EAB308",
    experienceLevel: "Production",
    projects: [{ name: "FinSight", slug: "finsight" }],
  },
  {
    id: "postgresql",
    name: "PostgreSQL / pgvector",
    category: "data-retrieval",
    categoryLabel: "Relational & Vector",
    role: "Durable Enterprise Storage",
    description: "Architected relational schemas, RBAC permission tables, and hybrid keyword + vector indexing strategies.",
    brandColor: "#336791",
    experienceLevel: "Advanced",
    projects: [{ name: "FinSight", slug: "finsight" }],
  },
  {
    id: "tidb",
    name: "TiDB / MySQL",
    category: "data-retrieval",
    categoryLabel: "Distributed SQL",
    role: "Scalable Cloud Persistence",
    description: "Managed distributed SQL schemas with Drizzle ORM for transaction consistency and client lead storage.",
    brandColor: "#E30C34",
    experienceLevel: "Production",
  },
  {
    id: "pandas",
    name: "Pandas & NumPy",
    category: "data-retrieval",
    categoryLabel: "Data Engineering",
    role: "Large-Scale Data Processing",
    description: "Engineered feature extraction pipelines over 1,000,000+ NOAA lightning-strike telemetry records during Data Science tenure at ATS AI Lab.",
    brandColor: "#38A169",
    experienceLevel: "Core",
  },

  // Backend & Systems
  {
    id: "python",
    name: "Python 3.11+",
    category: "frameworks",
    categoryLabel: "Core Language",
    role: "AI Pipelines & System Logic",
    description: "Primary language for multi-agent workflows, FastAPI async endpoints, ChromaDB embeddings, and empirical evaluation harnesses.",
    brandColor: "#3776AB",
    experienceLevel: "Core",
    projects: [
      { name: "FinSight", slug: "finsight" },
      { name: "AI Code Review Agent", slug: "ai-code-review-agent" },
    ],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "frameworks",
    categoryLabel: "Async Web Framework",
    role: "High-Throughput AI Microservices",
    description: "Built typed, asynchronous REST APIs with Pydantic v2 validation, streaming responses, and automatic OpenAPI documentation.",
    brandColor: "#05998B",
    experienceLevel: "Production",
    projects: [
      { name: "FinSight", slug: "finsight" },
      { name: "AI Code Review Agent", slug: "ai-code-review-agent" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript / Node.js",
    category: "frameworks",
    categoryLabel: "Full-Stack Language",
    role: "Type-Safe Application Layer",
    description: "Implemented full-stack end-to-end type safety, tRPC procedure routers, Zod contract validation, and SSR prerendering pipelines.",
    brandColor: "#3178C6",
    experienceLevel: "Core",
  },
  {
    id: "react",
    name: "React 19 & Tailwind",
    category: "frameworks",
    categoryLabel: "Frontend Architecture",
    role: "Interactive Client Interfaces",
    description: "Engineered responsive, accessible interfaces, custom visualizers, keyboard command palettes, and real-time streaming chat boxes.",
    brandColor: "#61DAFB",
    experienceLevel: "Production",
    projects: [
      { name: "FinSight", slug: "finsight" },
      { name: "Factscope AI", slug: "factscope-ai" },
    ],
  },
  {
    id: "semgrep",
    name: "Semgrep",
    category: "frameworks",
    categoryLabel: "AST Code Analysis",
    role: "Deterministic Static Analysis",
    description: "Authored custom security and pattern-matching rules catching syntax vulnerabilities before sending diffs to costly LLM review crews.",
    brandColor: "#2B5876",
    experienceLevel: "Production",
    projects: [{ name: "AI Code Review Agent", slug: "ai-code-review-agent" }],
  },

  // Cloud & DevOps
  {
    id: "aws",
    name: "Amazon Web Services (AWS)",
    category: "cloud-devops",
    categoryLabel: "Cloud Infrastructure",
    role: "Cloud Storage & Serverless",
    description: "Configured AWS S3 object storage with pre-signed upload URLs, IAM least-privilege security roles, and Lambda microservices.",
    brandColor: "#FF9900",
    experienceLevel: "Production",
  },
  {
    id: "gcp",
    name: "Google Cloud Platform (GCP)",
    category: "cloud-devops",
    categoryLabel: "Cloud & GenAI",
    role: "Vertex AI & Cloud Run",
    description: "Deployed containerized microservices to Google Cloud Run and leveraged Vertex AI endpoints with low-latency regional routing.",
    brandColor: "#4285F4",
    experienceLevel: "Advanced",
    projects: [{ name: "Factscope AI", slug: "factscope-ai" }],
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud-devops",
    categoryLabel: "Containerization",
    role: "Isolated Execution Environments",
    description: "Built sandboxed Docker containers for safe execution of LLM-generated regression tests and reproducible multi-container deployments.",
    brandColor: "#2496ED",
    experienceLevel: "Production",
    projects: [{ name: "AI Code Review Agent", slug: "ai-code-review-agent" }],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "cloud-devops",
    categoryLabel: "Edge & Serverless",
    role: "Global Edge Deployment",
    description: "Configured edge caching, automated branch previews, Speed Insights telemetry, and serverless API route rewrites.",
    brandColor: "#FFFFFF",
    experienceLevel: "Production",
    projects: [{ name: "Factscope AI", slug: "factscope-ai" }],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "cloud-devops",
    categoryLabel: "CI/CD & Governance",
    role: "Automated Workflows & SARIF",
    description: "Constructed automated testing workflows, Playwright browser test runners, and SARIF pull-request code annotations.",
    brandColor: "#2088FF",
    experienceLevel: "Production",
    projects: [{ name: "AI Code Review Agent", slug: "ai-code-review-agent" }],
  },
];
