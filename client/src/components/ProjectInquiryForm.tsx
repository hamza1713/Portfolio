import { trpc } from "@/lib/trpc";
import { CalendlyBookingPanel } from "@/components/CalendlyBookingPanel";
import { LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

const initialValues = {
  name: "",
  email: "",
  company: "",
  projectType: "RAG knowledge system",
  budget: "Not sure yet",
  timeline: "Exploring options",
  details: "",
};

export function ProjectInquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [, setLocation] = useLocation();
  const submitInquiry = trpc.projectInquiry.submit.useMutation({
    onSuccess: () => {
      setValues(initialValues);
      setLocation("/thank-you");
    },
  });

  const update = (field: keyof typeof initialValues, value: string) => setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitInquiry.mutate({
      ...values,
      projectType: values.projectType as "RAG knowledge system" | "AI agent / workflow" | "LLM reliability audit" | "Other AI product work",
      budget: values.budget as "Not sure yet" | "Under $500" | "$500 – $1,500" | "$1,500 – $5,000" | "$5,000+",
      timeline: values.timeline as "Exploring options" | "ASAP · 1–2 weeks" | "This month" | "1–3 months" | "Flexible / ongoing",
      website,
      startedAt,
    });
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form__heading"><span>PROJECT INQUIRY / 01</span><p>Share the shape of the work. Budget and timeline help start with the right constraints.</p></div>
      <CalendlyBookingPanel />
      <div className="inquiry-grid">
        <label><span>Your name</span><input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" maxLength={120} required /></label>
        <label><span>Email</span><input type="email" value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" maxLength={320} required /></label>
        <label><span>Company <i>optional</i></span><input value={values.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" maxLength={160} /></label>
        <label><span>Project type</span><select value={values.projectType} onChange={(event) => update("projectType", event.target.value)}><option>RAG knowledge system</option><option>AI agent / workflow</option><option>LLM reliability audit</option><option>Other AI product work</option></select></label>
        <label><span>Estimated budget</span><select value={values.budget} onChange={(event) => update("budget", event.target.value)}><option>Not sure yet</option><option>Under $500</option><option>$500 – $1,500</option><option>$1,500 – $5,000</option><option>$5,000+</option></select></label>
        <label><span>Expected timeline</span><select value={values.timeline} onChange={(event) => update("timeline", event.target.value)}><option>Exploring options</option><option>ASAP · 1–2 weeks</option><option>This month</option><option>1–3 months</option><option>Flexible / ongoing</option></select></label>
      </div>
      <label className="inquiry-message"><span>What needs to work?</span><textarea value={values.details} onChange={(event) => update("details", event.target.value)} placeholder="Data sources, users, desired outcome, integrations, and any constraints…" maxLength={5000} minLength={20} required /></label>
      <label className="inquiry-honeypot" aria-hidden="true"><span>Website</span><input value={website} onChange={(event) => setWebsite(event.target.value)} autoComplete="off" tabIndex={-1} /></label>
      <p className="inquiry-protection">Protected by automated spam screening.</p>
      {submitInquiry.error && <p className="inquiry-error" role="alert">Your inquiry could not be sent right now. Please try again or email Hamza directly.</p>}
      <button className="button button--lime inquiry-submit" disabled={submitInquiry.isPending} type="submit">{submitInquiry.isPending ? <><LoaderCircle className="spin" size={17} /> Sending signal…</> : <>Send project inquiry <Send size={17} /></>}</button>
    </form>
  );
}
