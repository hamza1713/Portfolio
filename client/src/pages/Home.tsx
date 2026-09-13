/* Signal / Proof direction: editorial brutalism, warm paper surfaces, ink-black type, signal-lime proof markers, asymmetric evidence-led layout. */
import { useState } from "react";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { ProjectInquiryForm } from "@/components/ProjectInquiryForm";
import { ProjectVideoEmbed } from "@/components/ProjectVideoEmbed";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";

const finsightUrl = "https://github.com/hamza1713/Enterprise-RAG-Chatbot-with-Role-Base-Access-Control-";
const factscopeUrl = "https://github.com/hamza1713/Factscope-AI";
const codereviewUrl = "https://github.com/hamza1713/AI-Code-Review-Agent";
const linkedinUrl = "https://www.linkedin.com/in/hamza-ali-b9b8b22a6";
const githubUrl = "https://github.com/hamza1713";
const email = "hamza1713@gmail.com";
const cvUrl = "/assets/Hamza_Ali_Resume_GenAI_Engineer.pdf";
// Add a real screen recording of each product (local file in client/public/videos,
// or a YouTube/Loom/Vimeo URL) once one exists. Left null shows a clean "walkthrough
// coming soon" placeholder instead of a fake/AI-generated demo.
const projectVideos = {
  finsight: "/videos/Finsight.mp4",
  factscope: "/videos/Factscope.mp4",
  codereview: "/videos/CodeReview.mp4",
};

const capabilities = [
  ["RAG systems", "Retrieval pipelines, reranking, metadata filters, grounded generation"],
  ["Agentic workflows", "LangChain, CrewAI, MCP, prompt and context engineering"],
  ["LLM evaluation", "RAGAS metrics, security tests, E2E coverage, model fallbacks"],
  ["Production delivery", "FastAPI, React, Docker Compose, serverless and Electron"],
];

const stack = ["Python", "FastAPI", "React / TypeScript", "Gemini", "LangChain", "CrewAI", "ChromaDB", "DuckDB", "RAGAS", "Semgrep", "Docker", "pandas", "XGBoost"];

const services = [
  {
    number: "01",
    title: "RAG knowledge systems",
    description: "Turn scattered PDFs, policies, product documentation, or internal data into a grounded assistant with retrieval, source-aware answers, and access controls.",
    deliverable: "Architecture + working implementation",
  },
  {
    number: "02",
    title: "AI agents & workflow automation",
    description: "Design focused agent workflows that research, route tasks, validate outputs, and hand work back to the people who need to make a decision.",
    deliverable: "Agent workflow + deployment plan",
  },
  {
    number: "03",
    title: "LLM quality & reliability",
    description: "Audit an existing AI feature for weak retrieval, hallucination risk, brittle prompts, quota failures, and missing evaluation coverage — then make a plan to improve it.",
    deliverable: "Technical audit + prioritized fixes",
  },
];

function SignalMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`signal-mark ${small ? "signal-mark--small" : ""}`} aria-hidden="true">
      <span />
      <span />
      <i />
    </span>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMobile} aria-label="Hamza Ali home">
          <SignalMark small />
          <span>HAMZA ALI</span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`site-nav ${mobileOpen ? "site-nav--open" : ""}`} aria-label="Primary navigation">
          <a href="#work" onClick={closeMobile}>Selected work</a>
          <a href="#capabilities" onClick={closeMobile}>Capabilities</a>
          <a href="#services" onClick={closeMobile}>Services</a>
          <a href="#about" onClick={closeMobile}>About</a>
          <a className="nav-contact" href="#contact" onClick={closeMobile}>Let’s talk <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main id="main-content"><span id="top" />
        <section className="hero-section">
          <div className="hero-text">
            <p className="eyebrow"><span className="signal-dot" /> AI/ML ENGINEER · LAHORE / REMOTE</p>
            <h1>AI systems built around <em>useful answers</em> and inspectable evidence.</h1>
            <p className="hero-lede">I’m Hamza Ali, an AI / GenAI engineer building document intelligence, developer tools, and agent workflows. Explore the source, architecture, evaluations, and recorded walkthroughs behind my work.</p>
            <div className="hero-actions">
              <a className="button button--lime" href="#work">Explore the work <ArrowDownRight size={17} /></a>
              <a className="text-link" href={`mailto:${email}`}>Discuss a role or project <ArrowUpRight size={16} /></a>
            </div>
            <a className="cv-link" href={cvUrl} download="Hamza_Ali_Resume_GenAI_Engineer.pdf" target="_blank" rel="noreferrer"><Download size={15} /> Download AI/ML CV <span>PDF · 211 KB</span></a>
          </div>
          <div className="hero-proof">
            <div className="hero-image-frame">
              <img src="/assets/hero-signal.svg" alt="Abstract technical signal map representing retrieval and reasoning systems" />
              <div className="hero-image-caption"><span>FIELD NOTE / 001</span><span>RETRIEVE → REASON → SHIP</span></div>
            </div>
            <div className="proof-rail">
              <div className="proof-rail__item"><strong>RAG</strong><span>retrieval + access control</span></div>
              <div className="proof-rail__item"><strong>AI</strong><span>agents + developer tools</span></div>
              <div className="proof-rail__item"><strong>03</strong><span>featured case studies</span></div>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Portfolio positioning">
          <span>Available for GenAI engineering, RAG architecture, and AI product work</span>
          <span className="signal-strip__line" />
          <span>CS graduate · 2026</span>
          <span className="signal-strip__line" />
          <span>Built end-to-end</span>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-intro">
            <SectionLabel number="01">Selected systems</SectionLabel>
            <h2>Explore the engineering.</h2>
            <p>Three detailed case studies in retrieval, model reliability, and developer tooling. Each links to its implementation so you can assess the design choices and current scope.</p>
          </div>

          <article className="project project--finsight">
            <div className="project-visual">
              <img src="/assets/finsight-architecture.svg" alt="Editorial system map for FinSight's RAG, SQL, and security architecture" />
              <span className="project-index">PROJECT / 01</span>
            </div>
            <div className="project-copy">
              <div className="project-kicker">ENTERPRISE AI WORKSPACE · 2026</div>
              <h3>FinSight</h3>
              <p className="project-subtitle">RAG + Text-to-SQL, with the security model built in.</p>
              <p>FinSight routes each question to the right kind of answer — grounded document retrieval, structured SQL analytics, or a safe fallback — while keeping department data isolated before an LLM ever sees the request.</p>
              <div className="metric-row"><div><strong>6</strong><span>protected roles</span></div><div><strong>3</strong><span>data stores</span></div><div><strong>RBAC</strong><span>security regression coverage</span></div></div>
              <p className="project-evidence"><strong>Current scope:</strong> staging candidate. <a href={`${finsightUrl}/blob/main/PRODUCTION_READINESS_REPORT.md`} target="_blank" rel="noreferrer">Read the verification results and launch gates</a>.</p>
              <div className="tag-row"><span>FastAPI</span><span>React 19</span><span>ChromaDB</span><span>DuckDB</span><span>RAGAS</span></div>
              <div className="project-links"><a className="project-link" href={finsightUrl} target="_blank" rel="noreferrer">Open technical walkthrough <ArrowUpRight size={16} /></a><span>Architecture + source access</span></div>
              <ProjectVideoEmbed title="FinSight" videoUrl={projectVideos.finsight} fallbackFilename="finsight-demo.mp4" />
            </div>
          </article>

          <article className="project project--factscope">
            <div className="project-copy">
              <div className="project-kicker">CLAIM VERIFICATION PLATFORM · 2026</div>
              <h3>Factscope<span className="superscript">AI</span></h3>
              <p className="project-subtitle">From news content to claims, sources, and explanations.</p>
              <p>Factscope extracts claims from news content and requests source-grounded assessments from Gemini. It connects a React interface with Express and Electron, plus a cache and fallback paths for quota failures.</p>
              <div className="metric-row"><div><strong>3</strong><span>fallback tiers</span></div><div><strong>2</strong><span>web + desktop interfaces</span></div><div><strong>24h</strong><span>response cache</span></div></div>
              <p className="project-evidence"><strong>Design tradeoff:</strong> the final fallback removes search grounding. Assessments need source review; model confidence is not a calibrated accuracy score.</p>
              <div className="tag-row"><span>Gemini</span><span>Google Search</span><span>Electron</span><span>Express</span><span>Serverless</span></div>
              <div className="project-links"><a className="project-link" href={factscopeUrl} target="_blank" rel="noreferrer">Open product walkthrough <ArrowUpRight size={16} /></a><span>Web + desktop build notes</span></div>
              <ProjectVideoEmbed title="Factscope AI" videoUrl={projectVideos.factscope} fallbackFilename="factscope-demo.mp4" />
            </div>
            <div className="project-visual">
              <img src="/assets/factscope-pipeline.svg" alt="Editorial claim verification pipeline illustration for Factscope AI" />
              <span className="project-index">PROJECT / 02</span>
            </div>
          </article>

          <article className="project project--codereview">
            <div className="project-visual">
              <img src="/assets/codereview-architecture.svg" alt="Editorial architecture map for the AI Code Review Agent's deterministic-first multi-agent pipeline" />
              <span className="project-index">PROJECT / 03</span>
            </div>
            <div className="project-copy">
              <div className="project-kicker">AUTONOMOUS PR REVIEW PLATFORM · 2026</div>
              <h3>AI Code Review Agent</h3>
              <p className="project-subtitle">Static analysis, repository context, and AI review in one workflow.</p>
              <p>Static scanners and governance rules feed a three-role CrewAI review workflow. Repository context, generated test support, evidence labels, a durable webhook queue, and MCP integration make findings easier to investigate. Test evidence depends on the selected path and available tools.</p>
              <div className="metric-row"><div><strong>3</strong><span>autonomous review agents</span></div><div><strong>84.2%</strong><span>reported F1 · 14 curated cases</span></div><div><strong>5</strong><span>MCP tools for editor use</span></div></div>
              <p className="project-evidence"><strong>Benchmark context:</strong> the checked-in report also records 100% verdict accuracy on those 14 cases. These metrics measure different outcomes and do not establish general accuracy. <a href={`${codereviewUrl}/blob/main/BENCHMARK_REPORT.md`} target="_blank" rel="noreferrer">Inspect the case-level report</a>.</p>
              <div className="tag-row"><span>CrewAI</span><span>Gemini</span><span>FastAPI</span><span>Semgrep</span><span>MCP</span></div>
              <div className="project-links"><a className="project-link" href={codereviewUrl} target="_blank" rel="noreferrer">Open technical walkthrough <ArrowUpRight size={16} /></a><span>Architecture, benchmarks + MCP server</span></div>
              <ProjectVideoEmbed title="AI Code Review Agent" videoUrl={projectVideos.codereview} fallbackFilename="codereview-demo.mp4" />
            </div>
          </article>
        </section>

        <section className="additional-work section-wrap" aria-labelledby="additional-work-title">
          <div className="section-intro"><p className="eyebrow">MORE TO EXPLORE</p><h2 id="additional-work-title">Agents, multimodal AI, and ML foundations.</h2><p>Smaller projects that show the breadth behind the featured systems.</p></div>
          <div className="additional-work-grid">
            <article><p className="project-kicker">FINAL YEAR PROJECT</p><h3>Social Media Brand Manager</h3><p>Five CrewAI agents coordinate strategy, content, brand review, engagement drafts, and analysis through Streamlit and a CLI.</p><p className="project-evidence">Uses simulated social APIs and sample metrics.</p><a href="https://github.com/hamza1713/Autonomous-Social-Media-Brand-Manager" target="_blank" rel="noreferrer">Explore the workflow <ArrowUpRight size={16} /></a></article>
            <article><p className="project-kicker">MULTIMODAL EXPERIMENT</p><h3>Deep-Fake Detection</h3><p>A React/TypeScript interface that requests Gemini assessments of text and media and presents structured observations.</p><p className="project-evidence">Experimental analysis; forensic accuracy has not been established.</p><a href="https://github.com/hamza1713/Deep-Fake-Detection" target="_blank" rel="noreferrer">Explore the implementation <ArrowUpRight size={16} /></a></article>
            <article><p className="project-kicker">CLASSICAL MACHINE LEARNING</p><h3>Airline Satisfaction</h3><p>A Jupyter project covering data preparation, XGBoost hyperparameter search, held-out evaluation, and feature importance.</p><p className="project-evidence">Includes the notebook and dataset for inspection.</p><a href="https://github.com/hamza1713/DS-ML-PROJECTS" target="_blank" rel="noreferrer">Explore the notebook <ArrowUpRight size={16} /></a></article>
          </div>
        </section>

        <section className="capabilities-section section-wrap" id="capabilities">
          <div className="section-intro section-intro--wide">
            <SectionLabel number="02">How I contribute</SectionLabel>
            <h2>Systems thinking, with a bias toward shipping.</h2>
          </div>
          <div className="capabilities-layout">
            <div className="capability-list">
              {capabilities.map(([title, description], index) => (
                <div className="capability-item" key={title}>
                  <span className="capability-number">0{index + 1}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <ArrowUpRight size={19} />
                </div>
              ))}
            </div>
            <aside className="stack-panel">
              <p className="stack-panel__label">Working stack</p>
              <div className="stack-cloud">{stack.map((item) => <span key={item}>{item}</span>)}</div>
              <p className="stack-panel__note">I’m most useful where applied ML, backend engineering, and product judgment need to meet in the same room.</p>
            </aside>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="services-heading">
            <SectionLabel number="03">For teams & clients</SectionLabel>
            <h2>Bring the difficult AI work.<br /><em>I’ll make it legible.</em></h2>
            <p>For teams exploring an AI feature or improving an existing workflow: I can help define the problem, build the implementation, and make the results measurable.</p>
            <a className="button button--ink" href="#contact">Discuss a project <ArrowDownRight size={17} /></a>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-item" key={service.number}>
                <div className="service-item__top"><span>{service.number}</span><BriefcaseBusiness size={18} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-deliverable"><span>YOU RECEIVE</span><strong>{service.deliverable}</strong></div>
              </article>
            ))}
          </div>
          <div className="services-footnote"><span className="signal-dot" /> <p><strong>How I start:</strong> a focused discovery message about your data, constraints, users, and definition of a good answer — before I recommend a stack.</p></div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="section-intro">
            <SectionLabel number="04">A little context</SectionLabel>
            <h2>Curious about the edge cases.</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="about-lede">I’m a Computer Science graduate based in Pakistan, building toward a career in Generative AI engineering. My work sits between research curiosity and production discipline: I want to understand why a system behaves the way it does, then make it safe and useful for someone else.</p>
              <p>Before focusing deeply on LLM systems, I worked with roughly one million NOAA lightning-strike records during my Data Science internship at ATS AI Lab. That experience sharpened how I think about data quality, feature engineering, visualization, and communicating technical findings to people who need to act on them.</p>
              <div className="about-links"><a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a></div>
            </div>
            <div className="timeline">
              <div className="timeline-item"><span>2026</span><div><strong>CS graduate</strong><p>Abbottabad University of Science and Technology</p></div></div>
              <div className="timeline-item"><span>2024</span><div><strong>Data Science Intern</strong><p>Advanced Telecom Services · ATS AI Lab</p></div></div>
              <div className="timeline-item"><span>NOW</span><div><strong>Building what’s next</strong><p>Open to GenAI, AI/ML, and AI agent engineering roles</p></div></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <div><SectionLabel number="05">Next signal</SectionLabel><h2>Have a workflow that needs a smarter backbone?</h2><p>Tell me what the system needs to retrieve, reason about, or protect. I’ll bring the architecture questions first.</p><div className="contact-actions"><a className="email-fallback" href={`mailto:${email}`}>Prefer email? <Mail size={15} /> {email}</a><button className="copy-button" onClick={copyEmail}>{copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy email</>}</button></div></div>
            <ProjectInquiryForm />
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 Hamza Ali</span><span>Source reviewed · September 2026</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
      <PortfolioAssistant />
    </div>
  );
}

