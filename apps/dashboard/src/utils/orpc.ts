import { env } from "@dukkani/env";
import { createORPCClientUtils } from "@dukkani/orpc/client";

// Lazy ORPC client creation - only create when accessed
let orpcClient: ReturnType<typeof createORPCClientUtils> | null = null;

function getORPCClient() {
	if (!orpcClient) {
		console.log("🔧 Creating ORPC client with:", env.NEXT_PUBLIC_CORS_ORIGIN);
		orpcClient = createORPCClientUtils(env.NEXT_PUBLIC_CORS_ORIGIN);
	}
	return orpcClient;
}

export const queryClient = getORPCClient().queryClient;
export const client = getORPCClient().client;
export const orpc = getORPCClient().orpc;
