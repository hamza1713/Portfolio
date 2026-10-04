import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PortfolioShell } from "@/components/PortfolioShell";
export default function NotFound() {
  return (
    <PortfolioShell>
      <section id="top" className="message-page section-wrap">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This path ends here.</h1>
        <p>
          The page you’re looking for isn’t available. There’s plenty of work to
          explore back at the portfolio.
        </p>
        <Link href="/" className="button button--primary">
          <ArrowLeft size={17} /> Back to the portfolio
        </Link>
      </section>
    </PortfolioShell>
  );
}
