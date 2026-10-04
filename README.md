# Hamza Ali — Interactive AI Studio

A dark, responsive AI engineering portfolio with project case studies, browser-local architecture explorers, a grounded assistant, and reliable client inquiry handling.

## Stack and structure

- React 19, Vite, TypeScript, Tailwind, Radix UI, Wouter, self-hosted Inter and DM Mono.
- Express, tRPC, Drizzle, and MySQL/TiDB. Existing procedure names and input contracts are preserved.
- `shared/portfolio.ts`: typed public project, service, biography, and evidence content. The server derives assistant context from these facts.
- `client/src/pages`: homepage, three case studies, confirmation, owner dashboard, and Not Found.
- `scripts/prerender.mjs`: public HTML, metadata, sitemap, and robots generation.
- `scripts/generate-media.mjs`: optional responsive-image/share-art maintenance; generated assets are included in the repository.

## Local development

Use Node 22.12+ or Node 24. Run `npm ci`, copy `.env.example` to `.env`, and configure the values you need. Start with `npm run dev` at `http://localhost:3000`.

A database is optional for browsing. It is required for legitimate inquiries and assistant follow-ups: unavailable storage produces an error and an email fallback. The assistant can provide deterministic portfolio answers without a model key.

## Verification and production preview

```sh
npm run check
npm test
npm run build
npm run test:browser
```

Install the Chromium test browser with `npx playwright install chromium` if no browser is available. The browser suite starts a local production server and mocks API responses for interaction testing. An existing Chromium executable can be supplied using `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

For a review preview, set `NODE_ENV=production` and run `npm start`. The build generates contentful HTML for `/` and `/projects/finsight`, `/projects/ai-code-review-agent`, `/projects/factscope-ai`. Unknown routes return HTTP 404. `/admin` and `/thank-you` use the client app and are excluded from indexing.

Set `SITE_URL` or the Vercel production-domain variable before release. Booking and telemetry remain optional. See [release checks](docs/RELEASE-CHECKS.md) for storage, owner authentication, performance, preview deployment, and measurement details.

With the production preview running, use `npm run audit:performance` to save mobile Lighthouse reports for all four public pages in `.cache/lighthouse`. Set `CHROME_PATH` to an available Chromium executable if needed; `PREVIEW_URL` can point to a deployed preview. These are lab measurements, not field Core Web Vitals.

## Visitor experience

The homepage introduces the work, offers product walkthroughs and three guided system explorers, describes services/process, and provides client and recruiter contact paths. Examples use local fixtures and never execute a model or accept uploads.

Videos mount only after activation; below-fold images and assistant code are lazy-loaded. All public routes include distinct titles, canonical URLs, descriptions, and share images. Navigation, step controls, dialogs, and forms support keyboard use and reduced motion; zoom remains enabled.

## License

MIT
