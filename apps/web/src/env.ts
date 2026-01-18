import path from "node:path";
import { fileURLToPath } from "node:url";
import { webEnv } from "@dukkani/env/presets/web";
import { config } from "dotenv";

// Load root .env file before validation
if (!process.env.VERCEL) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const rootEnvPath = path.resolve(__dirname, "../../../../.env");
	config({ path: rootEnvPath });
}

/**
 * Web app environment configuration
 * Thin wrapper around webEnv preset
 * Root .env is loaded above before preset validation
 */
export const env = webEnv;
