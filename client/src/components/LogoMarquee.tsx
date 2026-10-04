import { TechLogo } from "./TechLogos";

const MARQUEE_ITEMS = [
  { id: "python", name: "Python" },
  { id: "crewai", name: "CrewAI" },
  { id: "fastapi", name: "FastAPI" },
  { id: "mcp", name: "Model Context Protocol" },
  { id: "gemini", name: "Google Gemini" },
  { id: "langchain", name: "LangChain" },
  { id: "ragas", name: "RAGAS" },
  { id: "chromadb", name: "ChromaDB" },
  { id: "duckdb", name: "DuckDB" },
  { id: "docker", name: "Docker" },
  { id: "aws", name: "AWS" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "typescript", name: "TypeScript" },
  { id: "react", name: "React 19" },
  { id: "githubactions", name: "GitHub Actions" },
  { id: "semgrep", name: "Semgrep" },
];

export function LogoMarquee() {
  return (
    <section
      aria-label="Tools and platforms marquee"
      className="relative border-y border-white/10 bg-[#090d16]/70 py-4 overflow-hidden"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 pr-4 will-change-transform">
        {/* First set */}
        {MARQUEE_ITEMS.map((item) => (
          <div
            key={`m1-${item.id}`}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] pl-2 pr-5 py-2 shrink-0 hover:border-[#64D8C3]/50 transition-colors duration-200"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white p-1.5 shadow-sm">
              <TechLogo id={item.id} size={20} />
            </span>
            <span className="font-mono text-xs text-neutral-200 font-medium">
              {item.name}
            </span>
          </div>
        ))}

        {/* Duplicate set for infinite loop */}
        {MARQUEE_ITEMS.map((item) => (
          <div
            key={`m2-${item.id}`}
            aria-hidden="true"
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] pl-2 pr-5 py-2 shrink-0 hover:border-[#64D8C3]/50 transition-colors duration-200"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white p-1.5 shadow-sm">
              <TechLogo id={item.id} size={20} />
            </span>
            <span className="font-mono text-xs text-neutral-200 font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Edge gradient fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b1120] to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b1120] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
