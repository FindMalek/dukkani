import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Storefront app environment configuration
 * Uses @t3-oss/env-nextjs which automatically loads .env.local files
 * This ensures Next.js environment variables are loaded before validation
 * Includes base env variables (DATABASE_URL, NEXT_PUBLIC_NODE_ENV, NEXT_PUBLIC_CORS_ORIGIN, NEXT_PUBLIC_ALLOWED_ORIGIN)
 * and storefront-specific variables (NEXT_PUBLIC_STORE_DOMAIN)
 */
export const storefrontEnv = createEnv({
	server: {
		DATABASE_URL: z.url(),
		TELEGRAM_BOT_NAME: z.string(),
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(["development", "production", "local"])
			.default("local")
			.transform((val) => {
				// Map Vercel's preview environment to development
				if (process.env.VERCEL_ENV === "preview") return "development";
				return val;
			}),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
        NEXT_PUBLIC_ALLOWED_ORIGIN: z.string().refine(
            (val) => {
                // Allow literal "*"
                if (val === "*") return true;
                
                // Allow valid URLs
                try {
                    new URL(val);
                    return true;
                } catch {
                    // Not a URL, check if it's a wildcard pattern
                }
                
                // Allow wildcard patterns like *.domain.com
                if (val.includes("*")) {
                    const safePatternRegex =
                        /^\*?\.?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return safePatternRegex.test(val);
                }
                
                return false;
            },
            {
                message:
                    "NEXT_PUBLIC_ALLOWED_ORIGIN must be '*', a valid URL, or a wildcard pattern like *.domain.com",
            },
        ),
        NEXT_PUBLIC_STORE_DOMAIN: z.string().refine((val) => val.includes("."), {
            message: "NEXT_PUBLIC_STORE_DOMAIN must be a valid domain name.",
        }),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		TELEGRAM_BOT_NAME: process.env.TELEGRAM_BOT_NAME,
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN,
		NEXT_PUBLIC_ALLOWED_ORIGIN: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN,
		NEXT_PUBLIC_STORE_DOMAIN: process.env.NEXT_PUBLIC_STORE_DOMAIN,
	},
	emptyStringAsUndefined: true,
});
