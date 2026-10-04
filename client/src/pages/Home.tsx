import { useEffect, useState } from "react";
import {
  Workflow,
  Calculator,
  Server,
  Target,
} from "lucide-react";
import {
  projects,
  services,
  type ProjectType,
} from "@shared/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { HeroSection } from "@/components/HeroSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ProjectWorkSection } from "@/components/ProjectWorkSection";
import { SystemExplorer } from "@/components/SystemExplorer";
import { AIEstimator } from "@/components/AIEstimator";
import { MCPInspector } from "@/components/MCPInspector";
import { BenchmarkMatrix } from "@/components/BenchmarkMatrix";
import { TechStack } from "@/components/TechStack";
import { ServicesSection } from "@/components/ServicesSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ContactSection } from "@/components/ContactSection";

function SystemsLabSection() {
  const [labMode, setLabMode] = useState<"explorer" | "estimator" | "mcp" | "evals">("explorer");

  return (
    <section id="lab" className="section-wrap lab-section scroll-mt-24">
      {/* Monospace section heading */}
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">03</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">systems lab</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Inspect the architecture, costs,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            protocols & evals.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          Explore how Hamza’s AI systems make decisions, model production infrastructure spend, inspect Model Context Protocol tools, and verify benchmark accuracy.
        </p>
      </div>

      <div className="lab-mode-switcher mt-6" role="tablist" aria-label="Systems Lab Modes">
        <button
          type="button"
          role="tab"
          aria-selected={labMode === "explorer"}
          onClick={() => setLabMode("explorer")}
          className={`lab-tab-btn ${labMode === "explorer" ? "lab-tab-btn--active" : ""}`}
        >
          <Workflow size={15} />
          <span>Workflow Explorer</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={labMode === "estimator"}
          onClick={() => setLabMode("estimator")}
          className={`lab-tab-btn ${labMode === "estimator" ? "lab-tab-btn--active" : ""}`}
        >
          <Calculator size={15} />
          <span>Token & Cost Estimator</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={labMode === "mcp"}
          onClick={() => setLabMode("mcp")}
          className={`lab-tab-btn ${labMode === "mcp" ? "lab-tab-btn--active" : ""}`}
        >
          <Server size={15} />
          <span>MCP Protocol Inspector</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={labMode === "evals"}
          onClick={() => setLabMode("evals")}
          className={`lab-tab-btn ${labMode === "evals" ? "lab-tab-btn--active" : ""}`}
        >
          <Target size={15} />
          <span>Benchmark & Evals Matrix</span>
        </button>
      </div>

      <div className="lab-content-panel mt-6">
        {labMode === "explorer" && <SystemExplorer />}
        {labMode === "estimator" && <AIEstimator />}
        {labMode === "mcp" && <MCPInspector />}
        {labMode === "evals" && <BenchmarkMatrix />}
      </div>
    </section>
  );
}

export default function Home() {
  const [projectType, setProjectType] = useState<ProjectType>(
    "Other AI product work"
  );

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    const project = projects.find((item) => item.slug === requested);
    const service = services.find((item) => item.projectType === requested);
    if (project || service) setProjectType((project ?? service)!.projectType);
  }, []);

  return (
    <PortfolioShell>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Infinite Brand Logo Marquee */}
      <LogoMarquee />

      {/* 3. Section 01: Architecture */}
      <ArchitectureSection />

      {/* 4. Section 02: Proof of Work */}
      <ProjectWorkSection />

      {/* 5. Section 03: Systems Lab */}
      <SystemsLabSection />

      {/* 6. Section 04: Stack (Tools, Frameworks & Cloud) */}
      <TechStack />

      {/* 7. Section 05: Services */}
      <ServicesSection onSelectService={setProjectType} />

      {/* 8. Section 06: Credentials */}
      <CredentialsSection />

      {/* 9. Section 07: Initialize Contact */}
      <ContactSection projectType={projectType} />
    </PortfolioShell>
  );
}
