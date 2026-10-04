import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  Inbox,
  Mail,
  MailCheck,
  Send,
  ShieldCheck,
} from "lucide-react";

function formatDate(value: Date | string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function LeadReviewContent() {
  const { user, loading } = useAuth();
  const isOwner = user?.role === "admin";
  const leads = trpc.admin.leads.useQuery(undefined, { enabled: isOwner });
  const [filter, setFilter] = useState<"all" | "inquiries" | "follow-ups">("all");

  if (loading)
    return <div className="admin-state">Checking secure access…</div>;
  if (!isOwner)
    return (
      <div className="admin-state admin-state--denied">
        <ShieldCheck size={24} />
        <h1>Owner access only.</h1>
        <p>This lead review area is restricted to Hamza’s administrator account.</p>
        <a href="/">
          <ArrowLeft size={15} /> Return to portfolio
        </a>
      </div>
    );
  if (leads.isLoading)
    return <div className="admin-state">Loading lead records…</div>;
  if (leads.error || !leads.data)
    return (
      <div className="admin-state admin-state--denied">
        <AlertTriangle size={24} />
        <h1>Lead records are unavailable.</h1>
        <p>Please refresh the page or try again shortly.</p>
      </div>
    );

  const { inquiries, followUps } = leads.data;

  const handleExportCSV = () => {
    const rows = [
      ["Type", "Name", "Email", "Company", "Project Type", "Budget", "Timeline", "Details", "Date"],
      ...inquiries.map(inq => [
        "Inquiry",
        `"${inq.name.replace(/"/g, '""')}"`,
        inq.email,
        `"${(inq.company || "").replace(/"/g, '""')}"`,
        `"${inq.projectType}"`,
        `"${inq.budget}"`,
        `"${inq.timeline}"`,
        `"${inq.details.replace(/"/g, '""')}"`,
        new Date(inq.createdAt).toISOString(),
      ]),
      ...followUps.map(f => [
        "Assistant Follow-Up",
        "",
        f.email,
        "",
        "",
        "",
        "",
        "Requested assistant follow-up",
        new Date(f.createdAt).toISOString(),
      ]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hamza_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMailtoLink = (name: string, email: string, projectType: string, timeline: string) => {
    const subject = encodeURIComponent(`Re: ${projectType} project inquiry`);
    const body = encodeURIComponent(
      `Hi ${name},\n\nThank you for reaching out regarding your ${projectType} project. I reviewed your requirements and timeline (${timeline}).\n\nI would be glad to discuss the architecture and implementation approach with you. Would you have 15 minutes this week for a brief technical alignment call?\n\nBest regards,\nHamza Ali\nGenAI / AI-ML Engineer\nhttps://github.com/hamza1713`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="admin-review">
      <header className="admin-review__header">
        <div>
          <span>OWNER SPACE / PRIVATE</span>
          <h1>
            Lead signals, <em>in one place.</em>
          </h1>
          <p>Project inquiries and opt-in assistant follow-ups are visible only to the portfolio owner.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            type="button"
            onClick={handleExportCSV}
            className="button button--outline"
            style={{ fontSize: "13px", padding: "8px 14px" }}
          >
            <Download size={14} /> Export CSV
          </button>
          <a href="/">
            <ArrowLeft size={15} /> View portfolio
          </a>
        </div>
      </header>

      <div className="admin-review__summary">
        <div
          onClick={() => setFilter("inquiries")}
          style={{ cursor: "pointer" }}
        >
          <Inbox size={17} />
          <strong>{inquiries.length}</strong>
          <span>Project inquiries</span>
        </div>
        <div
          onClick={() => setFilter("follow-ups")}
          style={{ cursor: "pointer" }}
        >
          <MailCheck size={17} />
          <strong>{followUps.length}</strong>
          <span>Follow-up requests</span>
        </div>
        <div
          onClick={() => setFilter("all")}
          style={{ cursor: "pointer" }}
        >
          <ShieldCheck size={17} />
          <strong>Protected</strong>
          <span>Server-enforced access</span>
        </div>
      </div>

      {(filter === "all" || filter === "inquiries") && (
        <section className="lead-section">
          <div className="lead-section__heading">
            <span>01 / PROJECT INQUIRIES</span>
            <h2>Client project context</h2>
          </div>
          {inquiries.length === 0 ? (
            <p className="lead-empty">No project inquiries yet.</p>
          ) : (
            <div className="lead-cards">
              {inquiries.map(inquiry => (
                <article className="lead-card" key={inquiry.id}>
                  <div className="lead-card__top">
                    <div>
                      <h3>{inquiry.name}</h3>
                      <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                      {inquiry.company && <span>{inquiry.company}</span>}
                    </div>
                    <time>{formatDate(inquiry.createdAt)}</time>
                  </div>
                  <div className="lead-card__meta">
                    <span>{inquiry.projectType}</span>
                    <span>{inquiry.budget}</span>
                    <span>{inquiry.timeline}</span>
                  </div>
                  <p>{inquiry.details}</p>
                  <div style={{ marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(41, 51, 74, 0.4)" }}>
                    <a
                      href={getMailtoLink(
                        inquiry.name,
                        inquiry.email,
                        inquiry.projectType,
                        inquiry.timeline
                      )}
                      className="button button--primary"
                      style={{ fontSize: "12px", padding: "6px 12px", display: "inline-flex", gap: "6px" }}
                    >
                      <Send size={13} /> 1-Click Quick Reply Proposal
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {(filter === "all" || filter === "follow-ups") && (
        <section className="lead-section">
          <div className="lead-section__heading">
            <span>02 / ASSISTANT FOLLOW-UPS</span>
            <h2>Opt-in contact requests</h2>
          </div>
          {followUps.length === 0 ? (
            <p className="lead-empty">No follow-up requests yet.</p>
          ) : (
            <div className="follow-up-list">
              {followUps.map(followUp => (
                <a
                  key={followUp.id}
                  className="follow-up-row"
                  href={`mailto:${followUp.email}?subject=Hamza%20Ali%20%E2%80%94%20Portfolio%20Follow-Up&body=Hi%2C%0A%0AThank%20you%20for%20asking%20for%20a%20follow-up%20through%20my%20portfolio%20assistant.%20How%20can%20I%20help%20with%20your%20AI%20engineering%20needs%3F%0A%0ABest%20regards%2C%0AHamza%20Ali`}
                >
                  <div>
                    <MailCheck size={17} />
                    <span>{followUp.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <time>{formatDate(followUp.createdAt)}</time>
                    <Mail size={14} style={{ opacity: 0.6 }} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <LeadReviewContent />
    </DashboardLayout>
  );
}
