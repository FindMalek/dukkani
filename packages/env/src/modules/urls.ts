import { z } from "zod";

/**
 * URLs module - defines application URL configuration
 * Used by apps for CORS, redirects, and domain configuration
 */
export const urlsModule = {
	client: {
		NEXT_PUBLIC_WEB_URL: z.url(),
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
		NEXT_PUBLIC_STORE_DOMAIN: z.string().refine(
			(val) => {
				// Allow localhost domains (for local development)
				if (val.startsWith("localhost")) {
					return true;
				}
				// Allow domains with dots (production domains)
				return val.includes(".");
			},
			{
				message:
					"NEXT_PUBLIC_STORE_DOMAIN must be a valid domain name (e.g., 'example.com') or localhost (e.g., 'localhost:3000').",
			},
		),
	},
} as const;
