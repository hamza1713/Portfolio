import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, ArrowLeft, Inbox, MailCheck, ShieldCheck } from "lucide-react";

function formatDate(value: Date | string) {
  return new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function LeadReviewContent() {
  const { user, loading } = useAuth();
  const isOwner = user?.role === "admin";
  const leads = trpc.admin.leads.useQuery(undefined, { enabled: isOwner });

  if (loading) return <div className="admin-state">Checking secure access…</div>;
  if (!isOwner) return <div className="admin-state admin-state--denied"><ShieldCheck size={24} /><h1>Owner access only.</h1><p>This lead review area is restricted to Hamza’s administrator account.</p><a href="/"><ArrowLeft size={15} /> Return to portfolio</a></div>;
  if (leads.isLoading) return <div className="admin-state">Loading lead records…</div>;
  if (leads.error || !leads.data) return <div className="admin-state admin-state--denied"><AlertTriangle size={24} /><h1>Lead records are unavailable.</h1><p>Please refresh the page or try again shortly.</p></div>;

  const { inquiries, followUps } = leads.data;
  return (
    <section className="admin-review">
      <header className="admin-review__header"><div><span>OWNER SPACE / PRIVATE</span><h1>Lead signals, <em>in one place.</em></h1><p>Project inquiries and opt-in assistant follow-ups are visible only to the portfolio owner.</p></div><a href="/"><ArrowLeft size={15} /> View portfolio</a></header>
      <div className="admin-review__summary"><div><Inbox size={17} /><strong>{inquiries.length}</strong><span>Project inquiries</span></div><div><MailCheck size={17} /><strong>{followUps.length}</strong><span>Follow-up requests</span></div><div><ShieldCheck size={17} /><strong>Protected</strong><span>Server-enforced access</span></div></div>
      <section className="lead-section"><div className="lead-section__heading"><span>01 / PROJECT INQUIRIES</span><h2>Client project context</h2></div>{inquiries.length === 0 ? <p className="lead-empty">No project inquiries yet.</p> : <div className="lead-cards">{inquiries.map((inquiry) => <article className="lead-card" key={inquiry.id}><div className="lead-card__top"><div><h3>{inquiry.name}</h3><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>{inquiry.company && <span>{inquiry.company}</span>}</div><time>{formatDate(inquiry.createdAt)}</time></div><div className="lead-card__meta"><span>{inquiry.projectType}</span><span>{inquiry.budget}</span><span>{inquiry.timeline}</span></div><p>{inquiry.details}</p></article>)}</div>}</section>
      <section className="lead-section"><div className="lead-section__heading"><span>02 / ASSISTANT FOLLOW-UPS</span><h2>Opt-in contact requests</h2></div>{followUps.length === 0 ? <p className="lead-empty">No follow-up requests yet.</p> : <div className="follow-up-list">{followUps.map((followUp) => <a key={followUp.id} className="follow-up-row" href={`mailto:${followUp.email}`}><div><MailCheck size={17} /><span>{followUp.email}</span></div><time>{formatDate(followUp.createdAt)}</time></a>)}</div>}</section>
    </section>
  );
}

export default function AdminDashboard() {
  return <DashboardLayout><LeadReviewContent /></DashboardLayout>;
}
