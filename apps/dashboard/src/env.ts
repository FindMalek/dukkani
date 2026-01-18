import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dashboardEnv } from "@dukkani/env/presets/dashboard";

// Load root .env file before validation
if (!process.env.VERCEL) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const rootEnvPath = path.resolve(__dirname, "../../../../.env");
	config({ path: rootEnvPath });
}

/**
 * Dashboard app environment configuration
 * Thin wrapper around dashboardEnv preset
 * Root .env is loaded above before preset validation
 */
export const env = dashboardEnv;
