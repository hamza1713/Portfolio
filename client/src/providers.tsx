import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import { startLogin } from "./const";
export function AppProviders({ children }: { children: ReactNode }) {
  const [clients] = useState(() => {
    const queryClient = new QueryClient();
    const handleError = (error: unknown) => {
      if (
        typeof window !== "undefined" &&
        error instanceof TRPCClientError &&
        error.message === UNAUTHED_ERR_MSG
      )
        startLogin();
    };
    queryClient.getQueryCache().subscribe(event => {
      if (event.type === "updated" && event.action.type === "error")
        handleError(event.query.state.error);
    });
    queryClient.getMutationCache().subscribe(event => {
      if (event.type === "updated" && event.action.type === "error")
        handleError(event.mutation.state.error);
    });
    const trpcClient = trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          headers() {
            try {
              const raw = sessionStorage.getItem("manus-cookie");
              const prefix = `${COOKIE_NAME}=`;
              const pair = raw
                ?.split(";")
                .find(s => s.trim().startsWith(prefix));
              const token = pair?.trim().slice(prefix.length);
              if (token) return { Authorization: `Bearer ${token}` };
            } catch {
              /* Cookie credentials remain available. */
            }
            return {};
          },
          fetch(input, init) {
            return globalThis.fetch(input, { ...init, credentials: "include" });
          },
        }),
      ],
    });
    return { queryClient, trpcClient };
  });
  return (
    <trpc.Provider
      client={clients.trpcClient}
      queryClient={clients.queryClient}
    >
      <QueryClientProvider client={clients.queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
