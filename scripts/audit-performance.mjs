import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const origin = process.env.PREVIEW_URL || "http://localhost:3000";
const routes = [
  "/",
  "/projects/finsight",
  "/projects/ai-code-review-agent",
  "/projects/factscope-ai",
];
await mkdir(".cache/lighthouse", { recursive: true });
const summary = [];
for (const route of routes) {
  const name = route === "/" ? "home" : route.split("/").at(-1);
  const output = `.cache/lighthouse/${name}`;
  console.log(`Auditing ${new URL(route, origin).href}`);
  const result = spawnSync(
    process.execPath,
    [
      "node_modules/lighthouse/cli/index.js",
      new URL(route, origin).href,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      "--output=html",
      `--output-path=${output}`,
    ],
    { stdio: "inherit" }
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  const report = JSON.parse(await readFile(`${output}.report.json`, "utf8"));
  summary.push({
    route,
    lighthouse: report.lighthouseVersion,
    time: report.fetchTime,
    settings: report.configSettings,
    scores: Object.fromEntries(
      Object.entries(report.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ])
    ),
    lcpMs: report.audits["largest-contentful-paint"].numericValue,
    cls: report.audits["cumulative-layout-shift"].numericValue,
    tbtMs: report.audits["total-blocking-time"].numericValue,
  });
  console.log(
    `${route}: performance ${summary.at(-1).scores.performance}, LCP ${(summary.at(-1).lcpMs / 1000).toFixed(2)}s`
  );
}
await writeFile(
  ".cache/lighthouse/summary.json",
  JSON.stringify(summary, null, 2)
);
console.table(
  summary.map(item => ({
    Route: item.route,
    Performance: item.scores.performance,
    Accessibility: item.scores.accessibility,
    SEO: item.scores.seo,
    "LCP (s)": (item.lcpMs / 1000).toFixed(2),
    CLS: item.cls.toFixed(3),
    "TBT (ms)": Math.round(item.tbtMs),
  }))
);
