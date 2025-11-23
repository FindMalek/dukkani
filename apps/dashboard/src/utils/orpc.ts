import { dashboardEnv } from "@dukkani/env/presets/dashboard";
import { createORPCClientUtils } from "@dukkani/orpc/client";

// Lazy ORPC client creation - only create when accessed
let orpcClient: ReturnType<typeof createORPCClientUtils> | null = null;

function getORPCClient() {
	if (!orpcClient) {
		orpcClient = createORPCClientUtils(dashboardEnv.NEXT_PUBLIC_CORS_ORIGIN);
	}
	return orpcClient;
}

export const queryClient = getORPCClient().queryClient;
export const client = getORPCClient().client;
export const orpc = getORPCClient().orpc;
