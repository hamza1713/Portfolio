import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PageMetadata } from "./components/PageMetadata";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <>
          <PageMetadata />
          <Suspense
            fallback={
              <div className="admin-state" role="status">
                Loading…
              </div>
            }
          >
            <Switch>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/thank-you" component={ThankYou} />
              <Route path="/projects/:slug">
                {params => <CaseStudy slug={params.slug} />}
              </Route>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
