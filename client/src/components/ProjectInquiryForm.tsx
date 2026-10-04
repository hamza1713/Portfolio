import { useEffect, useId, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { LoaderCircle, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { profile, type ProjectType } from "@shared/portfolio";
import { CalendlyBookingPanel } from "./CalendlyBookingPanel";
const initialValues = {
  name: "",
  email: "",
  company: "",
  projectType: "Other AI product work" as ProjectType,
  budget: "Not sure yet" as const,
  timeline: "Exploring options" as const,
  details: "",
};
type Values = Omit<typeof initialValues, "budget" | "timeline"> & {
  budget:
    | "Not sure yet"
    | "Under $500"
    | "$500 – $1,500"
    | "$1,500 – $5,000"
    | "$5,000+";
  timeline:
    | "Exploring options"
    | "ASAP · 1–2 weeks"
    | "This month"
    | "1–3 months"
    | "Flexible / ongoing";
};
export function ProjectInquiryForm({
  projectType = "Other AI product work",
}: {
  projectType?: ProjectType;
}) {
  const [values, setValues] = useState<Values>({
    ...initialValues,
    projectType,
  });
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const id = useId();
  const submit = trpc.projectInquiry.submit.useMutation({
    onSuccess: () => {
      setValues(initialValues);
      setLocation("/thank-you");
    },
  });
  useEffect(() => {
    setValues(current => ({ ...current, projectType }));
    if (projectType !== "Other AI product work") setDetailsOpen(true);
  }, [projectType]);
  const update = <K extends keyof Values>(field: K, value: Values[K]) =>
    setValues(current => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!submit.isPending) submit.mutate({ ...values, website, startedAt });
  };
  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form-heading">
        <span className="eyebrow">Project inquiry</span>
        <h3>A little context goes a long way.</h3>
        <p>Share the goal and what needs to work.</p>
      </div>
      <div className="inquiry-grid">
        <label htmlFor={`${id}-name`}>
          Your name
          <input
            id={`${id}-name`}
            value={values.name}
            onChange={e => update("name", e.target.value)}
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
        <label htmlFor={`${id}-email`}>
          Email
          <input
            id={`${id}-email`}
            type="email"
            value={values.email}
            onChange={e => update("email", e.target.value)}
            autoComplete="email"
            maxLength={320}
            required
          />
        </label>
      </div>
      <label htmlFor={`${id}-brief`}>
        What are you hoping to build?
        <textarea
          id={`${id}-brief`}
          value={values.details}
          onChange={e => update("details", e.target.value)}
          placeholder="The workflow, data sources, intended users, and the outcome you want…"
          minLength={20}
          maxLength={5000}
          rows={4}
          required
        />
      </label>
      <details
        open={detailsOpen}
        onToggle={e => setDetailsOpen(e.currentTarget.open)}
        className="inquiry-details"
      >
        <summary>
          Add project details <span>optional</span>
        </summary>
        <div className="inquiry-grid">
          <label>
            Company
            <input
              value={values.company}
              onChange={e => update("company", e.target.value)}
              autoComplete="organization"
              maxLength={160}
            />
          </label>
          <label>
            Project type
            <select
              aria-label="Project type"
              value={values.projectType}
              onChange={e =>
                update("projectType", e.target.value as ProjectType)
              }
            >
              {[
                "Other AI product work",
                "RAG knowledge system",
                "AI agent / workflow",
                "LLM reliability audit",
              ].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Estimated budget
            <select
              aria-label="Estimated budget"
              value={values.budget}
              onChange={e =>
                update("budget", e.target.value as Values["budget"])
              }
            >
              {[
                "Not sure yet",
                "Under $500",
                "$500 – $1,500",
                "$1,500 – $5,000",
                "$5,000+",
              ].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Expected timeline
            <select
              aria-label="Expected timeline"
              value={values.timeline}
              onChange={e =>
                update("timeline", e.target.value as Values["timeline"])
              }
            >
              {[
                "Exploring options",
                "ASAP · 1–2 weeks",
                "This month",
                "1–3 months",
                "Flexible / ongoing",
              ].map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </details>
      <label className="inquiry-honeypot" aria-hidden="true">
        Website
        <input
          value={website}
          onChange={e => setWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>
      {submit.error && (
        <p className="inquiry-error" role="alert">
          Your inquiry wasn’t saved. Please try again, or{" "}
          <a href={`mailto:${profile.email}`}>email me directly</a>. Your draft
          is still here.
        </p>
      )}
      <button
        className="button button--primary inquiry-submit"
        disabled={submit.isPending}
        type="submit"
      >
        {submit.isPending ? (
          <>
            <LoaderCircle className="spin" size={17} /> Sending…
          </>
        ) : (
          <>
            Send project inquiry <Send size={17} />
          </>
        )}
      </button>
      <p className="inquiry-note">
        Your details are used to respond to this inquiry. Automated spam
        screening protects this form.
      </p>
      <CalendlyBookingPanel />
    </form>
  );
}
