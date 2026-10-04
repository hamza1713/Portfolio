import { Bot, Database, Zap, Check, ArrowUpRight } from "lucide-react";
import type { ProjectType } from "@shared/portfolio";

export function ServicesSection({
  onSelectService,
}: {
  onSelectService: (type: ProjectType) => void;
}) {
  const serviceCards = [
    {
      title: "Done-For-You Multi-Agent Swarms & Workflows",
      projectType: "Agentic workflow / evaluation" as ProjectType,
      icon: Bot,
      description:
        "Custom autonomous multi-agent pipelines orchestrated with CrewAI and Model Context Protocol (MCP). Your agents collaborate across isolated boundaries with zero hallucinated side-effects.",
      deliverables: [
        "CrewAI multi-agent swarms with specialized role definitions",
        "Model Context Protocol (MCP) JSON-RPC 2.0 tool servers",
        "Deterministic AST callgraph analysis and regression generation",
        "Production FastAPI backend & documented deployment handover",
      ],
    },
    {
      title: "Enterprise RAG & Hybrid Knowledge Retrieval",
      projectType: "RAG knowledge system" as ProjectType,
      icon: Database,
      description:
        "Production-grade document intelligence with multi-tenant department RBAC. Your proprietary data stays compartmentalized, fully cited, and verified against grounded evidence.",
      deliverables: [
        "ChromaDB & DuckDB hybrid dense/sparse vector retrieval",
        "Multi-tenant department isolation with 100% RBAC compliance",
        "RAGAS benchmark evaluation (0.94+ faithfulness score)",
        "Streaming sentence citations mapped to exact source pages",
      ],
    },
    {
      title: "LLM Cost Optimization, Semantic Caching & Evals",
      projectType: "Other AI product work" as ProjectType,
      icon: Zap,
      description:
        "Eliminate wasteful token spend and latency bottlenecks. Dual-tier semantic caching slashes recurring LLM bills by up to 45%, backed by automated ground-truth evaluation harnesses.",
      deliverables: [
        "Dual-tier semantic similarity caching (Redis + DuckDB)",
        "P95 latency waterfall profiling (TTFT + token generation)",
        "Automated regression test suites and safety guardrails",
        "Live cost monitoring dashboards & budget alert thresholds",
      ],
    },
  ];

  return (
    <section id="services" className="section-wrap services-section scroll-mt-24">
      {/* Monospace section heading */}
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">05</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">services</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Done-for-you.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            Documented. Handed over.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          Focused AI engineering help with verifiable deliverables and clean system boundaries — not an unmaintainable black box.
        </p>
      </div>

      {/* 3-Column Service Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {serviceCards.map((service, i) => {
          const IconComponent = service.icon;
          return (
            <article
              key={service.title}
              className="beam-card group relative rounded-3xl border border-white/10 bg-[#0c1220] p-7 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#64D8C3]/50 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl border border-[#64D8C3]/30 bg-[#64D8C3]/10 flex items-center justify-center text-[#64D8C3]">
                    <IconComponent size={22} />
                  </div>
                  <span className="font-mono text-xs text-neutral-400 border border-white/10 px-2.5 py-1 rounded-full">
                    [ 0{i + 1} ]
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200"
                    >
                      <Check size={16} className="text-[#64D8C3] mt-0.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  onClick={() => onSelectService(service.projectType)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#64D8C3] hover:text-[#090d16] hover:border-[#64D8C3] transition-all duration-200"
                >
                  Book this service <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
