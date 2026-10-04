export const profile = {
  name: "Hamza Ali",
  role: "GenAI / AI-ML Engineer",
  location: "Pakistan · Remote",
  email: "hamza1713@gmail.com",
  github: "https://github.com/hamza1713",
  linkedin: "https://www.linkedin.com/in/hamza-ali-b9b8b22a6",
  resume: "/assets/Hamza_Ali_Resume_GenAI_Engineer.pdf",
  introduction:
    "I build AI systems that turn complex information into useful answers.",
  biography:
    "I’m a Computer Science graduate from Abbottabad University of Science and Technology (2026), focused on Generative AI engineering. I work across retrieval, agents, evaluation, and the interfaces that make those systems useful.",
  experience:
    "During my 2024 Data Science internship at ATS AI Lab, I worked with roughly one million NOAA lightning-strike records. Data quality, feature engineering, visualization, and communicating findings shaped how I approach engineering today.",
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
export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  repository: string;
  image: string;
  video: string;
  accent: string;
  stack: string[];
  projectType: ProjectType;
  evidence: { value: string; label: string; scope: string; source: string }[];
  problem: string;
  contribution: string;
  decisions: { title: string; description: string }[];
  limitations: string[];
  lessons: string;
  scenarios: Scenario[];
};

const finsightRepository = `${profile.github}/Enterprise-RAG-Chatbot-with-Role-Base-Access-Control-`;
const codeRepository = `${profile.github}/AI-Code-Review-Agent`;
const factscopeRepository = `${profile.github}/Factscope-AI`;

