import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: ".cache/browser-results",
  workers: 1,
  timeout: 45_000,
  use: {
    baseURL: "http://localhost:4173",
    browserName: "chromium",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node dist/index.js",
    url: "http://localhost:4173",
    env: { NODE_ENV: "production", PORT: "4173" },
    reuseExistingServer: !process.env.CI,
  },
});
