import { CalendarClock, Mail } from "lucide-react";

// Set this to the published Calendly event URL once Hamza is ready to accept bookings.
// Example: "https://calendly.com/hamza-ali/30min"
const calendlyEventUrl: string | null = null;

export function CalendlyBookingPanel() {
  if (calendlyEventUrl) {
    return (
      <aside className="booking-panel booking-panel--active" aria-label="Book a call">
        <CalendarClock size={20} />
        <div><span>READY TO TALK?</span><strong>Book a focused discovery call.</strong><p>Choose a time that works for you and we’ll discuss the project’s data, constraints, and desired outcomes.</p></div>
        <a className="booking-panel__link" href={calendlyEventUrl} target="_blank" rel="noreferrer">Open Calendly <CalendarClock size={15} /></a>
      </aside>
    );
  }

  return (
    <aside className="booking-panel" aria-label="Calendly booking availability">
      <CalendarClock size={20} />
      <div><span>CALENDLY / CONNECTING SOON</span><strong>Prefer to talk it through?</strong><p>Direct booking will appear here once availability is published. Until then, send the inquiry below and Hamza will reply with a suitable time.</p></div>
      <a className="booking-panel__link" href="mailto:hamza1713@gmail.com?subject=Discovery%20call%20request">Request a time <Mail size={15} /></a>
    </aside>
  );
}
