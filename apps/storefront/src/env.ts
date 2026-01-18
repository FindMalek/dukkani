import path from "node:path";
import { fileURLToPath } from "node:url";
import { storefrontEnv } from "@dukkani/env/presets/storefront";
import { config } from "dotenv";

// Load root .env file before validation
// In Vercel/production, env vars are injected directly
if (!process.env.VERCEL) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const rootEnvPath = path.resolve(__dirname, "../../../../.env");
	config({ path: rootEnvPath });
}

/**
 * Storefront app environment configuration
 * Thin wrapper around storefrontEnv preset
 * Root .env is loaded above before preset validation
 */
export const env = storefrontEnv;
