import { COOKIE_NAME } from "../shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createAssistantFollowUp, createProjectInquiry, listAssistantFollowUps, listProjectInquiries } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { logger } from "./_core/logger";
import { notifyOwner } from "./_core/notification";
import { enforceRateLimit } from "./_core/rateLimiter";
import { PORTFOLIO_SYSTEM_PROMPT, getFallbackPortfolioAnswer, sanitizePortfolioHistory } from "./portfolioAssistant";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const projectInquiryInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160),
  projectType: z.enum(["RAG knowledge system", "AI agent / workflow", "LLM reliability audit", "Other AI product work"]),
  budget: z.enum(["Not sure yet", "Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"]),
  timeline: z.enum(["Exploring options", "ASAP · 1–2 weeks", "This month", "1–3 months", "Flexible / ongoing"]),
  details: z.string().trim().min(20).max(5000),
  website: z.string().max(200).default(""),
  startedAt: z.number().int().nonnegative(),
});

export const assistantFollowUpInput = z.object({
  email: z.string().trim().email().max(320),
  website: z.string().max(200).default(""),
  startedAt: z.number().int().nonnegative(),
});

const MIN_FORM_COMPLETION_MS = 2_500;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  portfolioAssistant: router({
    models: publicProcedure.query(async () => {
      return listLLMModels();
    }),
    ask: publicProcedure
      .input(z.object({
        question: z.string().trim().min(1).max(700),
        history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(700) })).max(6).default([]),
      }))
      .mutation(async ({ input, ctx }) => {
        enforceRateLimit(ctx.req, {
          actionName: "portfolio assistant",
          maxRequests: 15,
          windowMs: 10 * 60 * 1000,
        });

        const apiKey = ENV.geminiApiKey || ENV.forgeApiKey || "";
        if (!apiKey) {
          logger.info("PortfolioAssistant", "No API key configured; serving grounded knowledge base answer", {
            questionPreview: input.question.slice(0, 80),
          });
          const answer = getFallbackPortfolioAnswer(input.question);
          return { answer };
        }

        try {
          const model = ENV.geminiModel || "gemini/gemini-3.1-flash-lite-preview";

          const response = await invokeLLM({
            model,
            maxTokens: 650,
            messages: [
              { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
              ...sanitizePortfolioHistory(input.history),
              { role: "user", content: input.question },
            ],
          });
          const content = response.choices[0]?.message?.content;
          const answer = typeof content === "string"
            ? content.trim()
            : Array.isArray(content)
              ? content.filter((block) => block.type === "text").map((block) => block.text).join("\n").trim()
              : "";
          if (!answer) {
            return { answer: getFallbackPortfolioAnswer(input.question) };
          }

          logger.info("PortfolioAssistant", "Answered visitor question", {
            model,
            historyLength: input.history.length,
          });

          return { answer };
        } catch (error) {
          logger.warn("PortfolioAssistant", "Upstream model issue; returning grounded knowledge base answer", error);
          const answer = getFallbackPortfolioAnswer(input.question);
          return { answer };
        }
      }),
  }),

  assistantFollowUp: router({
    request: publicProcedure.input(assistantFollowUpInput).mutation(async ({ input, ctx }) => {
      enforceRateLimit(ctx.req, {
        actionName: "assistant follow-up",
        maxRequests: 5,
        windowMs: 15 * 60 * 1000,
      });

      const formAgeMs = Date.now() - input.startedAt;
      if (input.website.trim().length > 0 || formAgeMs < MIN_FORM_COMPLETION_MS || formAgeMs > 1000 * 60 * 60 * 6) {
        logger.info("AssistantFollowUp", "Screened bot/spam follow-up request");
        return { success: true };
      }
      try {
        await createAssistantFollowUp({ email: input.email });
      } catch (dbError) {
        logger.warn("AssistantFollowUp", "Database storage skipped (DATABASE_URL not set)", dbError);
      }
      try {
        await notifyOwner({
          title: "Portfolio assistant follow-up request",
          content: `A portfolio assistant visitor asked for a follow-up.\nEmail: ${input.email}`,
        });
      } catch (notifyError) {
        logger.warn("AssistantFollowUp", "Owner notification skipped", notifyError);
      }
      logger.info("AssistantFollowUp", `Saved follow-up request for: ${input.email}`);
      return { success: true };
    }),
  }),

  admin: router({
    leads: adminProcedure.query(async () => {
      try {
        const [inquiries, followUps] = await Promise.all([listProjectInquiries(), listAssistantFollowUps()]);
        return { inquiries, followUps };
      } catch (err) {
        logger.warn("AdminLeads", "Could not fetch leads from database", err);
        return { inquiries: [], followUps: [] };
      }
    }),
  }),

  projectInquiry: router({
    submit: publicProcedure.input(projectInquiryInput).mutation(async ({ input, ctx }) => {
      enforceRateLimit(ctx.req, {
        actionName: "project inquiry submission",
        maxRequests: 5,
        windowMs: 15 * 60 * 1000,
      });

      const formAgeMs = Date.now() - input.startedAt;
      if (input.website.trim().length > 0 || formAgeMs < MIN_FORM_COMPLETION_MS || formAgeMs > 1000 * 60 * 60 * 6) {
        // Return success without persistence, so automation does not receive a useful signal.
        logger.info("ProjectInquiry", "Screened bot/spam project inquiry submission");
        return { success: true };
      }
      try {
        await createProjectInquiry({
          name: input.name,
          email: input.email,
          company: input.company || null,
          projectType: input.projectType,
          budget: input.budget,
          timeline: input.timeline,
          details: input.details,
        });
      } catch (dbError) {
        logger.warn("ProjectInquiry", "Database storage skipped (DATABASE_URL not set)", dbError);
      }
      try {
        await notifyOwner({
          title: `New project inquiry: ${input.projectType}`,
          content: `${input.name} (${input.email})\nBudget: ${input.budget}\nTimeline: ${input.timeline}\n\n${input.details}`,
        });
      } catch (notifyError) {
        logger.warn("ProjectInquiry", "Owner notification skipped", notifyError);
      }
      logger.info("ProjectInquiry", `Received project inquiry from ${input.name} (${input.email}) [${input.projectType}]`);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
