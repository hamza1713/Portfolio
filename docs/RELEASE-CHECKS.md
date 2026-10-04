# Redesign release checks

The redesign is ready for review locally before production publication. Deployment and live account configuration are separate release steps.

## Build and preview

Use Node 22.12+ or Node 24, install with `npm ci`, then run:

```sh
npm run check
npm test
npm run build
npm run test:browser
```

The browser suite starts the production Express server on port 4173. It covers the four public routes, refresh/back navigation, 404 responses, responsive layouts, scenario changes, dialog focus, media loading, inquiry success/failure, and accessibility scans. API responses are mocked for UI checks, so these tests do not create leads or contact providers.

For an interactive review, run the production server with `NODE_ENV=production`, then open `http://localhost:3000`. On PowerShell, use `$env:NODE_ENV = 'production'; npm start`.

## Before production

- Set `SITE_URL` to the real canonical origin. Vercel builds can instead use `VERCEL_PROJECT_PRODUCTION_URL`. Confirm canonical tags, social images, and sitemap URLs in generated HTML.
- Configure `DATABASE_URL` with durable MySQL/TiDB storage and apply the existing migrations. Submit a legitimate inquiry, verify it in `/admin`, and confirm owner access using the existing OAuth configuration.
- Test a storage outage: the form should retain its draft, show an error, and offer direct email. A notification outage after saving must not reject the saved inquiry.
- Confirm `JWT_SECRET`, `OWNER_OPEN_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, and `VITE_APP_ID`. The dashboard must reject non-owner accounts.
- Confirm email, LinkedIn, repository links, CV download, all three recordings, keyboard navigation, touch controls, reduced motion, and actual browser zoom at 200%.
- Set `VITE_CALENDLY_URL` only to a real event URL. The default is direct email.
- Leave both analytics flags off unless the account allowance is confirmed. Speed Insights and Web Analytics are independent flags; no paid service is required. See [Speed Insights allowances](https://vercel.com/docs/speed-insights/limits-and-pricing) and [Web Analytics allowances](https://vercel.com/docs/analytics/limits-and-pricing).
- Review a Vercel preview deployment before production. `vercel.json` preserves `/api`, serves prerendered project HTML, and returns a real 404 for unknown paths.

## Measurement

Record the preview URL, build commit, audit conditions, mobile Lighthouse score, LCP, CLS, and TBT. Lighthouse is a lab check; INP and real-user Core Web Vitals require field measurements. Targets: performance 90+, LCP ≤2.5s, CLS ≤0.1, field INP ≤200ms.

After 28 days, compare qualified contacts and project visits with an equivalent baseline if one exists. If there is no baseline or analytics allowance, use stored lead records and performance audits without claiming conversion improvement. No scheduled automation is installed.

## Evidence and media

Public facts live in `shared/portfolio.ts`; server-only assistant instructions consume those facts. Benchmarks retain sample size and precision, and case studies disclose limitations. Walkthrough frames are labeled as illustrative presentation material. See `client/public/assets/projects/README.md` for frame provenance.
