import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Dashboard app environment configuration
 * Uses @t3-oss/env-nextjs which automatically loads .env.local files
 * This ensures Next.js environment variables are loaded before validation
 * Includes base env variables (DATABASE_URL, NEXT_PUBLIC_NODE_ENV, NEXT_PUBLIC_CORS_ORIGIN)
 * and dashboard-specific variables (NEXT_PUBLIC_DASHBOARD_URL)
 */
export const dashboardEnv = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_STACK_API_KEY: z.string().optional(),
		OTEL_SERVICE_NAME: z.string().default("dukkani-dashboard"),
		OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1).default(1.0),
		OTEL_ENABLED: z.boolean().default(true),
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(["development", "production", "local"])
			.default("local")
			.transform((val) => {
				// Map Vercel's preview environment to development
				if (process.env.VERCEL_ENV === "preview") return "development";
				return val;
			}),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN,
		NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
		BETTER_STACK_API_KEY: process.env.BETTER_STACK_API_KEY,
		OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
		OTEL_SAMPLING_RATE: process.env.OTEL_SAMPLING_RATE,
		OTEL_ENABLED: process.env.OTEL_ENABLED,
	},
	emptyStringAsUndefined: true,
});