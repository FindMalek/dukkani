import { z } from "zod";

/**
 * Auth module - defines authentication provider credentials
 * Used by auth package and apps that need auth configuration
 */
export const authModule = {
	server: {
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		FACEBOOK_CLIENT_ID: z.string(),
		FACEBOOK_CLIENT_SECRET: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		APPLE_CLIENT_ID: z.string(),
		APPLE_CLIENT_SECRET: z.string(),
	},
} as const;
