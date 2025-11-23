import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Load .env from root of monorepo (only on server side)
// Next.js automatically loads .env files, but we need to load from monorepo root
// This code only runs on the server - client code should never execute this
if (typeof process !== "undefined" && process.versions?.node) {
	try {
		const path = await import("node:path");
		const { fileURLToPath } = await import("node:url");
		const dotenv = await import("dotenv");

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		
		// Only load .env file in development, not in production (Vercel)
		if (process.env.NODE_ENV !== "production") {
			dotenv.config({
				path: path.resolve(__dirname, "../../../.env"),
			});
		}
	} catch {
		// Ignore errors in environments where Node.js APIs aren't available
	}
}

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(["development", "production", "local"])
			.default("local"),
		NEXT_PUBLIC_DASHBOARD_URL: z.url().default("http://localhost:3003"),
		NEXT_PUBLIC_WEB_URL: z.url().default("http://localhost:3001"),
		NEXT_PUBLIC_CORS_ORIGIN: z.url().default("http://localhost:3002"),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
