import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Base environment with shared server-side variables used across all apps/packages
 * This is the foundation that all presets extend from
 *
 * Note: Client-side variables (NEXT_PUBLIC_*) are defined in modules/client.ts
 * and modules/urls.ts to avoid duplication and ensure proper Next.js bundling
 *
 * Separated into its own file to avoid circular dependencies when presets
 * import baseEnv and index.ts exports all presets
 */
export const baseEnv = createEnv({
  server: {
    /**
     * Node.js environment
     * Values: production, development, test
     */
    NODE_ENV: z.enum(["production", "development", "test"]).optional(),

    /**
     * Pattern for CORS preview origins
     */
    CORS_PREVIEW_ORIGIN_PATTERN: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});

/**
 * Get the base Node.js environment
 */
export function getBaseEnvironment(): string {
  return process.env.NODE_ENV || "development";
}
