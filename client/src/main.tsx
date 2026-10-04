import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "./index.css";
import App from "./App";
import { AppProviders } from "./providers";
const root = document.getElementById("root")!;
const app = (
  <AppProviders>
    <Router>
      <App />
    </Router>
  </AppProviders>
);
if (root.hasChildNodes() && root.dataset.prerendered === "true")
  hydrateRoot(root, app);
else createRoot(root).render(app);
// A separate root keeps optional telemetry out of the prerendered app tree.
if (
  import.meta.env.PROD &&
  (import.meta.env.VITE_SPEED_INSIGHTS === "true" ||
    import.meta.env.VITE_WEB_ANALYTICS === "true")
) {
  const telemetry = document.createElement("div");
  document.body.appendChild(telemetry);
  createRoot(telemetry).render(
    <>
      {import.meta.env.VITE_SPEED_INSIGHTS === "true" && (
        <SpeedInsights
          beforeSend={event =>
            /\/(admin|thank-you)/.test(event.url) ? null : event
          }
        />
      )}
      {import.meta.env.VITE_WEB_ANALYTICS === "true" && (
        <Analytics
          beforeSend={event =>
            /\/(admin|thank-you)/.test(event.url)
              ? null
              : { ...event, url: event.url.split("?")[0] }
          }
        />
      )}
    </>
  );
}
