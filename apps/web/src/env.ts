import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Web app environment configuration
 * Uses @t3-oss/env-nextjs which automatically loads .env.local files
 * This ensures Next.js environment variables are loaded before validation
 */
export const webEnv = createEnv({
	server: {
		BETTER_STACK_API_KEY: z.string().optional(),
		OTEL_SERVICE_NAME: z.string().default("dukkani-web"),
		OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1).default(1.0),
		OTEL_ENABLED: z.boolean().default(true),
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
		BETTER_STACK_API_KEY: process.env.BETTER_STACK_API_KEY,
		OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
		OTEL_SAMPLING_RATE: process.env.OTEL_SAMPLING_RATE,
		OTEL_ENABLED: process.env.OTEL_ENABLED,
	},
	emptyStringAsUndefined: true,
});