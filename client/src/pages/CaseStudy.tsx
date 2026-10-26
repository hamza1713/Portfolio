import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { getProject } from "@shared/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { SystemExplorer } from "@/components/SystemExplorer";
import { ProjectVideoEmbed } from "@/components/ProjectVideoEmbed";
import NotFound from "./NotFound";

export default function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const sections = [
    ["overview", "Overview & Architecture"],
    ["evidence", "Verified Evidence"],
    ["pillars", "Core Pillars"],
    ["problem", "The Problem"],
    ["contribution", "The Contribution"],
    ["workflow", "Interactive Scenarios"],
    ["decisions", "Engineering ADRs"],
    ["verification", "Video & Code"],
    ["limitations", "Limits & Lessons"],
  ];

  return (
    <PortfolioShell>
      <div className="min-h-screen bg-[#090d16] text-neutral-100 pb-24">
        {/* Top Hero Section */}
        <section id="top" className="relative pt-24 sm:pt-28 pb-12 overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(100,216,195,0.08)_0%,_transparent_65%)] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back link */}
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#64D8C3] hover:underline mb-6 group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to selected work</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Heading & Executive Summary */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    Case Study · {project.category}
                  </span>
                  {project.metricsBadge && (
                    <span className="font-mono text-xs text-[#64D8C3] bg-[#64D8C3]/15 border border-[#64D8C3]/30 px-2.5 py-1 rounded-full font-medium">
                      {project.metricsBadge.label}: {project.metricsBadge.value}
                    </span>
                  )}
                </div>

                {/* h1 with exact title text for Playwright tests */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                  {project.title}
                </h1>

                <p className="text-lg sm:text-xl text-[#64D8C3] font-medium leading-relaxed mb-4">
                  {project.summary}
                </p>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-neutral-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#64D8C3] px-6 py-3 text-sm font-semibold text-[#090d16] hover:bg-[#80e5d3] shadow-[0_0_20px_rgba(100,216,195,0.3)] transition-all"
                  >
                    <Github size={16} /> Explore Repository <ArrowUpRight size={14} />
                  </a>

                  <a
                    href="#architecture"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-[#64D8C3]/50 hover:text-white transition-colors"
                  >
                    <Layers size={16} /> Architecture Diagram
                  </a>

                  <a
                    href="#workflow"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-[#64D8C3]/50 hover:text-white transition-colors"
                  >
                    Interactive Scenarios
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Cover Media */}
              <div className="lg:col-span-5">
                <figure className="relative rounded-2xl border border-white/15 overflow-hidden bg-[#0c1220] shadow-2xl">
                  <img
                    className="w-full h-auto object-cover object-top"
                    src={`${project.image}-800.webp`}
                    srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1280.webp 1280w`}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    alt={`${project.title} interface capture`}
                    width={1280}
                    height={720}
                    fetchPriority="high"
                  />
                  <figcaption className="p-3 bg-[#0c1220]/90 border-t border-white/10 font-mono text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>Verified implementation artifact</span>
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#64D8C3] hover:underline flex items-center gap-1"
                    >
                      source <ExternalLink size={11} />
                    </a>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Verified Empirical Evidence (4 Bento Cards) */}
        <section id="evidence" className="py-12 border-b border-white/10 bg-[#0c1220]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-[#64D8C3] uppercase tracking-widest mb-1">
                  Empirical Proof
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Audited System Telemetry
                </h2>
              </div>
              <span className="font-mono text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Ground-Truth Backed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.evidence.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[#090d16] p-5 flex flex-col justify-between hover:border-[#64D8C3]/50 transition-colors"
                >
                  <div>
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#64D8C3] block mb-1">
                      {item.value}
                    </span>
                    <h3 className="font-display text-sm font-semibold text-white mb-2">
                      {item.label}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {item.scope}
                    </p>
                  </div>
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#64D8C3] hover:underline mt-auto pt-3 border-t border-white/5"
                  >
                    <span>Inspect verification source</span>
                    <ArrowUpRight size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout with Sticky Index */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sticky Navigation Index (Desktop) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 rounded-2xl border border-white/10 bg-[#0c1220]/90 p-5 backdrop-blur-md">
                <p className="font-mono text-xs text-[#64D8C3] uppercase tracking-widest mb-4">
                  Contents
                </p>
                <nav className="space-y-1" aria-label="Case study sections">
                  {sections.map(([id, label]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block font-mono text-xs text-neutral-400 hover:text-white hover:bg-white/5 py-1.5 px-2.5 rounded-lg transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Editorial Articles */}
            <main className="lg:col-span-9 space-y-16">
              {/* Section: Architecture Diagram & SVG */}
              {project.architectureDiagram && (
                <section id="architecture" className="scroll-mt-28">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                    <h2 className="font-display text-2xl font-bold text-white">
                      System Architecture Topology
                    </h2>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    End-to-end dataflow and defensive isolation layers from entry point to verified verdict.
                  </p>
                  <div className="rounded-2xl border border-white/15 bg-[#0c1220] p-4 sm:p-6 shadow-2xl overflow-hidden">
                    <img
                      src={project.architectureDiagram}
                      alt={`${project.title} Architecture Diagram`}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </section>
              )}

              {/* Section: Architecture Pillars */}
              {project.pillars && project.pillars.length > 0 && (
                <section id="pillars" className="scroll-mt-28">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                    <h2 className="font-display text-2xl font-bold text-white">
                      Core Architecture Pillars
                    </h2>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    Multi-layer defensive architecture designed to eliminate single points of failure.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.pillars.map((pillar, idx) => (
                      <div
                        key={pillar.title}
                        className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 hover:border-[#64D8C3]/50 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-[10px] text-neutral-400 border border-white/10 px-2 py-0.5 rounded-full">
                              Pillar 0{idx + 1}
                            </span>
                            <span className="font-mono text-[10px] text-[#64D8C3] bg-[#64D8C3]/15 border border-[#64D8C3]/30 px-2 py-0.5 rounded-full font-medium">
                              {pillar.badge}
                            </span>
                          </div>
                          <h3 className="font-display text-base font-bold text-white mb-2">
                            {pillar.title}
                          </h3>
                          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                            {pillar.description}
                          </p>
                        </div>

                        <ul className="space-y-1.5 pt-3 border-t border-white/5 font-mono text-xs text-neutral-300">
                          {pillar.capabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-[#64D8C3] mt-0.5 shrink-0" />
                              <span className="leading-snug">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section: The Problem */}
              <section id="problem" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    The Problem & Root Cause
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 sm:p-8">
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                    {project.problem}
                  </p>
                </div>
              </section>

              {/* Section: The Contribution */}
              <section id="contribution" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    Engineering Contribution
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 sm:p-8">
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                    {project.contribution}
                  </p>
                </div>
              </section>

              {/* Section: Interactive Scenarios */}
              <section id="workflow" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    Explore the Workflow
                  </h2>
                </div>
                <p className="text-sm text-neutral-400 mb-6">
                  Step through candidate scenarios below to inspect how the system evaluates inputs, halts at security boundaries, or handles provider fallbacks.
                </p>
                <SystemExplorer project={project} />
              </section>

              {/* Section: Engineering ADRs (Architecture Decision Records) */}
              <section id="decisions" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    Architecture Decision Records (ADRs)
                  </h2>
                </div>
                <p className="text-sm text-neutral-400 mb-6">
                  Key design tradeoffs, technical justifications, and accepted compromises behind the system.
                </p>

                <div className="space-y-4">
                  {project.decisions.map((decision, idx) => (
                    <article
                      key={decision.title}
                      className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 hover:border-[#64D8C3]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs text-[#64D8C3] font-semibold">
                          ADR-0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                          Production Tradeoff
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {decision.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                        {decision.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                          <span className="text-emerald-400 font-bold block mb-1">
                            Why this decision:
                          </span>
                          <span className="text-neutral-300">{decision.why}</span>
                        </div>
                        <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
                          <span className="text-amber-400 font-bold block mb-1">
                            Tradeoff accepted:
                          </span>
                          <span className="text-neutral-300">{decision.tradeoff}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Section: Video Walkthrough & Implementation */}
              <section id="verification" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    See the Implementation
                  </h2>
                </div>
                <p className="text-sm text-neutral-400 mb-6">
                  The recording presents the end-to-end user and agent workflow. The open repository provides implementation evidence, automated test suites, and benchmark reproduction harnesses.
                </p>

                <div className="rounded-2xl border border-white/15 bg-[#0c1220] p-4 sm:p-6 mb-6">
                  <ProjectVideoEmbed
                    title={project.title}
                    videoUrl={project.video}
                    poster={`${project.image}-1280.webp`}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <span className="font-mono text-xs text-neutral-300">
                    Source code, test suites & documentation available on GitHub
                  </span>
                  <a
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#64D8C3] hover:underline font-semibold"
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read repository docs <ArrowUpRight size={14} />
                  </a>
                </div>
              </section>

              {/* Section: Limits and Lessons */}
              <section id="limitations" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#64D8C3]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    Limits and Production Lessons
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c1220] p-6 mb-6">
                  <h3 className="font-display text-base font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-400" /> System Boundaries & Constraints
                  </h3>
                  <ul className="space-y-2 font-mono text-xs sm:text-sm text-neutral-300">
                    {project.limitations.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#64D8C3]/30 bg-[#64D8C3]/[0.05] p-6">
                  <h3 className="font-display text-base font-semibold text-white mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-[#64D8C3]" /> What This Project Makes Clear
                  </h3>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {project.lessons}
                  </p>
                </div>
              </section>

              {/* Case Study Bottom CTA */}
              <div className="rounded-3xl border border-[#64D8C3]/40 bg-gradient-to-tr from-[#0c1220] via-[#0f172a] to-[#64D8C3]/10 p-8 sm:p-10 shadow-2xl">
                <p className="font-mono text-xs text-[#64D8C3] uppercase tracking-widest mb-2">
                  Engineering Collaboration
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                  Working on a similar AI challenge?
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl mb-6">
                  Whether you're looking for full-time GenAI engineering talent, building an enterprise multi-agent workflow, or hardening an internal RAG platform with RBAC and evals — let’s connect.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/?service=${project.slug}#contact`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#64D8C3] px-7 py-3.5 text-sm font-semibold text-[#090d16] hover:bg-[#80e5d3] shadow-[0_0_24px_rgba(100,216,195,0.3)] transition-all"
                  >
                    Start a conversation <ArrowUpRight size={15} />
                  </Link>
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PortfolioShell>
  );
}
