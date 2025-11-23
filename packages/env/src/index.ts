import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// This package is validation-only - it does NOT load environment variables.
// Environment loading is handled by:
// - Next.js apps: automatically loads .env.local from app directory
// - Vercel: automatic injection into process.env
// - Other packages: should load their own env vars if needed

/**
 * Base environment with shared variables used across all apps/packages
 * This is the foundation that all presets extend from
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


export const env = baseEnv;
export * from "./presets";
