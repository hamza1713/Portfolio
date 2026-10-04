import type { SVGProps } from "react";

export function TechLogo({ id, className = "", size = 28 }: { id: string; className?: string; size?: number }) {
  const props: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (id) {
    case "python":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            fill="#3776AB"
            d="M11.9 2c-3.1 0-5 .9-5 2.6v2.1h5.1v.6H4.6C2.6 7.3 1 9 1 11.8c0 2.8 1.4 4.5 3.9 4.5h1.9v-2.2c0-2.4 2-4.4 4.4-4.4h5.2V7.1C16.4 3.7 14.9 2 11.9 2zm-1.8 1.6c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9z"
          />
          <path
            fill="#FFD43B"
            d="M12.1 22c3.1 0 5-.9 5-2.6v-2.1H12v-.6h7.4c2 0 3.6-1.7 3.6-4.5 0-2.8-1.4-4.5-3.9-4.5h-1.9v2.2c0 2.4-2 4.4-4.4 4.4H7.6v2.6c0 3.4 1.5 5.1 4.5 5.1zm1.8-1.6c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z"
          />
        </svg>
      );

    case "fastapi":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path fill="#05998B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-3.5h3L11 6v3.5H8l5 7z" />
        </svg>
      );

    case "crewai":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FF4B4B" strokeWidth="2" />
          <circle cx="12" cy="7" r="2.5" fill="#FF4B4B" />
          <circle cx="7" cy="16" r="2" fill="#FF4B4B" />
          <circle cx="17" cy="16" r="2" fill="#FF4B4B" />
          <path d="M12 9.5v3m-3.5 2.5l2-1.5m3 0l2 1.5" stroke="#FF4B4B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "mcp":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#D97706" strokeWidth="2" />
          <circle cx="8" cy="8" r="2" fill="#D97706" />
          <circle cx="16" cy="8" r="2" fill="#D97706" />
          <circle cx="12" cy="15" r="2.5" fill="#D97706" />
          <path d="M9.5 9.5L11 13m3.5-3.5L13 13" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case "gemini":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            fill="#4E88F5"
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
          />
        </svg>
      );

    case "ragas":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#9333EA" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" stroke="#9333EA" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="2" fill="#9333EA" />
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "langchain":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <path
            d="M9 7a3 3 0 013-3h4a3 3 0 013 3v2a3 3 0 01-3 3h-4a3 3 0 01-3-3V7z"
            stroke="#2E7D32"
            strokeWidth="2"
          />
          <path
            d="M5 14a3 3 0 013-3h4a3 3 0 013 3v2a3 3 0 01-3 3H8a3 3 0 01-3-3v-2z"
            stroke="#4CAF50"
            strokeWidth="2"
          />
        </svg>
      );

    case "huggingface":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FFD21E" strokeWidth="2" />
          <circle cx="8.5" cy="10" r="1.5" fill="#FFD21E" />
          <circle cx="15.5" cy="10" r="1.5" fill="#FFD21E" />
          <path d="M7 14c1.5 2.5 8.5 2.5 10 0" stroke="#FFD21E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "chromadb":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="12" r="5" fill="#F97316" fillOpacity="0.8" />
          <circle cx="14" cy="9" r="5" fill="#FB923C" fillOpacity="0.8" />
          <circle cx="15" cy="15" r="4.5" fill="#EA580C" fillOpacity="0.8" />
        </svg>
      );

    case "duckdb":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 13c0-3.5 3-6 7-6 3.5 0 6 2 6 5 0 4-3.5 7-8 7-3 0-5-1.5-5-4z"
            fill="#EAB308"
          />
          <circle cx="14" cy="10" r="1.5" fill="#0B1120" />
          <path d="M17 11l4 1-4 2" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "postgresql":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            fill="#336791"
            d="M12 2C6.5 2 2 6.5 2 12c0 3.2 1.5 6 3.8 7.8-.1-.7-.2-1.7-.1-2.4l1.3-5.5c.2-.9.8-1.7 1.6-2.1.8-.4 1.8-.4 2.6-.1l3.5 1.4c.5.2 1 .3 1.5.3 1.7 0 3-1.1 3-2.6 0-1.8-1.5-3.2-3.4-3.2-1.3 0-2.4.6-2.9 1.6l-.9 1.7c-.3.6-.9 1-1.6 1-.3 0-.6-.1-.9-.2l-2.4-1C6.2 7.7 5.6 7 5.6 6.2c0-1.3 1.1-2.4 2.5-2.4.8 0 1.5.4 2 1l.7.9c.4.5 1 .8 1.6.8.6 0 1.2-.3 1.6-.8l.7-.9c.8-.9 1.9-1.5 3.1-1.5 2.5 0 4.6 2 4.6 4.6 0 2.2-1.6 4.1-3.7 4.5v1.2c0 2.5-1.8 4.6-4.2 4.9-1.2.2-2.4 0-3.5-.6l-1.3 1.3C13.2 21.7 14.5 22 16 22c5.5 0 10-4.5 10-10S21.5 2 16 2h-4z"
          />
        </svg>
      );

    case "tidb":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#E30C34" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 2v20M3 7l9 5 9-5" stroke="#E30C34" strokeWidth="1.5" />
        </svg>
      );

    case "pandas":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="4" height="16" rx="2" fill="#150458" />
          <rect x="10" y="8" width="4" height="12" rx="2" fill="#38A169" />
          <rect x="16" y="4" width="4" height="10" rx="2" fill="#FFD43B" />
        </svg>
      );

    case "typescript":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M11.5 14.2h-2v4.8H7.3v-4.8h-2V13h6.2v1.2zm3.8 4.9c-1.6 0-2.6-.9-2.7-2.2h1.8c.1.6.5.9 1.1.9.6 0 1-.3 1-.7 0-.5-.3-.7-1.3-1-1.6-.4-2.5-1.1-2.5-2.3 0-1.4 1.1-2.3 2.7-2.3 1.5 0 2.5.8 2.6 2.1h-1.8c-.1-.5-.4-.8-.9-.8-.5 0-.9.3-.9.7 0 .4.3.6 1.3.9 1.7.5 2.5 1.1 2.5 2.4 0 1.5-1.2 2.3-2.8 2.3z"
          />
        </svg>
      );

    case "react":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case "semgrep":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <path d="M12 3L4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-4z" stroke="#2B5876" strokeWidth="2" />
          <circle cx="12" cy="11" r="3" stroke="#64D8C3" strokeWidth="2" />
          <path d="M14.5 13.5L18 17" stroke="#64D8C3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "aws":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            fill="#FF9900"
            d="M6.8 11.2c-.2-.6-.3-1.3-.3-2.1 0-3.3 2.2-5.1 5.5-5.1 3.3 0 5.5 1.8 5.5 5.1 0 .8-.1 1.5-.3 2.1l2.4.9c.3-.9.5-1.9.5-3 0-4.6-3.4-7.2-8.1-7.2-4.7 0-8.1 2.6-8.1 7.2 0 1.1.2 2.1.5 3l2.4-.9z"
          />
          <path
            fill="#FF9900"
            d="M18.8 17.5c-3.7 2.3-8.8 2.5-13.6.4-.3-.1-.6.2-.4.5 3.5 3.1 9.4 3.7 14.5 1 .4-.2.3-.8-.5-.8l-.0-1.1z"
          />
          <path
            fill="#FF9900"
            d="M20.2 16.2l-2.2-.4c-.2 0-.3.2-.2.4l1.1 1.9c.1.2.4.2.5 0l1-1.6c.1-.2-.1-.3-.2-.3z"
          />
        </svg>
      );

    case "gcp":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <path d="M19.3 14.3a4.5 4.5 0 00-4.3-3.3c-.6 0-1.2.1-1.7.4A6 6 0 004 15a4.5 4.5 0 004.5 4.5h10.8a4.5 4.5 0 000-9c-.1 0-.3 0-.4.1" stroke="#4285F4" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 11V6m0 0l-2 2m2-2l2 2" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "docker":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            fill="#2496ED"
            d="M22.5 11c-.4-.3-1.1-.4-1.8-.3-.2-.8-.7-1.5-1.4-2l-.6-.4-.4.6c-.4.7-.6 1.4-.5 2.2-.7-.2-1.6 0-2.3.4l-.4.2.2.4c.5 1.1.6 2.3.2 3.4-.6 1.7-2.1 2.8-3.9 3.1-2.9.4-6.4-.4-9.2-2.1l-.8-.5-.4.8c-.8 1.4-.8 3.1 0 4.5 1.4 2.5 4.2 3.1 7.2 3.1 5.9 0 11.2-3.3 13.3-8.4.3-.8.4-1.6.4-2.5 0-.9-.2-1.6-.7-2z"
          />
          <rect x="2" y="10" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="5" y="10" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="8" y="10" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="11" y="10" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="5" y="7.5" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="8" y="7.5" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="11" y="7.5" width="2" height="2" fill="#2496ED" rx=".3" />
          <rect x="8" y="5" width="2" height="2" fill="#2496ED" rx=".3" />
        </svg>
      );

    case "vercel":
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path fill="#F3F6FB" d="M12 2L23 21H1L12 2Z" />
        </svg>
      );

    case "github-actions":
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#2088FF" strokeWidth="2" />
          <circle cx="7" cy="12" r="2" fill="#2088FF" />
          <circle cx="17" cy="7" r="2" fill="#2088FF" />
          <circle cx="17" cy="17" r="2" fill="#2088FF" />
          <path d="M9 12h3m0 0l3-4m-3 4l3 4" stroke="#2088FF" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#64D8C3" strokeWidth="2" />
          <path d="M8 12h8M12 8v8" stroke="#64D8C3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
