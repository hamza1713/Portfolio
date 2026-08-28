import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";

export default function ThankYou() {
  return (
    <main className="thank-you-page">
      <header className="thank-you-page__header"><a href="/" className="brand"><span className="brand-mark">H</span> HAMZA ALI</a><a href="/" className="back-link"><ArrowLeft size={15} /> Back to portfolio</a></header>
      <section className="thank-you-card">
        <span className="thank-you-card__signal"><CheckCircle2 size={15} /> INQUIRY RECEIVED / 01</span>
        <h1>Signal received.<br /><em>Let’s make it useful.</em></h1>
        <p>Thanks for sharing the project context. Hamza will review your data, constraints, and desired outcome, then follow up at the email address you provided.</p>
        <div className="thank-you-card__next"><span>WHAT HAPPENS NEXT</span><ol><li>Your inquiry is reviewed against the project scope.</li><li>You’ll receive a reply with focused next questions or a suggested call.</li></ol></div>
        <div className="thank-you-card__actions"><a className="button button--lime" href="/">Return to portfolio <ArrowLeft size={16} /></a><a className="email-fallback" href="mailto:hamza1713@gmail.com"><Mail size={15} /> Need to add context? Send an email.</a></div>
      </section>
    </main>
  );
}
