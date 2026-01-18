import { dashboardEnv } from "@dukkani/env/presets/dashboard";

/**
 * Dashboard app environment configuration
 * Thin wrapper around dashboardEnv preset
 * Root .env is loaded in next.config.ts
 */
export const env = dashboardEnv;