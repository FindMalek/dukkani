import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Web app environment configuration
 * Uses @t3-oss/env-nextjs which automatically loads .env.local files
 * This ensures Next.js environment variables are loaded before validation
 */
export const webEnv = createEnv({
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
	},
	emptyStringAsUndefined: true,
});

