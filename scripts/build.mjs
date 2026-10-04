import { spawnSync } from "node:child_process";

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
  [
    "node_modules/esbuild/bin/esbuild",
    "server/api.ts",
    "--platform=node",
    "--packages=external",
    "--bundle",
    "--format=esm",
    "--outfile=api/index.js",
  ],
  [
    "node_modules/esbuild/bin/esbuild",
    "server/_core/index.ts",
    "--platform=node",
    "--packages=external",
    "--bundle",
    "--format=esm",
    "--outdir=dist",
  ],
];
for (const args of steps) {
  const result = spawnSync(process.execPath, args, {
    env: environment,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
