import { dbEnv } from "@dukkani/env/presets/db";

/**
 * DB package environment
 * Uses dbEnv preset which only includes server-side variables
 */
export const env = dbEnv;
