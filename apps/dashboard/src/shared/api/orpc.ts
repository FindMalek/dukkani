import { getApiUrl } from "@dukkani/env/get-api-url";
import type { AppRouter, DashboardRouterClient } from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { env } from "@/env";

type DashboardScopedUtils = {
  queryClient: QueryClient;
  client: DashboardRouterClient;
  orpc: ReturnType<
    typeof createORPCClientUtils<AppRouter>
  >["orpc"]["dashboard"];
};

let orpcClient: DashboardScopedUtils | null = null;

function getORPCClient(): DashboardScopedUtils {
  if (!orpcClient) {
    // Browser: the page's own origin, so requests go through the
    // dashboard's own domain, proxied to the API by the rewrite in
    // next.config.ts — keeps the session cookie first-party. See #572.
    // (RPCLink does `new URL(baseUrl)` internally with no base argument,
    // so this has to be an absolute URL — a relative "" throws.)
    // Server: absolute API URL, since Node's fetch can't resolve a
    // relative URL either, and this path already forwards the incoming
    // request's cookies itself (see the `headers()` option below).
    const apiUrl =
      typeof window === "undefined"
        ? getApiUrl(env.NEXT_PUBLIC_API_URL)
        : window.location.origin;
    const { queryClient, client, orpc } =
      createORPCClientUtils<AppRouter>(apiUrl);
    orpcClient = {
      queryClient,
      client: client.dashboard as DashboardRouterClient,
      orpc: orpc.dashboard,
    };
  }
  return orpcClient;
}

/**
 * Create a new QueryClient instance.
 *
 * Pass an `onError` callback to attach a global QueryCache error handler
 * (e.g. showing a toast). On the server, omit it — toasts are client-only.
 *
 * Always call this from `useState` in providers, never as a module singleton:
 *   const [qc] = useState(() => makeQueryClient((err) => toast.error(err.message)))
 */
export function makeQueryClient(onError?: (error: Error) => void) {
  return new QueryClient({
    queryCache: onError ? new QueryCache({ onError }) : undefined,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (failureCount) =>
          Math.min(2000 * Math.pow(2, failureCount - 1), 30 * 1000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}

export const client: DashboardRouterClient =
  globalThis.$orpcClient ?? getORPCClient().client;

export const orpc = getORPCClient().orpc;
