import { getApiUrl } from "@dukkani/env/get-api-url";
import type {
  AppRouter,
  StorefrontRouterClient,
} from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";
import { QueryClient } from "@tanstack/react-query";
import { env } from "@/env";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: (failureCount) =>
          Math.min(2000 * Math.pow(2, failureCount - 1), 30 * 1000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}

type StorefrontScopedUtils = {
  queryClient: QueryClient;
  client: StorefrontRouterClient;
  orpc: ReturnType<typeof createORPCClientUtils<AppRouter>>["orpc"]["storefront"];
};

let orpcClient: StorefrontScopedUtils | null = null;

function getORPCClient(): StorefrontScopedUtils {
  if (!orpcClient) {
    const { queryClient, client, orpc } = createORPCClientUtils<AppRouter>(
      getApiUrl(env.NEXT_PUBLIC_API_URL),
    );
    orpcClient = {
      queryClient,
      client: client.storefront as StorefrontRouterClient,
      orpc: orpc.storefront,
    };
  }
  return orpcClient;
}

export const client: StorefrontRouterClient = getORPCClient().client;
export const queryClient = getORPCClient().queryClient;
export const orpc = getORPCClient().orpc;

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
