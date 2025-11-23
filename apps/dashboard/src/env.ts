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
	},
	emptyStringAsUndefined: true,
});
