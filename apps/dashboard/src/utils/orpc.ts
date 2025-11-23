import { env } from "@dukkani/env";
import { createORPCClientUtils } from "@dukkani/orpc/client";

// Debug logging (remove after confirming it works)
console.log("🔍 CORS_ORIGIN:", env.NEXT_PUBLIC_CORS_ORIGIN);
console.log("🔍 VERCEL:", process.env.VERCEL);
console.log("🔍 VERCEL_ENV:", process.env.VERCEL_ENV);

export const { queryClient, client, orpc } = createORPCClientUtils(
	env.NEXT_PUBLIC_CORS_ORIGIN,
);
