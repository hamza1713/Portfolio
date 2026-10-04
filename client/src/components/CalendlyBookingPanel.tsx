import { CalendarClock, ArrowUpRight } from "lucide-react";
import { profile } from "@shared/portfolio";
export function CalendlyBookingPanel() {
  const configured = import.meta.env.VITE_CALENDLY_URL;
  let bookingUrl: string | null = null;
  try {
    const url = new URL(configured);
    if (
      url.protocol === "https:" &&
      (url.hostname === "calendly.com" ||
        url.hostname.endsWith(".calendly.com"))
    )
      bookingUrl = url.href;
  } catch {
    /* Email remains available. */
  }
  return (
    <aside className="booking-panel">
      <CalendarClock size={18} />
      <div>
        <strong>Prefer a conversation?</strong>
        <a
          href={
            bookingUrl ??
            `mailto:${profile.email}?subject=Discovery%20call%20request`
          }
          target={bookingUrl ? "_blank" : undefined}
          rel={bookingUrl ? "noreferrer" : undefined}
        >
          {bookingUrl
            ? "Choose a time for a discovery call"
            : "Email me to arrange a call"}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </aside>
  );
}
