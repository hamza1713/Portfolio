import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@shared/portfolio";

export function CyberneticFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#090d16] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-neutral-300">ha-ops://online</span>
          <span className="text-neutral-600">·</span>
          <span>tls 1.3</span>
          <span className="text-neutral-600">·</span>
          <span>gemini-3.1-preview</span>
          <span className="text-neutral-600">·</span>
          <span className="text-[#64D8C3]">all systems operational</span>
        </span>

        <span>
          © {new Date().getFullYear()} Hamza Ali — Applied GenAI & Multi-Agent Architect
        </span>

        <span className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-[#64D8C3] transition-colors flex items-center gap-1"
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-[#64D8C3] transition-colors flex items-center gap-1"
          >
            <Linkedin size={13} /> LinkedIn
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-white transition-colors flex items-center gap-0.5"
          >
            Back to top <ArrowUpRight size={12} />
          </a>
        </span>
      </div>
    </footer>
  );
}
