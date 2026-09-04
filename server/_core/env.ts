import "dotenv/config";

export const ENV = {
  get appId() { return process.env.VITE_APP_ID ?? ""; },
  get cookieSecret() { return process.env.JWT_SECRET ?? ""; },
  get databaseUrl() { return process.env.DATABASE_URL ?? ""; },
  get oAuthServerUrl() { return process.env.OAUTH_SERVER_URL ?? ""; },
  get ownerOpenId() { return process.env.OWNER_OPEN_ID ?? ""; },
  get isProduction() { return process.env.NODE_ENV === "production"; },
  get forgeApiUrl() { return process.env.BUILT_IN_FORGE_API_URL ?? ""; },
  get forgeApiKey() { return process.env.BUILT_IN_FORGE_API_KEY ?? ""; },
  get geminiApiKey() { return process.env.GEMINI_API_KEY ?? process.env.BUILT_IN_FORGE_API_KEY ?? ""; },
  get geminiModel() { return process.env.GEMINI_MODEL ?? "gemini/gemini-3.1-flash-lite-preview"; },
  get sentryDsn() { return process.env.SENTRY_DSN ?? ""; },
  get errorWebhook() { return process.env.ERROR_NOTIFICATION_WEBHOOK ?? ""; },
};
