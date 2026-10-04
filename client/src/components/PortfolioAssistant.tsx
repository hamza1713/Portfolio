import { lazy, Suspense, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Mail, MessageCircleMore, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { Message } from "./AIChatBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { getProject, profile } from "@shared/portfolio";
const AIChatBox = lazy(() =>
  import("./AIChatBox").then(m => ({ default: m.AIChatBox }))
);
export function PortfolioAssistant() {
  const [location] = useLocation();
  const project = getProject(location.split("/")[2] ?? "");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [sent, setSent] = useState(false);
  const ask = trpc.portfolioAssistant.ask.useMutation({
    onSuccess: ({ answer }) =>
      setMessages(current => [
        ...current,
        { role: "assistant", content: answer },
      ]),
    onError: error =>
      setMessages(current => [
        ...current,
        {
          role: "assistant",
          content:
            error.data?.code === "TOO_MANY_REQUESTS"
              ? `Please wait before sending another question, or email ${profile.email}.`
              : `I can’t answer right now. You can email Hamza at ${profile.email}.`,
        },
      ]),
  });
  const followUp = trpc.assistantFollowUp.request.useMutation({
    onSuccess: () => setSent(true),
  });
  const send = (content: string) => {
    const question = content.trim();
    if (!question || ask.isPending) return;
    const history = messages
      .filter(m => m.role === "user" || m.role === "assistant")
      .slice(-6)
      .map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content.trim().slice(0, 700),
      }));
    setMessages(current => [...current, { role: "user", content: question }]);
    ask.mutate({ question, history });
  };
  const prompts = project
    ? [
        `How does ${project.title} work?`,
        `What are the limits of ${project.title}?`,
        "How can Hamza help my team?",
      ]
    : [
        "What did Hamza build in FinSight?",
        "Explain the code review agent",
        "How can he help with a RAG system?",
      ];
  return (
    <aside className="portfolio-assistant" aria-label="Portfolio assistant">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="portfolio-assistant__trigger"
            aria-label="Ask about my work"
          >
            <MessageCircleMore size={20} />
            <span>Ask about my work</span>
          </button>
        </DialogTrigger>
        <DialogContent
          className="assistant-dialog !fixed !top-auto !bottom-[84px] !right-6 !left-auto !translate-x-0 !translate-y-0"
          onOpenAutoFocus={event => {
            event.preventDefault();
            requestAnimationFrame(() =>
              document
                .querySelector<HTMLButtonElement>(
                  '.assistant-dialog button[data-slot="dialog-close"]'
                )
                ?.focus()
            );
          }}
        >
          <div className="portfolio-assistant__header shrink-0 p-5 pb-3 border-b border-white/10">
            <p className="eyebrow mb-1 flex items-center gap-1.5 text-[#64D8C3] font-mono text-[10px] uppercase tracking-wider">
              <Sparkles size={12} /> Portfolio Assistant
            </p>
            <DialogTitle className="font-display text-lg font-bold text-white">Ask a project question.</DialogTitle>
            <DialogDescription className="portfolio-assistant__intro text-xs text-neutral-400 mt-1 leading-relaxed p-0">
              {project
                ? `Explore ${project.title}, Hamza’s engineering decisions, or ways to work together.`
                : "Ask about projects, architecture, or ways to work together."}
            </DialogDescription>
          </div>

          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#090d16]">
            <Suspense
              fallback={
                <div className="portfolio-assistant__loading p-8 text-center text-xs font-mono text-neutral-400" role="status">
                  Loading assistant…
                </div>
              }
            >
              <AIChatBox
                messages={messages}
                onSendMessage={send}
                isLoading={ask.isPending}
                suggestedPrompts={messages.length === 0 ? prompts : undefined}
                emptyStateMessage="Start with a useful question"
                placeholder="Ask about a project or experience…"
                height="100%"
                className="portfolio-assistant__panel flex-1 min-h-0 border-0 rounded-none bg-transparent"
              />
            </Suspense>
          </div>

          <div className="assistant-followup shrink-0 border-t border-white/10 bg-[#0c1220] p-3 px-4">
            {sent ? (
              <p className="assistant-followup__success text-xs text-emerald-400 flex items-center gap-1.5" role="status">
                <CheckCircle2 size={14} /> Follow-up request saved.
              </p>
            ) : followUpOpen ? (
              <form
                onSubmit={event => {
                  event.preventDefault();
                  if (!followUp.isPending)
                    followUp.mutate({ email, website, startedAt });
                }}
                className="space-y-2"
              >
                <label className="text-xs text-neutral-300 block">
                  Want Hamza to follow up?
                  <span className="block text-[11px] text-neutral-400 mt-0.5">Share your email if you’d like a reply.</span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    maxLength={320}
                    required
                    className="w-full mt-1 px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#64D8C3]"
                  />
                </label>
                <label
                  className="assistant-followup__honeypot hidden"
                  aria-hidden="true"
                >
                  Website
                  <input
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
                {followUp.error && (
                  <p className="assistant-followup__error text-xs text-rose-400" role="alert">
                    This request wasn’t saved. Try again or{" "}
                    <a href={`mailto:${profile.email}`} className="underline text-[#64D8C3]">email Hamza directly</a>
                    .
                  </p>
                )}
                <div className="assistant-followup__actions flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={followUp.isPending}
                    className="px-3 py-1 text-xs font-semibold text-[#090d16] bg-[#64D8C3] rounded-md hover:bg-[#80e5d3] disabled:opacity-50"
                  >
                    {followUp.isPending ? "Saving…" : "Request follow-up"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFollowUpOpen(false)}
                    className="px-3 py-1 text-xs text-neutral-400 hover:text-white"
                  >
                    Not now
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="assistant-followup__prompt text-xs text-[#64D8C3] hover:underline flex items-center gap-1.5"
                onClick={() => setFollowUpOpen(true)}
              >
                <Mail size={13} /> Want a follow-up from Hamza?
              </button>
            )}
          </div>
          <p className="portfolio-assistant__note shrink-0 bg-[#0c1220] px-4 pb-2.5 pt-0 text-[10px] text-neutral-500 font-mono">
            Answers use the public portfolio facts. Email follow-up is optional.
          </p>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