export const projects: Project[] = [
  {
    slug: "finsight",
    title: "FinSight",
    category: "Enterprise knowledge · RAG + SQL",
    summary: "Ask company data. Keep the boundaries.",
    description:
      "A role-aware AI workspace that answers document questions and explores structured data, with department isolation before a model sees the request.",
    repository: finsightRepository,
    image: "/assets/projects/finsight",
    video: "/videos/Finsight.mp4",
    accent: "teal",
    stack: ["Python", "FastAPI", "React", "ChromaDB", "DuckDB", "RAGAS"],
    projectType: "RAG knowledge system",
    evidence: [
      {
        value: "6",
        label: "protected roles",
        scope:
          "The documented role and permission matrix covers six user roles.",
        source: `${finsightRepository}#-role--permission-matrix`,
      },
      {
        value: "RAG + SQL",
        label: "two answer paths",
        scope:
          "Document retrieval and structured analytics use different execution paths.",
        source: finsightRepository,
      },
    ],
    problem:
      "Company knowledge spans policies, reports, and structured tables. A single chat interface needs to choose the right data source without exposing information outside a user’s department.",
    contribution:
      "This portfolio project brings together the React workspace, FastAPI request lifecycle, document retrieval, natural-language SQL, role enforcement, and evaluation workflows. The repository and walkthrough show the implementation rather than a claimed client deployment.",
    decisions: [
      {
        title: "Permissions before generation",
        description:
          "Department-scoped access controls constrain the request before data is passed to the model. Retrieval is part of the security boundary.",
      },
      {
        title: "A separate path for structured questions",
        description:
          "DuckDB handles table analytics; ChromaDB supports document retrieval. Routing avoids treating every question as a document search.",
      },
      {
        title: "Make answers inspectable",
        description:
          "Source-aware responses and evaluation workflows make retrieval and answer quality easier to examine.",
      },
    ],
    limitations: [
      "The portfolio provides a recording and source code; a public live deployment is not verified.",
      "Permission tests cover defined scenarios. They are not a guarantee against every possible data leak.",
      "Hybrid retrieval and cross-source table/text fusion are listed as future enhancements in the repository.",
    ],
    lessons:
      "The quality of an AI answer starts before the prompt: with access boundaries, data selection, and the decision about which engine should answer.",
    scenarios: [
      {
        id: "document",
        label: "Document question",
        input: "HR user: ‘Summarize the employee onboarding policy.’",
        status: "success",
        outcome:
          "A source-aware answer from the permitted document collection.",
        steps: [
          {
            title: "Check access",
            description: "Establish the user’s role and department.",
            detail: "HR access → HR document scope",
          },
          {
            title: "Route the question",
            description:
              "A policy question needs document context, so it takes the RAG path.",
            detail: "Question type → document retrieval",
          },
          {
            title: "Retrieve context",
            description:
              "Search the permitted collection for relevant passages.",
            detail: "ChromaDB → department-scoped passages",
          },
          {
            title: "Ground the answer",
            description:
              "Use retrieved evidence to explain the policy with source context.",
            detail: "Context + question → source-aware response",
          },
        ],
      },
      {
        id: "sql",
        label: "SQL analytics",
        input: "Finance user: ‘Show vendor expenses greater than $50,000.’",
        status: "success",
        outcome: "An analytics response from permitted structured data.",
        steps: [
          {
            title: "Check access",
            description:
              "Determine which Finance data is available to the user.",
            detail: "Finance access → permitted tables",
          },
          {
            title: "Route to SQL",
            description:
              "An aggregation or table filter takes the structured-data path.",
            detail: "Analytics intent → Text-to-SQL",
          },
          {
            title: "Query the data",
            description:
              "Execute the structured query through the documented SQL workflow.",
            detail: "DuckDB → filtered results",
          },
          {
            title: "Explain the result",
            description:
              "Present the returned data in an understandable answer.",
            detail: "Result rows → analytics response",
          },
        ],
      },
      {
        id: "restricted",
        label: "Restricted request",
        input: "HR user: ‘What is Finance’s gross margin?’",
        status: "blocked",
        outcome: "Access denied. The restricted data is not sent to the model.",
        steps: [
          {
            title: "Check access",
            description:
              "Compare the user’s department with the requested data scope.",
            detail: "HR access ≠ Finance scope",
          },
          {
            title: "Stop at the boundary",
            description:
              "The request is denied before retrieval or model generation.",
            detail: "Denied → no restricted context, no model call",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-code-review-agent",
    title: "AI Code Review Agent",
    category: "Developer tooling · Multi-agent review",
    summary: "A finding should come with evidence.",
    description:
      "Deterministic checks, specialist agents, and generated regression tests combine to make review findings easier to verify.",
    repository: codeRepository,
    image: "/assets/projects/ai-code-review-agent",
    video: "/videos/CodeReview.mp4",
    accent: "violet",
    stack: ["CrewAI", "FastAPI", "Gemini", "Semgrep", "MCP", "React"],
    projectType: "AI agent / workflow",
    evidence: [
      {
        value: "14",
        label: "benchmark cases",
        scope:
          "The repository reports 100% verdict accuracy on its 14-case ground-truth suite. This is a scoped benchmark, not universal accuracy.",
        source: `${codeRepository}#-evaluation--benchmarks`,
      },
      {
        value: "79.2%",
        label: "finding precision",
        scope:
          "Overall finding precision in the same reported benchmark; recall is 100% and F1 is 88.4%.",
        source: `${codeRepository}#-evaluation--benchmarks`,
      },
    ],
    problem:
      "An AI reviewer can sound convincing while reporting a defect that does not exist. Teams need a review pipeline that explains what was checked and distinguishes tested evidence from an unverified suggestion.",
    contribution:
      "The project combines deterministic scanners, an AST call graph, governance rules, specialist review agents, sandboxed regression tests, and a React review surface. Its documented integrations include an MCP server, GitHub Action, and SARIF export.",
    decisions: [
      {
        title: "Start with deterministic checks",
        description:
          "Static analysis and policy checks run first. Specialist agents can investigate findings with concrete context rather than starting from unconstrained speculation.",
      },
      {
        title: "Ask the test, not the confidence score",
        description:
          "Generated regression tests execute in an isolated subprocess. The result informs evidence badges such as REPRODUCED, PASSING, UNVERIFIED, and HEURISTIC.",
      },
      {
        title: "Meet engineers in their workflow",
        description:
          "MCP, CI integration, and SARIF let the same review engine serve editor and repository workflows.",
      },
    ],
    limitations: [
      "A 14-case benchmark is a small, defined evaluation set and does not establish performance across all repositories.",
      "Reported verdict accuracy and finding precision measure different things; both are shown here.",
      "Generated tests may remain unverified when the required runtime or dependencies are unavailable.",
    ],
    lessons:
      "Useful AI tooling needs a clear account of its evidence, its execution scope, and the work it could not verify.",
    scenarios: [
      {
        id: "unsafe",
        label: "Unsafe change",
        input: "Example change: a shell command is built from untrusted input.",
        status: "success",
        outcome:
          "Illustrative evidence status: REPRODUCED — a regression test demonstrates the defect.",
        steps: [
          {
            title: "Run static checks",
            description:
              "A deterministic scanner identifies a potentially unsafe command-execution pattern.",
            detail: "Diff → static-analysis finding",
          },
          {
            title: "Investigate context",
            description:
              "Specialist agents examine the finding and affected code.",
            detail: "Finding + code context → review crew",
          },
          {
            title: "Run a regression test",
            description: "A generated test runs in an isolated subprocess.",
            detail: "Test → observed exit code",
          },
          {
            title: "Attach evidence",
            description:
              "The review reports the finding with the test result and execution scope.",
            detail: "Illustrative badge → REPRODUCED",
          },
        ],
      },
      {
        id: "clean",
        label: "Clean change",
        input: "Example change: a parameterized database query.",
        status: "success",
        outcome:
          "No issue reported for this sample. This does not certify the whole codebase.",
        steps: [
          {
            title: "Inspect the change",
            description:
              "The deterministic pass examines the submitted code pattern.",
            detail: "Parameterized query → static checks",
          },
          {
            title: "Respect the scope",
            description:
              "Do not manufacture a vulnerability when the checked sample provides no evidence for one.",
            detail: "No scoped finding → clean sample result",
          },
        ],
      },
      {
        id: "unverified",
        label: "Missing runtime",
        input:
          "Example review: the generated test requires an unavailable dependency.",
        status: "fallback",
        outcome:
          "Illustrative evidence status: UNVERIFIED — the runtime limitation remains visible.",
        steps: [
          {
            title: "Identify a candidate",
            description:
              "The review proposes a defect and a test that could verify it.",
            detail: "Candidate finding → generated test",
          },
          {
            title: "Check execution",
            description:
              "The sandbox cannot execute the test with the required dependency.",
            detail: "Missing dependency → no valid test result",
          },
          {
            title: "Report the limitation",
            description: "Keep the finding separate from reproduced evidence.",
            detail: "Illustrative badge → UNVERIFIED",
          },
        ],
      },
    ],
  },
  {
    slug: "factscope-ai",
    title: "Factscope AI",
    category: "Information integrity · Claim verification",
    summary: "Follow the claim. Inspect the evidence.",
    description:
      "A claim-verification product that breaks articles into checkable statements and presents source-aware, confidence-scored verdicts.",
    repository: factscopeRepository,
    image: "/assets/projects/factscope-ai",
    video: "/videos/Factscope.mp4",
    accent: "amber",
    stack: ["Gemini", "Google Search", "Express", "Electron", "Serverless"],
    projectType: "Other AI product work",
    evidence: [
      {
        value: "Web + desktop",
        label: "documented build modes",
        scope:
          "The project documents web and Electron desktop builds; publicly hosted availability is not verified.",
        source: factscopeRepository,
      },
      {
        value: "3",
        label: "fallback tiers",
        scope:
          "The documented retries use a primary grounded model, a grounded fallback model, then a searchless fallback. Caching is a separate response path.",
        source: factscopeRepository,
      },
    ],
    problem:
      "An article can contain several claims with different levels of support. A useful verification interface needs to expose those claims and their evidence, while handling model or search availability honestly.",
    contribution:
      "Factscope combines article-to-claim analysis, live-source checking, confidence-scored verdicts, fallback handling, and web/desktop interfaces. The recording demonstrates the product, and the source repository documents its build modes.",
    decisions: [
      {
        title: "Make claims explicit",
        description:
          "Break the article into discrete statements so visitors can inspect what is being checked.",
      },
      {
        title: "Keep evidence near the verdict",
        description:
          "Source context and confidence make the output inspectable rather than presenting an unexplained true/false label.",
      },
      {
        title: "Design for unavailable providers",
        description:
          "Quota errors trigger a grounded model retry and, if necessary, a searchless retry. A separate 24-hour cache avoids duplicate work. All model tiers can still fail.",
      },
    ],
    limitations: [
      "A confidence score is not a guarantee that a claim is true or false.",
      "Provider availability, source quality, and cache freshness influence the available evidence.",
      "The final quota fallback removes search grounding. Its model confidence is not calibrated factual accuracy, and citations require review.",
      "The lab uses illustrative fixtures. It does not perform a live fact check.",
    ],
    lessons:
      "Resilience is also an interface responsibility: people need to understand where an answer came from and whether it was freshly verified.",
    scenarios: [
      {
        id: "verify",
        label: "Check an article",
        input:
          "Illustrative article: a report containing one checkable statement.",
        status: "success",
        outcome:
          "A claim-level verdict with source context and confidence, shown as an example rather than a live fact check.",
        steps: [
          {
            title: "Extract the claim",
            description:
              "Separate a concrete statement from the surrounding article.",
            detail: "Article → individual claim",
          },
          {
            title: "Find evidence",
            description:
              "The verification workflow checks relevant source material.",
            detail: "Claim → source context",
          },
          {
            title: "Assess support",
            description:
              "Evaluate whether the retrieved evidence supports the claim.",
            detail: "Evidence → confidence-scored assessment",
          },
          {
            title: "Show the reasoning",
            description:
              "Present the verdict with the context needed to inspect it.",
            detail: "Claim + evidence + verdict",
          },
        ],
      },
      {
        id: "fallback",
        label: "Provider unavailable",
        input:
          "Illustrative request: the primary provider has reached its quota.",
        status: "fallback",
        outcome:
          "The final retry has no search grounding; fresh verification is not implied. All retry tiers can still fail.",
        steps: [
          {
            title: "Detect the failure",
            description: "The primary Gemini model returns a quota error.",
            detail: "Gemini 2.5 Flash + Search → quota error",
          },
          {
            title: "Check alternatives",
            description:
              "Retry with the documented lightweight model while retaining Google Search grounding.",
            detail: "Gemini 3.1 Flash Lite + Search → grounded retry",
          },
          {
            title: "Explain freshness",
            description:
              "A further search-quota error triggers the searchless retry. This example highlights that the resulting answer lacks fresh source grounding.",
            detail: "Gemini 3.1 Flash Lite without Search → degraded result",
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
    title: "RAG knowledge systems",
    description:
      "Make documents and internal data easier to use, with source-aware answers and access boundaries.",
    deliverable: "Architecture + working implementation",
    projectType: "RAG knowledge system",
    projectSlug: "finsight",
  },
  {
    title: "AI agents & workflows",
    description:
      "Connect focused agents, tools, and validation into a workflow your team can inspect and operate.",
    deliverable: "Agent workflow + deployment plan",
    projectType: "AI agent / workflow",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "LLM quality & reliability",
    description:
      "Find weak retrieval, brittle prompts, provider failures, and gaps in evaluation before they become product problems.",
    deliverable: "Technical audit + prioritized fixes",
    projectType: "LLM reliability audit",
    projectSlug: "factscope-ai",
  },
];

export const capabilities = [
  {
    title: "Retrieval & data",
    detail: "Python · FastAPI · ChromaDB · DuckDB",
    projectSlug: "finsight",
  },
  {
    title: "Agents & tools",
    detail: "CrewAI · MCP · Semgrep · agent orchestration",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "Evaluation & resilience",
    detail: "Regression tests · benchmark suites · evidence status",
    projectSlug: "ai-code-review-agent",
  },
  {
    title: "Product delivery",
    detail: "React / TypeScript · FastAPI · Docker",
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
    "A first conversation covers data sources, users, desired outcomes, constraints, and the definition of a good answer. Open to remote GenAI and AI/ML engineering opportunities.",
  ].join("\n");
}
