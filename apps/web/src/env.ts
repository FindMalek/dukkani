import { webEnv } from "@dukkani/env/presets/web";

/**
 * Web app environment configuration
 * Thin wrapper around webEnv preset
 * Root .env is loaded in next.config.ts
 */
export const env = webEnv;