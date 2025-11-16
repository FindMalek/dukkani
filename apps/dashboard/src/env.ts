import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// Server-only env vars (not accessible in client)
		DATABASE_URL: z.url().optional(),
	},
	client: {
		// Client-side env vars - accessible in browser
		// NEXT_PUBLIC_CORS_ORIGIN needs to be accessible on client for API calls
		NEXT_PUBLIC_CORS_ORIGIN: z.url().default("http://localhost:3002"),
	},
	runtimeEnv: {
		// Server vars
		DATABASE_URL: process.env.DATABASE_URL,
		// Client vars (must have NEXT_PUBLIC_ prefix)
		NEXT_PUBLIC_CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN,
	},
	emptyStringAsUndefined: true,
});
