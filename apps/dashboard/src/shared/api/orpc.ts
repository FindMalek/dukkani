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
    const { queryClient, client, orpc } = createORPCClientUtils<AppRouter>(
      getApiUrl(env.NEXT_PUBLIC_API_URL),
    );
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
