import { getApiUrl } from "@dukkani/env/get-api-url";
import type { AppRouterClient } from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";
import { QueryClient } from "@tanstack/react-query";
import { env } from "@/env";

// Lazy ORPC client creation - only create when accessed
let orpcClient: ReturnType<typeof createORPCClientUtils> | null = null;

function getORPCClient() {
  if (!orpcClient) {
    orpcClient = createORPCClientUtils(getApiUrl(env.NEXT_PUBLIC_API_URL));
  }
  return orpcClient;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (failureCount) =>
          Math.min(Math.pow(2 * 1000, failureCount - 1), 30 * 1000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}
// Use server-side client during SSR, fallback to client-side client
export const client: AppRouterClient =
  globalThis.$orpcClient ?? getORPCClient().client;

export const queryClient = getORPCClient().queryClient;
const orpc = getORPCClient().orpc;

export { orpc as api };
