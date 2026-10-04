import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { profile, type ProjectType } from "@shared/portfolio";
import { ProjectInquiryForm } from "./ProjectInquiryForm";

export function ContactSection({ projectType }: { projectType: ProjectType }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section-wrap contact-section scroll-mt-24">
      {/* Topline header with terminal command */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
            <span className="text-neutral-500">[</span>
            <span className="text-[#64D8C3] font-semibold">07</span>
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-300 uppercase tracking-[0.25em]">initialize contact</span>
            <span className="text-neutral-500">]</span>
          </p>
          <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-2xl">
            Let’s architect something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
              resilient & intelligent.
            </span>
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 shrink-0">
          $ python -m agent_swarm.deploy <span className="text-[#64D8C3]">--production</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Project Inquiry Form (3 cols) */}
        <div className="lg:col-span-3">
          <ProjectInquiryForm projectType={projectType} />
        </div>

        {/* Right: The Architect Card & Direct Channels (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Cybernetic Engineer Profile Card */}
          <div className="group relative rounded-2xl border border-white/10 overflow-hidden bg-[#0c1220] p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#64D8C3]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64D8C3]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
                  the engineer
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 border border-white/10 rounded-full px-2 py-0.5">
                Pakistan · UTC+5
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-white">
              {profile.name}
            </h3>
            <p className="font-mono text-xs text-[#64D8C3] mt-0.5">
              GenAI · Multi-Agent Systems · RAG Architect
            </p>

            <p className="text-xs text-neutral-300 leading-relaxed mt-4">
              Computer Science graduate specializing in applied generative AI, agent swarms, Model Context Protocol (MCP), and empirical RAG evaluation. Available for contracts, consulting, and full-time technical roles.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-neutral-300">
                Available for Q4/Q1 engineering projects
              </span>
            </div>
          </div>

          {/* 1-Click Copy Email Pill */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0c1220] px-4 py-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 min-w-0 text-neutral-200 hover:text-white transition-colors"
            >
              <Mail size={16} className="text-[#64D8C3] shrink-0" />
              <span className="font-mono text-xs truncate">{profile.email}</span>
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-[#64D8C3] hover:border-[#64D8C3]/50 transition-colors shrink-0 flex items-center gap-1.5 font-mono text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#64D8C3]" />
                  <span className="text-[#64D8C3]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Connection Action Cards */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#0c1220] px-4 py-3 hover:border-[#64D8C3]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Linkedin size={16} className="text-neutral-400 group-hover:text-[#64D8C3] transition-colors" />
                <span className="text-xs font-semibold text-neutral-200">LinkedIn</span>
              </div>
              <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-[#64D8C3] transition-colors" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#0c1220] px-4 py-3 hover:border-[#64D8C3]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Github size={16} className="text-neutral-400 group-hover:text-[#64D8C3] transition-colors" />
                <span className="text-xs font-semibold text-neutral-200">GitHub</span>
              </div>
              <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-[#64D8C3] transition-colors" />
            </a>
          </div>

          {/* Download Resume / CV Pill */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/25 transition-colors"
          >
            <Download size={14} className="text-[#64D8C3]" />
            Download Curriculum Vitae (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
