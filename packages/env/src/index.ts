import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Handle environment loading for different platforms
if (typeof process !== "undefined" && process.versions?.node) {
	try {
		const path = await import("node:path");
		const { fileURLToPath } = await import("node:url");
		const dotenv = await import("dotenv");

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		// Detect Vercel environments (production, preview, development)
		const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

		// Only load .env in local development (not Vercel)
		if (!isVercel) {
			dotenv.config({
				path: path.resolve(__dirname, "../../../.env"),
			});
		}
		// In Vercel, environment variables are injected automatically
	} catch {
		// Ignore errors in environments where Node.js APIs aren't available
	}
}

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production", "local"]),
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
		NEXT_PUBLIC_WEB_URL: z.url(),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
