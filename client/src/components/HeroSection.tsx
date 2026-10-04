import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Workflow,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { profile } from "@shared/portfolio";
import { HeroWordRotator } from "./HeroWordRotator";

export function HeroSection() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      name: "Retrieve",
      icon: Workflow,
      note: "Department-isolated vector & full-text hybrid search.",
      code: "documents → verified candidate context",
    },
    {
      name: "Reason",
      icon: Sparkles,
      note: "Multi-agent swarm delegation via Model Context Protocol.",
      code: "context + tools → deterministic execution",
    },
    {
      name: "Verify",
      icon: ShieldCheck,
      note: "Automated RAGAS faithfulness & ground-truth validation.",
      code: "response → 0.94 faithfulness check",
    },
  ];

  const CurrentIcon = stages[activeStage].icon;

  return (
    <section id="top" className="relative w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8">
      {/* Background cybernetic grid & radial gradients */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(100,216,195,0.08)_0%,_transparent_65%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,_rgba(100,216,195,0.05)_0%,_transparent_50%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 lg:gap-8 py-4 sm:py-8">
        {/* Left Copy */}
        <div className="max-w-3xl">
          {/* Terminal prompt */}
          <p className="font-mono text-xs sm:text-sm text-[#64D8C3] mb-6 flex items-center gap-2">
            <span className="text-neutral-500">$</span>
            <span>whoami</span>
            <span className="text-neutral-400">
              — Hamza Ali · Applied GenAI & Multi-Agent Architect · Pakistan
            </span>
          </p>

          {/* Headline with dynamic rotating word */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            AI Systems that stay <br className="hidden sm:inline" />
            <HeroWordRotator
              words={[
                "grounded.",
                "autonomous.",
                "cost-lean.",
                "observable.",
                "production-ready.",
              ]}
            />
          </h1>

          {/* Glassmorphic Callout Card */}
          <div className="mt-8 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/10 p-5 max-w-2xl">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              I design, build, and evaluate production-grade GenAI platforms and multi-agent swarms — from enterprise RAG with strict department RBAC to autonomous code review agents executing deterministic AST security scans. Done-for-you AI engineering with inspectable evals.
            </p>
          </div>

          {/* CTA Buttons & Social Links */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#64D8C3] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#090d16] hover:bg-[#80e5d3] shadow-[0_0_24px_rgba(100,216,195,0.35)] transition-all duration-200"
            >
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm sm:text-base font-medium text-neutral-200 hover:border-[#64D8C3]/60 hover:text-white backdrop-blur-sm transition-colors duration-200"
            >
              Explore the architecture
            </a>

            <div className="flex items-center gap-2 sm:ml-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-3 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-[#64D8C3]/60 hover:bg-white/5 transition-colors duration-200"
              >
                <Github size={18} />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-3 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-[#64D8C3]/60 hover:bg-white/5 transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label="Download CV"
                className="p-3 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-[#64D8C3]/60 hover:bg-white/5 transition-colors duration-200"
                title="Download CV (PDF)"
              >
                <Download size={18} />
              </a>
            </div>
          </div>

          {/* Status Pill Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#64D8C3]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open for Opportunities
            </span>
            <span className="text-neutral-600" aria-hidden="true">
              |
            </span>
            {["CrewAI", "Model Context Protocol", "FastAPI", "Gemini", "RAGAS", "ChromaDB", "DuckDB", "Docker"].map(
              (t) => (
                <span
                  key={t}
                  className="font-mono text-xs text-neutral-300 border border-white/10 bg-white/[0.03] rounded-full px-3 py-1"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right Interactive AI Core Visual */}
        <div className="relative w-full max-w-lg mx-auto">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-4 rounded-3xl bg-[#64D8C3]/15 blur-3xl pointer-events-none" />

          <div className="relative rounded-3xl border border-white/15 bg-[#0c1220]/95 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_60px_rgba(100,216,195,0.15)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-[#64D8C3] tracking-widest uppercase flex items-center gap-2">
                <Terminal size={14} /> AI Topology Canvas
              </span>
              <span className="font-mono text-[10px] text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                Active Runtime
              </span>
            </div>

            {/* Core Animated Node */}
            <div className="my-6 sm:my-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#64D8C3]/20 via-[#64D8C3]/10 to-transparent border border-[#64D8C3]/40 flex items-center justify-center shadow-[0_0_30px_rgba(100,216,195,0.25)] mb-4">
                <CurrentIcon size={32} className="text-[#64D8C3] animate-pulse" />
              </div>
              <p className="font-mono text-[11px] text-[#64D8C3] uppercase tracking-wider">
                Layer 0{activeStage + 1}
              </p>
              <h3 className="font-display text-xl font-bold text-white mt-0.5">
                {stages[activeStage].name} Phase
              </h3>
              <p className="font-mono text-xs text-neutral-400 mt-1 max-w-xs">
                {stages[activeStage].code}
              </p>
            </div>

            {/* 3 Interactive Stepper Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
              {stages.map((stage, idx) => (
                <button
                  key={stage.name}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`hero-step-btn py-2 px-2 rounded-xl font-mono text-xs flex flex-col items-center justify-center gap-0.5 transition-all ${
                    activeStage === idx
                      ? "border border-[#64D8C3]/60 bg-[#64D8C3]/15 text-[#64D8C3] font-bold shadow-[0_0_15px_rgba(100,216,195,0.2)]"
                      : "border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] opacity-70">0{idx + 1}</span>
                  <span className="whitespace-nowrap font-medium text-[11px] sm:text-xs">{stage.name}</span>
                </button>
              ))}
            </div>

            <p className="mt-4 text-center font-mono text-[11px] text-neutral-400 min-h-[32px] flex items-center justify-center" aria-live="polite">
              {stages[activeStage].note}
            </p>

            {/* Live Availability Floating Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md py-2 px-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-neutral-200">
                available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Ribbon (4-column metric counter) */}
      <div className="relative z-10 border-t border-white/10 bg-[#090d16]/80 backdrop-blur-md mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:border-l border-white/10 first:border-l-0 px-2 sm:px-6">
              <dd className="font-display text-3xl sm:text-4xl font-bold text-white">3</dd>
              <dt className="mt-1 text-xs sm:text-sm text-neutral-400">
                Production AI platforms built & open-source
              </dt>
            </div>

            <div className="lg:border-l border-white/10 px-2 sm:px-6">
              <dd className="font-display text-3xl sm:text-4xl font-bold text-white">100%</dd>
              <dt className="mt-1 text-xs sm:text-sm text-neutral-400">
                Grounded benchmark verdict accuracy (14 cases)
              </dt>
            </div>

            <div className="lg:border-l border-white/10 px-2 sm:px-6">
              <dd className="font-display text-3xl sm:text-4xl font-bold text-[#64D8C3]">45%</dd>
              <dt className="mt-1 text-xs sm:text-sm text-neutral-400">
                LLM token cost reduction via semantic caching
              </dt>
            </div>

            <div className="lg:border-l border-white/10 px-2 sm:px-6">
              <dd className="font-display text-3xl sm:text-4xl font-bold text-white">&lt; 1.2s</dd>
              <dt className="mt-1 text-xs sm:text-sm text-neutral-400">
                P95 multi-agent execution cycle latency
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
