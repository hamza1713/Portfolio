import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { AppProviders } from "./providers";
export { publicRoutes, getPageMetadata } from "@shared/seo";
export function render(path: string) {
  return renderToString(
    <AppProviders>
      <Router ssrPath={path}>
        <App />
      </Router>
    </AppProviders>
  );
}
