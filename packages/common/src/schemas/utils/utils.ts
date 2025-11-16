import { z } from "zod";

/**
 * Utility schemas for common types and environment validation
 */

export const environmentServerSchema = z.object({
	DATABASE_URL: z.string().min(1).url(),
	NODE_ENV: z.enum(["development", "production", "local"]),
});

export const environmentClientSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.url().optional(),
});

export type EnvironmentServer = z.infer<typeof environmentServerSchema>;
export type EnvironmentClient = z.infer<typeof environmentClientSchema>;
