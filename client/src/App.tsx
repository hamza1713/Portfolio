/* Signal / Proof direction: the app is a single editorial portfolio page with anchored navigation and no dead-end routes. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/thank-you" component={ThankYou} />
            <Route path="/" component={Home} />
            <Route component={Home} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
