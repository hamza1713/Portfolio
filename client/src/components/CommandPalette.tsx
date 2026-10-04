import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Calculator,
  Download,
  Github,
  Linkedin,
  MessageSquare,
  Search,
  Server,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import { profile } from "@shared/portfolio";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleNavigate = (pathOrAnchor: string) => {
    setOpen(false);
    if (pathOrAnchor.startsWith("/")) {
      setLocation(pathOrAnchor);
    } else if (pathOrAnchor.startsWith("#")) {
      const element = document.querySelector(pathOrAnchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        setLocation(`/${pathOrAnchor}`);
      }
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cmd-palette-trigger"
        aria-label="Open command palette (Ctrl+K or Cmd+K)"
        title="Quick jump (Ctrl+K or Cmd+K)"
      >
        <Search size={13} className="text-neutral-400" />
        <span className="cmd-trigger-text font-mono text-[11px] text-neutral-400">Search</span>
        <kbd className="cmd-kbd">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div
        className="cmd-dialog"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <Command className="cmd-root">
          <div className="cmd-input-wrap">
            <Search size={17} className="cmd-search-icon" />
            <Command.Input
              placeholder="Search projects, architecture labs, or actions..."
              className="cmd-input"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cmd-close-btn"
              aria-label="Close command palette"
            >
              <X size={16} />
            </button>
          </div>

          <Command.List className="cmd-list">
            <Command.Empty className="cmd-empty">No results found.</Command.Empty>

            <Command.Group heading="Flagship Projects">
              <Command.Item
                onSelect={() => handleNavigate("/projects/finsight")}
                className="cmd-item"
              >
                <Workflow size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">FinSight</span>
                  <span className="cmd-item-desc">Enterprise RAG & RBAC Knowledge Workspace</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("/projects/ai-code-review-agent")}
                className="cmd-item"
              >
                <Server size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">AI Code Review Agent</span>
                  <span className="cmd-item-desc">Multi-Agent Review Pipeline with MCP & Regression Tests</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("/projects/factscope-ai")}
                className="cmd-item"
              >
                <BookOpen size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">Factscope AI</span>
                  <span className="cmd-item-desc">Claim Decomposition & Live Grounded Verification</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Interactive Systems Lab">
              <Command.Item
                onSelect={() => handleNavigate("#roi-estimator")}
                className="cmd-item"
              >
                <Calculator size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">AI Token & Cost Estimator</span>
                  <span className="cmd-item-desc">Model infrastructure spend, latency & caching savings</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("#mcp-lab")}
                className="cmd-item"
              >
                <Server size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">MCP Protocol Inspector</span>
                  <span className="cmd-item-desc">JSON-RPC 2.0 schemas & agent tool execution traces</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("#evals-matrix")}
                className="cmd-item"
              >
                <Target size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">Reliability & Benchmark Matrix</span>
                  <span className="cmd-item-desc">RAGAS scores, confusion matrix & ground truth tests</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("#lab")}
                className="cmd-item"
              >
                <Workflow size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">System Architecture Explorer</span>
                  <span className="cmd-item-desc">Step-by-step interactive workflow simulations</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => handleNavigate("#stack")}
                className="cmd-item"
              >
                <Boxes size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">Tools, Frameworks & Cloud</span>
                  <span className="cmd-item-desc">Interactive tech stack: Python, CrewAI, ChromaDB, AWS, Docker</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions & Contacts">
              <Command.Item
                onSelect={() => handleNavigate("#contact")}
                className="cmd-item"
              >
                <MessageSquare size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">Discuss a Project</span>
                  <span className="cmd-item-desc">Submit an inquiry with budget and timeline</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.open(profile.resume, "_blank");
                }}
                className="cmd-item"
              >
                <Download size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">Download Resume (CV)</span>
                  <span className="cmd-item-desc">GenAI / AI-ML Engineer Resume PDF</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.open(profile.github, "_blank");
                }}
                className="cmd-item"
              >
                <Github size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">GitHub Profile</span>
                  <span className="cmd-item-desc">{profile.github}</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.open(profile.linkedin, "_blank");
                }}
                className="cmd-item"
              >
                <Linkedin size={16} />
                <div className="cmd-item-info">
                  <span className="cmd-item-title">LinkedIn Profile</span>
                  <span className="cmd-item-desc">Connect with Hamza Ali</span>
                </div>
                <ArrowRight size={14} className="cmd-item-arrow" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="cmd-footer">
            <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>Enter</kbd> to select</span>
            <span><kbd>Esc</kbd> to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
