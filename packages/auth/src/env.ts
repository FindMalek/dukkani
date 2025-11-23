import { baseEnv } from "@dukkani/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Auth package environment
 * Extends base env with auth-specific server variables
 * Also includes NEXT_PUBLIC_DASHBOARD_URL for trustedOrigins
 */
export const env = createEnv({
	extends: [baseEnv],
	server: {
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		FACEBOOK_CLIENT_ID: z.string(),
		FACEBOOK_CLIENT_SECRET: z.string(),
		BETTER_AUTH_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
