import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Load .env from monorepo root in all environments
// Vercel environment variables will override .env values when set
if (typeof process !== "undefined" && process.versions?.node) {
	try {
		const path = await import("node:path");
		const { fileURLToPath } = await import("node:url");
		const dotenv = await import("dotenv");

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		// Always load .env from monorepo root
		// Vercel env vars will override these when set in dashboard
		dotenv.config({
			path: path.resolve(__dirname, "../../../.env"),
		});
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
