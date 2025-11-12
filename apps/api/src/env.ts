import { env as authEnv } from "@dukkani/auth/env";
import { env as baseEnv } from "@dukkani/env";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
	extends: [baseEnv, authEnv],
	server: {
		// Server-specific env vars can be added here if needed
	},
	client: {
		// Client-side env vars can be added here if needed
		// Prefix with NEXT_PUBLIC_ for client-side access
	},
	runtimeEnv: {
		// Server vars from base env
		DATABASE_URL: process.env.DATABASE_URL,
		// Server vars from auth env
		CORS_ORIGIN: process.env.CORS_ORIGIN,
		// Add any client vars here with NEXT_PUBLIC_ prefix
	},
	emptyStringAsUndefined: true,
});
