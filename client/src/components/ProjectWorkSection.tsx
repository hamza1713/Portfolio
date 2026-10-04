import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Bot,
  Database,
  CheckCircle2,
  Play,
  Github,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { projects } from "@shared/portfolio";
import { ProjectVideoEmbed } from "./ProjectVideoEmbed";

const PROJECT_ARCHITECTURES = {
  "ai-code-review-agent": {
    badge: "Flagship · Multi-Agent Swarm",
    icon: Bot,
    hoverBullets: [
      "14-case ground truth test harness with 100% verdict accuracy",
      "Model Context Protocol (MCP) JSON-RPC 2.0 tool execution",
      "Deterministic AST callgraph dependency impact tracing",
      "Semgrep static security rules & sandboxed reproduction",
      "FastAPI backend with automated SARIF vulnerability export",
    ],
  },
  finsight: {
    badge: "Enterprise RAG · Multi-Tenant RBAC",
    icon: Database,
    hoverBullets: [
      "Multi-tenant department isolation with 100% RBAC compliance",
      "RAGAS benchmark verified: 0.94 Faithfulness, 0.91 Relevance",
      "Dual-tier semantic similarity caching cutting 45% LLM tokens",
      "Hybrid dense/sparse retrieval with ChromaDB + DuckDB",
      "Streaming sentence citations linked to page coordinates",
    ],
  },
  "factscope-ai": {
    badge: "Full-Stack AI · Automated Verification",
    icon: CheckCircle2,
    hoverBullets: [
      "94.6% claim extraction accuracy with multi-tier LLM fallbacks",
      "92.1% source grounding validation with evidence weighting",
      "Multi-tier latency failover circuit breaker (< 1.8s P95)",
      "Streaming verification confidence breakdown & audit trail",
      "Fully containerized Docker deployment on cloud runtimes",
    ],
  },
};

export function ProjectWorkSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

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
          Hover a project to expose its{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            architecture layer.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          The polished UI is only the surface. What matters in production is what runs underneath — the agent boundaries, deterministic evals, and RBAC isolation.
        </p>
      </div>

      {/* 3-Column Project Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          const arch =
            PROJECT_ARCHITECTURES[project.slug as keyof typeof PROJECT_ARCHITECTURES] || {
              badge: "Production AI System",
              icon: Layers,
              hoverBullets: [
                "Production-grade GenAI architecture",
                "Deterministic evaluation and ground-truth validation",
                "Modular service boundaries and containerized deployment",
              ],
            };
          const IconComponent = arch.icon;
          const isHovered = hoveredSlug === project.slug;

          return (
            <div
              key={project.slug}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              onClick={() => setHoveredSlug(prev => prev === project.slug ? null : project.slug)}
              className="beam-card group relative rounded-3xl border border-white/10 bg-[#0c1220] overflow-hidden min-h-[28rem] sm:min-h-[30rem] flex flex-col transition-all duration-300 hover:border-[#64D8C3]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#64D8C3]/10 border border-[#64D8C3]/25 flex items-center justify-center text-[#64D8C3]">
                      <IconComponent size={16} />
                    </span>
                    <h3 className="font-display text-xl font-bold text-white leading-snug">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-[#64D8C3] transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Dynamic flip: Default Summary vs Hover Technical Layer */}
                  <div className="relative min-h-[110px]">
                    {/* Normal Summary */}
                    <div
                      className={`transition-all duration-300 ${
                        isHovered ? "opacity-0 pointer-events-none hidden" : "opacity-100 block"
                      }`}
                    >
                      <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                        {project.summary}
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-xs">
                        {project.evidence.slice(0, 2).map((item) => (
                          <div key={item.label}>
                            <span className="font-bold text-[#64D8C3] block">{item.value}</span>
                            <span className="text-neutral-400 text-[11px] block">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Architecture Layer */}
                    <div
                      className={`transition-all duration-300 ${
                        isHovered ? "opacity-100 block" : "opacity-0 pointer-events-none hidden"
                      }`}
                    >
                      <p className="font-mono text-[10px] text-[#64D8C3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <ShieldCheck size={13} /> Under The Hood Architecture
                      </p>
                      <ul className="space-y-1.5">
                        {arch.hoverBullets.map((bullet) => (
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
                  </div>
                </div>

                {/* Footer tags and links */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-neutral-400 border border-white/10 bg-white/[0.03] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#64D8C3] hover:text-white transition-colors"
                  >
                    Details <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
