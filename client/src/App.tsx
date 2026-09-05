/* Signal / Proof direction: the app is a single editorial portfolio page with anchored navigation and no dead-end routes. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Lazy-loaded: only the small slice of visitors who hit these routes (the
// owner checking /admin, a form submitter landing on /thank-you) should pay
// for their JS — everyone else just gets Home.
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={null}>
            <Switch>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/thank-you" component={ThankYou} />
              <Route path="/" component={Home} />
              <Route component={Home} />
            </Switch>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
