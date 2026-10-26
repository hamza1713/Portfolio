import { GraduationCap, Award, BrainCircuit, Code2, Sparkles } from "lucide-react";
import { TechLogo } from "./TechLogos";

export function CredentialsSection() {
  const credentials = [
    {
      issuer: "Abbottabad University of Science & Tech",
      title: "Bachelor of Science in Computer Science (BSCS)",
      code: "BSCS · 2026",
      year: "2022–2026",
      isPrimary: true,
      iconType: "degree",
    },
    {
      issuer: "ATS AI Lab · Advanced Telecom Services",
      title: "Data Science & AI Systems Engineering",
      code: "ATS-LAB",
      year: "2024",
      isPrimary: true,
      iconType: "internship",
    },
    {
      issuer: "DeepLearning.AI & Stanford Online",
      title: "Machine Learning Specialization",
      code: "ML-SPEC",
      year: "2024",
      isPrimary: false,
      logoId: "gemini",
    },
    {
      issuer: "DeepLearning.AI & CrewAI",
      title: "Multi-Agent Systems & Tool Orchestration",
      code: "CREW-AGENTS",
      year: "2025",
      isPrimary: false,
      logoId: "crewai",
    },
    {
      issuer: "DeepLearning.AI",
      title: "Production RAG & Vector Evaluation",
      code: "RAG-EVALS",
      year: "2025",
      isPrimary: false,
      logoId: "ragas",
    },
  ];

  return (
    <section id="credentials" className="section-wrap credentials-section scroll-mt-24">
      {/* Monospace section heading */}
      <div className="section-heading">
        <p className="font-mono text-sm mb-3 flex items-center gap-2 select-none">
          <span className="text-neutral-500">[</span>
          <span className="text-[#64D8C3] font-semibold">06</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300 uppercase tracking-[0.25em]">credentials</span>
          <span className="text-neutral-500">]</span>
        </p>
        <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-tight text-white max-w-3xl">
          Engineered with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64D8C3] to-[#80E5D3]">
            rigor & research discipline.
          </span>
        </h2>
        <p className="section-description max-w-2xl text-neutral-400">
          Academic foundation in Computer Science combined with hands-on enterprise AI laboratory experience, Stanford Online / DeepLearning.AI specializations, and open-source contributions.
        </p>
      </div>

      {/* Grid of 5 credential cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {credentials.map((cred) => (
          <div
            key={cred.code}
            className={`beam-card group rounded-2xl border p-5 flex flex-col justify-between gap-4 h-full transition-all duration-300 ${
              cred.isPrimary
                ? "border-[#64D8C3]/50 bg-[#64D8C3]/[0.06] hover:border-[#64D8C3]/80 shadow-[0_4px_20px_rgba(100,216,195,0.1)]"
                : "border-white/10 bg-[#0c1220] hover:border-white/25"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                {cred.logoId ? (
                  <TechLogo id={cred.logoId} size={28} />
                ) : cred.iconType === "degree" ? (
                  <GraduationCap className="text-[#0b1120]" size={26} />
                ) : (
                  <BrainCircuit className="text-[#0b1120]" size={26} />
                )}
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                {cred.year}
              </span>
            </div>

            <div className="flex-1">
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {cred.issuer}
              </p>
              <h3 className="mt-1.5 font-display text-sm font-semibold text-white leading-snug">
                {cred.title}
              </h3>
            </div>

            <span
              className={`self-start font-mono text-[10px] rounded-full px-2.5 py-0.5 border ${
                cred.isPrimary
                  ? "text-[#64D8C3] border-[#64D8C3]/40 bg-[#64D8C3]/10"
                  : "text-neutral-400 border-white/15 bg-white/[0.04]"
              }`}
            >
              {cred.code}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
