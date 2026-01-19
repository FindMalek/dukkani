import { z } from "zod";

/**
 * Database module - defines DATABASE_URL schema
 * Used by all apps/packages that need database access
 */
export const dbModule = {
	server: {
		DATABASE_URL: z.url(),
	},
} as const;
