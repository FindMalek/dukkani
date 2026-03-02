import { getApiUrl } from "@dukkani/env";
import type { AppRouterClient } from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";

// Lazy ORPC client creation - only create when accessed
let orpcClient: ReturnType<typeof createORPCClientUtils> | null = null;

function getORPCClient() {
	if (!orpcClient) {
		orpcClient = createORPCClientUtils(getApiUrl());
	}
	return orpcClient;
}

// Use server-side client during SSR, fallback to client-side client
export const client: AppRouterClient =
	globalThis.$orpcClient ?? getORPCClient().client;

export const queryClient = getORPCClient().queryClient;
export const orpc = getORPCClient().orpc;
