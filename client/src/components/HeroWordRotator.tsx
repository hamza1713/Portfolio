import { useEffect, useState } from "react";

export function HeroWordRotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFadeState("in");
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block align-baseline whitespace-nowrap">
      <span
        className={`inline-block font-bold tracking-tight text-[#64D8C3] transition-all duration-300 ${
          fadeState === "in"
            ? "opacity-100 blur-0 translate-y-0"
            : "opacity-0 blur-sm -translate-y-2"
        }`}
      >
        {words[index]}
      </span>
    </span>
  );
}
