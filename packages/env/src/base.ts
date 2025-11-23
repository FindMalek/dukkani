import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Base environment with shared variables used across all apps/packages
 * This is the foundation that all presets extend from
 *
 * Separated into its own file to avoid circular dependencies when presets
 * import baseEnv and index.ts exports all presets
 */
export const baseEnv = createEnv({
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
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
