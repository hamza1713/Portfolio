import express, { type Express } from "express";
import compression from "compression";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { publicRoutes } from "../../shared/seo";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(compression());
  app.use(express.static(distPath));

  app.use("*", (req, res) => {
    // Express strips the wildcard mount from req.path; preserve the requested URL.
    const route = req.originalUrl.split("?")[0].replace(/\/$/, "") || "/";
    if (publicRoutes.includes(route))
      return res.sendFile(
        path.resolve(
          distPath,
          route === "/" ? "index.html" : `${route.slice(1)}.html`
        )
      );
    if (route === "/admin" || route === "/thank-you")
      return res
        .set("X-Robots-Tag", "noindex, nofollow")
        .sendFile(path.resolve(distPath, "app.html"));
    res.status(404).sendFile(path.resolve(distPath, "404.html"));
  });
}
