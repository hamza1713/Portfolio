import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadEnv } from "vite";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const rawOrigin =
  env.SITE_URL ||
  env.VITE_SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000";
const origin = new URL(rawOrigin).origin;
if (!env.SITE_URL && !env.VITE_SITE_URL && !env.VERCEL_PROJECT_PRODUCTION_URL)
  console.warn(
    "Prerender: local canonical origin. Set SITE_URL or VITE_SITE_URL for a production build."
  );
const { render, publicRoutes, getPageMetadata } = await import(
  pathToFileURL(path.resolve("dist/ssr/entry-server.js")).href
);
const directory = path.resolve("dist/public");
const template = await readFile(path.join(directory, "index.html"), "utf8");
const fonts = (await readdir(path.join(directory, "assets"))).filter(name =>
  /^(inter-latin-wght-normal|dm-mono-latin-400-normal).*\.woff2$/.test(name)
);
const fontPreloads = fonts
  .map(
    name =>
      `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin />`
  )
  .join("\n");
await writeFile(
  path.join(directory, "app.html"),
  template.replace(
    "<!--page-meta-->",
    '<meta name="robots" content="noindex, nofollow" />'
  )
);
const escape = text =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of [...publicRoutes, "/404"]) {
  const meta = getPageMetadata(route);
  const url = new URL(meta.path, origin).href;
  const image = new URL(meta.image, origin).href;
  const tags = `<title>${escape(meta.title)}</title>\n<meta name="description" content="${escape(meta.description)}" />\n<meta name="robots" content="${meta.noindex ? "noindex, nofollow" : "index, follow"}" />\n<link rel="canonical" href="${escape(url)}" />\n<meta property="og:title" content="${escape(meta.title)}" />\n<meta property="og:description" content="${escape(meta.description)}" />\n<meta property="og:url" content="${escape(url)}" />\n<meta property="og:image" content="${escape(image)}" />\n<meta name="twitter:title" content="${escape(meta.title)}" />\n<meta name="twitter:description" content="${escape(meta.description)}" />\n<meta name="twitter:image" content="${escape(image)}" />`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/, "")
    .replace("<!--page-meta-->", tags + "\n" + fontPreloads)
    .replace('<div id="root">', '<div id="root" data-prerendered="true">')
    .replace("<!--app-html-->", render(route));
  const target = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  await mkdir(path.dirname(path.join(directory, target)), { recursive: true });
  await writeFile(path.join(directory, target), html);
  console.log(`Prerendered ${route}`);
}
await writeFile(
  path.join(directory, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map(route => `<url><loc>${escape(new URL(route, origin).href)}</loc></url>`).join("")}</urlset>`
);
await writeFile(
  path.join(directory, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /thank-you\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`
);
