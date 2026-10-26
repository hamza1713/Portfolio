import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Bot,
  Database,
  CheckCircle2,
  Github,
  Layers,
  ShieldCheck,
  Code2,
  ExternalLink,
} from "lucide-react";
import { projects } from "@shared/portfolio";
import { ProjectVideoEmbed } from "./ProjectVideoEmbed";

const PROJECT_ARCHITECTURES = {
  "ai-code-review-agent": {
    badge: "Flagship · Zero-Trust Code Review",
    icon: Bot,
    highlights: [
      "100.0% Benchmark F1 on 14 ground-truth CWEs (v3.0 scorer)",
      "Polyglot Tree-Sitter AST & inter-procedural taint flow graph",
      "AI slopsquatting & Trojan Source Unicode Bidi shield",
      "Cross-family adversarial consensus (Gemini + Claude)",
      "Docker sandbox pytest fuzzing + OASIS SARIF v2.1.0",
    ],
  },
  finsight: {
    badge: "Enterprise RAG · 3-Layer RBAC",
    icon: Database,
    highlights: [
      "3-layer defensive RBAC (JWT, department guard, ChromaDB)",
      "4-stage hybrid retrieval (dense + BM25 + RRF + Cohere)",
      "In-memory DuckDB sandbox with external disk access locked",
      "Redis 7 role-scoped cache (< 20ms streaming replay)",
      "90 automated test suites (60 RBAC, 20 OWASP, 10 evals)",
    ],
  },
  "factscope-ai": {
    badge: "Full-Stack AI · Live Web Grounding",
    icon: CheckCircle2,
    highlights: [
      "Automated claim deconstruction & entity extraction",
      "Live Google Search grounding citations & authoritative scoring",
      "3-tier resilient model failover circuit breaker",
      "24h normalized input caching eliminating redundant LLM calls",
      "Web SPA + Electron desktop deployment with local storage",
    ],
  },
};

export function ProjectWorkSection() {
  const [activeTabBySlug, setActiveTabBySlug] = useState<Record<string, "overview" | "arch">>({});

  const getTab = (slug: string) => activeTabBySlug[slug] || "overview";
  const toggleTab = (slug: string, tab: "overview" | "arch") => {
    setActiveTabBySlug((prev) => ({ ...prev, [slug]: tab }));
  };

  return (
    <section id="work" className="section-wrap work-section scroll-mt-24">
      {/* Monospace section heading */}
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">02</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">proof of work</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Engineered for production.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            Verified with proofs.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          The UI is only the surface. What matters in enterprise AI is what runs underneath — compiler-grade ASTs, deterministic slopsquatting defenses, and 3-layer RBAC isolation.
        </p>
      </div>

      {/* 3-Column Project Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          const arch =
            PROJECT_ARCHITECTURES[project.slug as keyof typeof PROJECT_ARCHITECTURES] || {
              badge: "Production AI System",
              icon: Layers,
              highlights: [
                "Production-grade GenAI architecture",
                "Deterministic evaluation and ground-truth validation",
                "Modular service boundaries and containerized deployment",
              ],
            };
          const IconComponent = arch.icon;
          const currentTab = getTab(project.slug);

          return (
            <div
              key={project.slug}
              className="beam-card group relative rounded-3xl border border-white/10 bg-[#0c1220] overflow-hidden min-h-[32rem] flex flex-col transition-all duration-300 hover:border-[#64D8C3]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/50 border-b border-white/10">
                <img
                  src={`${project.image}-800.webp`}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-transparent pointer-events-none" />

                {/* Floating pill tags on image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-neutral-300 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full">
                    [ 0{i + 1} ]
                  </span>
                  <span className="font-mono text-[10px] text-[#64D8C3] bg-[#64D8C3]/15 backdrop-blur-md border border-[#64D8C3]/30 px-2.5 py-1 rounded-full font-medium">
                    {arch.badge}
                  </span>
                </div>

                {/* Video walkthrough trigger badge */}
                <div className="absolute bottom-3 right-3">
                  <ProjectVideoEmbed
                    title={project.title}
                    videoUrl={project.video}
                    poster={`${project.image}-1280.webp`}
                    compact
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#64D8C3]/10 border border-[#64D8C3]/25 flex items-center justify-center text-[#64D8C3] shrink-0">
                        <IconComponent size={16} />
                      </span>
                      <h3 className="font-display text-xl font-bold text-white leading-snug">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:text-[#64D8C3] transition-colors"
                          aria-label={`Explore the case study — ${project.title}`}
                        >
                          {project.title}
                        </Link>
                      </h3>
                    </div>

                    {/* View Switcher: Overview vs Under The Hood */}
                    <div className="flex items-center border border-white/10 rounded-full p-0.5 bg-white/[0.02]">
                      <button
                        type="button"
                        onClick={() => toggleTab(project.slug, "overview")}
                        className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full transition-colors ${
                          currentTab === "overview"
                            ? "bg-[#64D8C3]/20 text-[#64D8C3] font-semibold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Summary
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleTab(project.slug, "arch")}
                        className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full transition-colors ${
                          currentTab === "arch"
                            ? "bg-[#64D8C3]/20 text-[#64D8C3] font-semibold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Arch
                      </button>
                    </div>
                  </div>

                  {/* Dynamic View: Overview vs Architecture */}
                  {currentTab === "overview" ? (
                    <div>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-4 min-h-[4rem]">
                        {project.summary}
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                        {project.evidence.slice(0, 2).map((item) => (
                          <div key={item.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                            <span className="font-bold text-[#64D8C3] text-sm block">{item.value}</span>
                            <span className="text-neutral-400 text-[11px] block mt-0.5 line-clamp-1">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="font-mono text-[10px] text-[#64D8C3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <ShieldCheck size={13} /> Under The Hood Architecture
                      </p>
                      <ul className="space-y-1.5 min-h-[7.5rem]">
                        {arch.highlights.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 font-mono text-xs text-neutral-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#64D8C3] mt-1.5 shrink-0" />
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer tags and links */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[60%]">
                    {project.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-neutral-400 border border-white/10 bg-white/[0.03] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                      title="View Source on GitHub"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github size={15} />
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#64D8C3] hover:text-white transition-colors"
                      aria-label={`Explore the case study — ${project.title}`}
                    >
                      Case Study <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
