import { spawnSync } from "node:child_process";
import * as esbuild from "esbuild";

// A local .env can set NODE_ENV=development for the dev server. Never let that
// select React's development runtime in a release bundle or prerender build.
const environment = { ...process.env, NODE_ENV: "production" };
const steps = [
  ["node_modules/vite/bin/vite.js", "build"],
  [
    "node_modules/vite/bin/vite.js",
    "build",
    "--ssr",
    "src/entry-server.tsx",
    "--outDir",
    "../dist/ssr",
  ],
  ["scripts/prerender.mjs"],
];

for (const args of steps) {
  const result = spawnSync(process.execPath, args, {
    env: environment,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

await esbuild.build({
  entryPoints: ["server/api.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outfile: "api/index.js",
});
console.log("Built api/index.js with esbuild");

await esbuild.build({
  entryPoints: ["server/_core/index.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outdir: "dist",
});
console.log("Built dist/index.js with esbuild");
