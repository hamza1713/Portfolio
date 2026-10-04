import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { profile } from "@shared/portfolio";
import { CommandPalette } from "./CommandPalette";
import { FloatingNavbar } from "./FloatingNavbar";
import { CyberneticFooter } from "./CyberneticFooter";
const Assistant = lazy(() =>
  import("./PortfolioAssistant").then(m => ({ default: m.PortfolioAssistant }))
);
const navigation = [
  ["work", "Work"],
  ["lab", "Systems lab"],
  ["stack", "Stack"],
  ["services", "Services"],
  ["about", "About"],
  ["contact", "Contact"],
];
export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
export function PortfolioShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const home = location === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      if (id) document.getElementById(id)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [location]);
  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" }
    );
    navigation.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [home]);
  useEffect(() => {
    if (!menuOpen) return;
    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      const links =
        navigationRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (event.key !== "Tab" || !links?.length) return;
      if (event.shiftKey && document.activeElement === links[0]) {
        event.preventDefault();
        menuButton.current?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === links[links.length - 1]
      ) {
        event.preventDefault();
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  return (
    <div className="site-shell min-h-screen flex flex-col bg-[#0b1120] text-[#f3f6fb]">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <FloatingNavbar />
      <main id="main-content" className="flex-1 w-full">
        {children}
      </main>
      <CyberneticFooter />
      {mounted && (
        <Suspense fallback={null}>
          <Assistant />
        </Suspense>
      )}
    </div>
  );
}
