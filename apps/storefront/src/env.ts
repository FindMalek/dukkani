import { storefrontEnv } from "@dukkani/env/presets/storefront";

/**
 * Storefront app environment configuration
 * Thin wrapper around storefrontEnv preset
 *
 * Note: Root .env is loaded in next.config.ts (Node.js context only)
 * This ensures env vars are available during build and runtime
 */
export const env = storefrontEnv;
