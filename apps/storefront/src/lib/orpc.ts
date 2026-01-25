import type { AppRouterClient } from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";
import { QueryClient } from "@tanstack/react-query";
import { env } from "@/env";

// Create a function to make a new query client
// This is important for SSR - each request should have its own client
export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000, // 1 minute
				gcTime: 5 * 60 * 1000, // 5 minutes
				retry: 3,
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
			},
		},
	});
}

// Lazy ORPC client creation - only create when accessed
let orpcClient: ReturnType<typeof createORPCClientUtils> | null = null;

function getORPCClient() {
	if (!orpcClient) {
		orpcClient = createORPCClientUtils(env.NEXT_PUBLIC_API_URL);
	}
	return orpcClient;
}

export const client: AppRouterClient = getORPCClient().client;
export const queryClient = getORPCClient().queryClient;
export const orpc = getORPCClient().orpc;

// For SSR - create a new query client per request
let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient();
	}
	return browserQueryClient;
}
