import type { AppRouterClient } from "@dukkani/orpc";
import { createORPCClientUtils } from "@dukkani/orpc/client";
import { env } from "@/env";

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
