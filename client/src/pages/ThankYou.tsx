import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { PortfolioShell } from "@/components/PortfolioShell";
import { profile } from "@shared/portfolio";
export default function ThankYou() {
  return (
    <PortfolioShell>
      <section id="top" className="message-page section-wrap">
        <p className="eyebrow">
          <CheckCircle2 size={17} /> Inquiry received
        </p>
        <h1>
          Thanks for the context.
          <br />
          <span>Let’s make it useful.</span>
        </h1>
        <p>
          Your inquiry has been saved. I’ll review the goal, data, and
          constraints, then follow up at the email address you provided.
        </p>
        <div className="message-next">
          <h2>What happens next</h2>
          <ol>
            <li>I review your project context and scope.</li>
            <li>I reply with focused questions or suggest a conversation.</li>
          </ol>
        </div>
        <div className="hero-actions">
          <Link href="/" className="button button--primary">
            <ArrowLeft size={17} /> Return to portfolio
          </Link>
          <a className="text-link" href={`mailto:${profile.email}`}>
            <Mail size={17} /> Add context by email
          </a>
        </div>
      </section>
    </PortfolioShell>
  );
}
