import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/projects/finsight",
  "/projects/ai-code-review-agent",
  "/projects/factscope-ai",
];

test.beforeEach(async ({ page }) => {
  // UI verification must not contact providers or persist actual leads.
  await page.route("**/api/trpc/**", async route => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([{ result: { data: { json: null } } }]),
    });
  });
});

async function assertNoOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1
    )
  ).toBe(true);
}

for (const width of [360, 390, 768, 1440]) {
  test(`homepage and case studies fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (
        message.type() === "error" &&
        /hydration|hydrated|react error/i.test(message.text())
      )
        errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await assertNoOverflow(page);
      if (route === "/") await page.locator("#work").scrollIntoViewIfNeeded();
      await expect(page.locator("main img").first()).toHaveJSProperty(
        "complete",
        true
      );
      expect(
        await page
          .locator("main img")
          .first()
          .evaluate((image: HTMLImageElement) => image.naturalWidth)
      ).toBeGreaterThan(0);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({
        path: `.cache/browser/${width}-${route === "/" ? "home" : route.split("/").at(-1)}.png`,
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });
}

test("case-study links, refresh, back, and unknown URLs", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore the case study — FinSight" })
    .click();
  await expect(page).toHaveURL(/\/projects\/finsight$/);
  await page.reload();
  await expect(page.locator("h1")).toHaveText("FinSight");
  await page.goBack();
  await expect(page.locator("h1")).toContainText("Useful intelligence");
  for (const route of routes) {
    const response = await request.get(route);
    const html = await response.text();
    expect(html).toContain('data-prerendered="true"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("<h1");
  }
  const missing = await page.goto("/projects/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow"
  );
});

test("guided scenarios expose denial, clean scope, and degraded freshness", async ({
  page,
}) => {
  await page.goto("/#lab");
  const lab = page.locator("#lab");
  await lab.getByLabel("Choose a scenario").selectOption("restricted");
  await expect(
    lab.getByRole("button", { name: "Previous workflow step" })
  ).toBeDisabled();
  await lab.getByRole("button", { name: "Next step" }).click();
  await expect(lab.locator(".explorer-outcome")).toContainText("Access denied");
  await expect(lab.getByRole("button", { name: "Next step" })).toBeDisabled();
  await lab.getByRole("tab", { name: "AI Code Review Agent" }).focus();
  await page.keyboard.press("Enter");
  await lab.getByLabel("Choose a scenario").selectOption("clean");
  await lab.getByRole("button", { name: "Next step" }).click();
  await expect(lab.locator(".explorer-outcome")).toContainText(
    "does not certify"
  );
  await lab.getByLabel("Choose a scenario").selectOption("unverified");
  await expect(lab.locator(".explorer-detail .eyebrow")).toHaveText(
    "Step 1 / 3"
  );
  await lab.getByRole("tab", { name: "Factscope AI" }).click();
  await lab.getByLabel("Choose a scenario").selectOption("fallback");
  await lab.getByRole("button", { name: "Next step" }).click();
  await lab.getByRole("button", { name: "Next step" }).click();
  await expect(lab.locator(".explorer-outcome")).toContainText(
    "fresh verification is not implied"
  );
});

test("mobile navigation closes with Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page
      .locator("#primary-navigation")
      .getByRole("link", { name: "Work", exact: true })
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .locator("#primary-navigation")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#contact")).toBeInViewport();
});

test("assistant dialog traps focus, provides context, and restores the trigger", async ({
  page,
}) => {
  await page.goto("/projects/finsight");
  const trigger = page.getByRole("button", { name: "Ask about my work" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByText("How does FinSight work?", { exact: true })
  ).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close", exact: true })
  ).toBeFocused();
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate(element => element.contains(document.activeElement))
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("video loads only on activation and provides an unavailable state", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", request => {
    if (request.url().endsWith(".mp4")) requests.push(request.url());
  });
  await page.route("**/*.mp4", route => route.abort());
  await page.goto("/projects/finsight");
  expect(requests).toEqual([]);
  await page
    .getByRole("button", { name: /Watch the FinSight walkthrough/i })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText(/could not be loaded/i)
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("inquiry errors preserve drafts and a retry confirms the saved request", async ({
  page,
}) => {
  let fail = true;
  await page.route("**/api/trpc/projectInquiry.submit**", route =>
    route.fulfill({
      status: fail ? 500 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        fail
          ? [
              {
                error: {
                  json: {
                    message: "Storage unavailable",
                    code: -32603,
                    data: {
                      code: "INTERNAL_SERVER_ERROR",
                      httpStatus: 500,
                      path: "projectInquiry.submit",
                    },
                  },
                },
              },
            ]
          : [{ result: { data: { json: { success: true } } } }]
      ),
    })
  );
  await page.goto("/?service=finsight#contact");
  const brief =
    "A support assistant for our policies and documentation, with source-aware answers.";
  await page.getByLabel("Your name").fill("Test Client");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("What are you hoping to build?").fill(brief);
  await expect(page.getByLabel("Project type", { exact: true })).toHaveValue(
    "RAG knowledge system"
  );
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Your inquiry wasn’t saved"
  );
  await expect(page.getByLabel("What are you hoping to build?")).toHaveValue(
    brief
  );
  await expect(page.getByRole("alert").getByRole("link")).toHaveAttribute(
    "href",
    "mailto:hamza1713@gmail.com"
  );
  fail = false;
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page).toHaveURL(/\/thank-you$/);
});

test("public pages and assistant have no automated accessibility violations", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.getByRole("button", { name: "Ask about my work" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByLabel("Your question for the portfolio assistant")
  ).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations
  ).toEqual([]);
});

test("owner storage outages stay visible and consent-based follow-ups retain email on error", async ({
  page,
}) => {
  await page.route("**/api/trpc/auth.me**", route =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([
        {
          result: {
            data: { json: { id: 1, role: "admin", name: "Hamza Ali" } },
          },
        },
      ]),
    })
  );
  await page.route("**/api/trpc/admin.leads**", route =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify([
        {
          error: {
            json: {
              message: "Lead records unavailable",
              code: -32603,
              data: {
                code: "INTERNAL_SERVER_ERROR",
                httpStatus: 500,
                path: "admin.leads",
              },
            },
          },
        },
      ]),
    })
  );
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: "Lead records are unavailable." })
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("No project inquiries yet.")).not.toBeVisible();
  let fail = true;
  await page.route("**/api/trpc/assistantFollowUp.request**", route =>
    route.fulfill({
      status: fail ? 500 : 200,
      contentType: "application/json",
      body: JSON.stringify(
        fail
          ? [
              {
                error: {
                  json: {
                    message: "Storage unavailable",
                    code: -32603,
                    data: {
                      code: "INTERNAL_SERVER_ERROR",
                      httpStatus: 500,
                      path: "assistantFollowUp.request",
                    },
                  },
                },
              },
            ]
          : [{ result: { data: { json: { success: true } } } }]
      ),
    })
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about my work" }).click();
  await page
    .getByRole("button", { name: "Want a follow-up from Hamza?" })
    .click();
  const email = page
    .getByRole("dialog")
    .getByRole("textbox", { name: /Want Hamza to follow up/ });
  await email.fill("visitor@example.com");
  await page
    .getByRole("button", { name: "Request follow-up", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "wasn’t saved"
  );
  await expect(email).toHaveValue("visitor@example.com");
  fail = false;
  await page
    .getByRole("button", { name: "Request follow-up", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "Follow-up request saved"
  );
});

test("clipboard failures provide feedback without false confirmation", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () =>
          Promise.reject(new Error("Clipboard permission unavailable")),
      },
    })
  );
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Use the email link" })
  ).toBeVisible();
});

test("touch controls and local video playback work", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:4173/projects/finsight");
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await expect(
    page.getByRole("button", { name: "Close navigation" })
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Close navigation" }).tap();
  await page
    .getByRole("button", { name: /Watch the FinSight walkthrough/ })
    .tap();
  await expect(page.getByRole("dialog").locator("video")).toHaveJSProperty(
    "controls",
    true
  );
  await expect
    .poll(
      () =>
        page
          .locator("video")
          .evaluate((video: HTMLVideoElement) => video.currentTime),
      { timeout: 15_000 }
    )
    .toBeGreaterThan(0);
  await assertNoOverflow(page);
  await context.close();
});

test("reduced motion and 200% reflow keep essential controls available", async ({
  browser,
}) => {
  // A 720 CSS-pixel viewport at 2x density models 200% reflow on a 1440px display.
  const context = await browser.newContext({
    viewport: { width: 720, height: 450 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await assertNoOverflow(page);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    )
  ).toBe("auto");
  expect(
    await page.locator('meta[name="viewport"]').getAttribute("content")
  ).not.toMatch(/maximum-scale|user-scalable=no/);
  await page.locator("#lab").scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: "Next step" })).toBeVisible();
  await context.close();
});
