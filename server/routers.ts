import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createAssistantFollowUp, createProjectInquiry, listAssistantFollowUps, listProjectInquiries } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { logger } from "./_core/logger";
import { notifyOwner } from "./_core/notification";
import { enforceRateLimit } from "./_core/rateLimiter";
import { PORTFOLIO_SYSTEM_PROMPT, sanitizePortfolioHistory } from "./portfolioAssistant";
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
          if (!answer) throw new Error("Assistant returned no content");

          logger.info("PortfolioAssistant", "Answered visitor question", {
            model,
            historyLength: input.history.length,
          });

          return { answer };
        } catch (error) {
          if (error instanceof TRPCError) throw error;

          logger.error("PortfolioAssistant", "Unable to answer visitor question", error, {
            questionPreview: input.question.slice(0, 80),
          });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "The portfolio assistant is temporarily unavailable. Please email Hamza directly at hamza1713@gmail.com.",
          });
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
        await notifyOwner({
          title: "Portfolio assistant follow-up request",
          content: `A portfolio assistant visitor asked for a follow-up.\nEmail: ${input.email}`,
        });
        logger.info("AssistantFollowUp", `Saved follow-up request for: ${input.email}`);
        return { success: true };
      } catch (error) {
        logger.error("AssistantFollowUp", "Unable to store follow-up request", error, { email: input.email });
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to save follow-up request." });
      }
    }),
  }),

  admin: router({
    leads: adminProcedure.query(async () => {
      const [inquiries, followUps] = await Promise.all([listProjectInquiries(), listAssistantFollowUps()]);
      return { inquiries, followUps };
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
        await notifyOwner({
          title: `New project inquiry: ${input.projectType}`,
          content: `${input.name} (${input.email})\nBudget: ${input.budget}\nTimeline: ${input.timeline}\n\n${input.details}`,
        });
        logger.info("ProjectInquiry", `Received project inquiry from ${input.name} (${input.email}) [${input.projectType}]`);
        return { success: true };
      } catch (error) {
        logger.error("ProjectInquiry", "Unable to store project inquiry submission", error, {
          name: input.name,
          email: input.email,
          projectType: input.projectType,
        });
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to submit project inquiry." });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
