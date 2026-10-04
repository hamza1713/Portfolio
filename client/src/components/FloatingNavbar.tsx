import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

const navItems = [
  { id: "architecture", label: "Architecture" },
  { id: "work", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "stack", label: "Stack" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function FloatingNavbar() {
  const [location] = useLocation();
  const home = location === "/";
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [home]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!home) {
      window.location.href = `/#${id}`;
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center
                 px-4 sm:px-5 py-2 backdrop-blur-xl rounded-full
                 border border-white/15 bg-[#090d16]/85 shadow-[0_12px_36px_rgba(0,0,0,0.65)]
                 w-[calc(100%-2rem)] sm:w-auto max-w-fit
                 transition-[border-radius] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-4 sm:gap-x-6">
        {/* Terminal brand prompt */}
        <a
          href="#top"
          onClick={(e) => {
            if (home) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 group shrink-0"
          aria-label="Hamza Ali - AI Engineer"
        >
          <span className="relative w-7 h-7 flex items-center justify-center shrink-0 rounded-lg bg-[#64D8C3]/15 border border-[#64D8C3]/30 text-[#64D8C3]">
            <Terminal size={14} />
          </span>
          <span className="font-mono text-xs sm:text-sm text-white font-semibold tracking-tight whitespace-nowrap">
            ha<span className="text-[#64D8C3]">@</span>ai
          </span>
        </a>

        {/* Desktop sliding hover links */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center space-x-4 lg:space-x-5 text-xs sm:text-[13px] font-medium"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className={`group relative inline-block overflow-hidden h-5 leading-5 transition-opacity duration-200 whitespace-nowrap ${
                  isActive ? "text-[#64D8C3] font-semibold" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                  <span className="block h-5 whitespace-nowrap">{item.label}</span>
                  <span className="block h-5 whitespace-nowrap text-[#64D8C3]">{item.label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right side CTAs & Command Palette */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <CommandPalette />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            className="relative z-10 px-3.5 py-1 text-xs font-semibold text-[#090d16] bg-[#64D8C3] rounded-full hover:bg-[#80e5d3] shadow-[0_0_20px_rgba(100,216,195,0.4)] transition-all duration-200 shrink-0 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <CommandPalette />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-8 h-8 text-neutral-300 hover:text-white focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col items-center w-full pt-4 pb-2 border-t border-white/10 mt-3 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
              className="text-neutral-300 hover:text-[#64D8C3] font-medium text-sm w-full text-center py-1"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            className="w-full text-center py-2 text-xs font-bold text-[#090d16] bg-[#64D8C3] rounded-full mt-2"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
