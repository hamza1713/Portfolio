import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Mail, MessageCircleMore, Minus, Sparkles, X } from "lucide-react";
import { useState } from "react";

const welcome = "Ask about Hamza’s AI/ML experience, FinSight, Factscope AI, or the kind of work he can help with.";
const prompts = ["What did Hamza build in FinSight?", "How can he help with a RAG system?", "What is Factscope AI?"];

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUpEmail, setFollowUpEmail] = useState("");
  const [followUpWebsite, setFollowUpWebsite] = useState("");
  const [followUpStartedAt] = useState(() => Date.now());
  const [followUpSent, setFollowUpSent] = useState(false);
  const askMutation = trpc.portfolioAssistant.ask.useMutation({
    onSuccess: ({ answer }) => setMessages((current) => [...current, { role: "assistant", content: answer }]),
    onError: () => setMessages((current) => [...current, { role: "assistant", content: "I’m unable to answer right now. Please email Hamza directly at hamza1713@gmail.com." }]),
  });

  const sendMessage = (content: string) => {
    const question = content.trim();
    if (!question || askMutation.isPending) return;
    const history = messages
      .filter((message) => message.role === "user" || message.role === "assistant")
      .slice(-6)
      .map((message) => ({ role: message.role as "user" | "assistant", content: message.content }));
    setMessages((current) => [...current, { role: "user", content: question }]);
    askMutation.mutate({ question, history });
  };

  const followUpMutation = trpc.assistantFollowUp.request.useMutation({
    onSuccess: () => setFollowUpSent(true),
  });

  return (
    <aside className={`portfolio-assistant ${open ? "portfolio-assistant--open" : ""}`} aria-label="Ask Hamza’s portfolio assistant">
      {open && (
        <div className="portfolio-assistant__window">
          <div className="portfolio-assistant__header">
            <div><span className="portfolio-assistant__eyebrow"><Sparkles size={13} /> PORTFOLIO ASSISTANT</span><strong>Ask a project question.</strong></div>
            <div className="portfolio-assistant__controls"><button onClick={() => setOpen(false)} aria-label="Minimize assistant"><Minus size={17} /></button><button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={17} /></button></div>
          </div>
          <div className="portfolio-assistant__intro"><span className="signal-dot" /><p>{welcome}</p></div>
          <AIChatBox
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={askMutation.isPending}
            suggestedPrompts={messages.length === 0 ? prompts : undefined}
            emptyStateMessage="Start with a useful question"
            placeholder="Ask about experience or projects…"
            height="360px"
            className="portfolio-assistant__panel"
          />
          <div className="assistant-followup">
            {followUpSent ? <p className="assistant-followup__success"><CheckCircle2 size={14} /> Follow-up request saved — Hamza will reach out.</p> : followUpOpen ? (
              <form onSubmit={(event) => { event.preventDefault(); if (followUpEmail.trim() && !followUpMutation.isPending) followUpMutation.mutate({ email: followUpEmail, website: followUpWebsite, startedAt: followUpStartedAt }); }}>
                <label>Want Hamza to follow up?<span>Share your email only if you’d like a reply.</span><input type="email" value={followUpEmail} onChange={(event) => setFollowUpEmail(event.target.value)} placeholder="you@company.com" autoComplete="email" required /></label>
                <label className="assistant-followup__honeypot" aria-hidden="true">Website<input value={followUpWebsite} onChange={(event) => setFollowUpWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
                {followUpMutation.error && <p className="assistant-followup__error">Could not save this right now. Please email Hamza directly.</p>}
                <div className="assistant-followup__actions"><button type="submit" disabled={followUpMutation.isPending}>{followUpMutation.isPending ? "Saving…" : "Request follow-up"}</button><button type="button" onClick={() => setFollowUpOpen(false)}>Not now</button></div>
              </form>
            ) : <button className="assistant-followup__prompt" onClick={() => setFollowUpOpen(true)}><Mail size={14} /> Want a follow-up from Hamza?</button>}
          </div>
          <p className="portfolio-assistant__note">Answers are grounded in this portfolio. Follow-up email is optional.</p>
        </div>
      )}
      <button className="portfolio-assistant__trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close portfolio assistant" : "Ask the portfolio assistant"}>
        <MessageCircleMore size={20} /> <span>{open ? "Close assistant" : "Ask about my work"}</span>
      </button>
    </aside>
  );
}
