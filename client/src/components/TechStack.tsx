import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Boxes,
  CheckCircle,
  Cloud,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";
import {
  TECH_CATEGORIES,
  TECH_STACK,
  type TechCategory,
  type TechItem,
} from "@shared/techStack";
import { TechLogo } from "./TechLogos";

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTech = useMemo(() => {
    return TECH_STACK.filter(item => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="stack" className="section-wrap tech-stack-section">
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">04</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">stack</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Engineered with robust,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            production-grade tools.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          A modern stack centered on multi-agent orchestration, dense vector retrieval, in-process analytical databases, and resilient cloud deployments.
        </p>
      </div>

      <div className="tech-controls">
        {/* Category Tabs */}
        <div className="tech-categories" role="tablist" aria-label="Technology categories">
          {TECH_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`tech-cat-btn ${isSelected ? "tech-cat-btn--active" : ""}`}
              >
                {cat.id === "ai-agents" && <Sparkles size={14} />}
                {cat.id === "data-retrieval" && <Database size={14} />}
                {cat.id === "frameworks" && <Cpu size={14} />}
                {cat.id === "cloud-devops" && <Cloud size={14} />}
                {cat.id === "all" && <Boxes size={14} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="tech-search-wrap">
          <Search size={15} className="tech-search-icon" />
          <input
            type="text"
            placeholder="Filter tools (e.g. Docker, Gemini, MCP, SQL)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="tech-search-input"
            aria-label="Filter technologies by name or description"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="tech-clear-btn"
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid of Interactive Tech Cards */}
      {filteredTech.length === 0 ? (
        <div className="tech-empty-state">
          <p>No tools matched &ldquo;{searchQuery}&rdquo; in this category.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="button button--outline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="tech-grid">
          {filteredTech.map(tech => (
            <article
              key={tech.id}
              className="tech-card"
              style={
                {
                  "--brand-color": tech.brandColor,
                } as React.CSSProperties
              }
            >
              <div className="tech-card-top">
                <div className="tech-logo-wrap">
                  <TechLogo id={tech.id} size={32} />
                </div>
                <div className="tech-card-header">
                  <div className="tech-name-row">
                    <h3 className="tech-name">{tech.name}</h3>
                    <span className={`tech-badge tech-badge--${tech.experienceLevel.toLowerCase()}`}>
                      {tech.experienceLevel}
                    </span>
                  </div>
                  <span className="tech-cat-label">{tech.categoryLabel}</span>
                </div>
              </div>

              <div className="tech-role-pill">
                <CheckCircle size={13} className="text-primary" />
                <span>{tech.role}</span>
              </div>

              <p className="tech-description">{tech.description}</p>

              {tech.projects && tech.projects.length > 0 && (
                <div className="tech-projects">
                  <span className="tech-projects-label">Used in:</span>
                  <div className="tech-projects-links">
                    {tech.projects.map(p => (
                      <Link key={p.slug} href={`/projects/${p.slug}`} className="tech-project-link">
                        <span>{p.name}</span>
                        <ArrowUpRight size={11} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Capabilities & Cloud Summary Footer */}
      <div className="tech-summary-banner">
        <div className="summary-item">
          <Layers size={18} className="text-primary" />
          <div>
            <strong>100% End-to-End Type Safety</strong>
            <p>Pydantic v2 schemas on Python backends, Zod contracts on TypeScript frontends.</p>
          </div>
        </div>
        <div className="summary-item">
          <Cloud size={18} className="text-primary" />
          <div>
            <strong>Cloud Agnostic & Containerized</strong>
            <p>Reproducible Docker builds ready for AWS S3/ECS, Google Cloud Run, or Vercel.</p>
          </div>
        </div>
        <div className="summary-item">
          <Boxes size={18} className="text-primary" />
          <div>
            <strong>Grounded & Evaluation-Backed</strong>
            <p>Every LLM feature verified through RAGAS, deterministic scanners, and sandbox tests.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
