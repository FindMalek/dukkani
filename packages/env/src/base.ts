import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Base environment with shared variables used across all apps/packages
 * This is the foundation that all presets extend from
 *
 * Separated into its own file to avoid circular dependencies when presets
 * import baseEnv and index.ts exports all presets
 */
export const baseEnv = createEnv({
	server: {
		VERCEL_BRANCH_URL: z.string().optional(),
		VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
		VERCEL_REGION: z.string().optional(),
		VERCEL_DEPLOYMENT_ID: z.string().optional(),
		VERCEL_PROJECT_ID: z.string().optional(),
		VERCEL: z
			.string()
			.optional()
			.transform((val) => val === "1"),
		TELEGRAM_BOT_NAME: z.string(),
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(["development", "production", "local"])
			.default("local")
			.transform((val) => {
				// Map Vercel's preview environment to development
				// Access VERCEL_ENV from process.env as it's a system variable
				// This is safe as it's only used for mapping, not validation
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

				// Allow wildcard patterns like *.domain.com or *.*.example.com
				if (val.includes("*")) {
					// DNS label pattern: alphanumeric start/end, hyphens allowed in middle, 1-63 chars
					// Or just "*" for wildcard labels
					const dnsLabel = /^(\*|[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

					// Split by dots and validate each label
					const labels = val.split(".");

					// Must have at least 2 labels (e.g., "*.com" not just "*")
					if (labels.length < 2) return false;

					// Each label must be valid DNS label or wildcard
					for (const label of labels) {
						if (!dnsLabel.test(label)) return false;
					}

					// If wildcard is used, it must be followed by a dot (enforce *.)
					// This prevents invalid patterns like "*example.com"
					if (val.startsWith("*") && !val.startsWith("*.")) {
						return false;
					}

					return true;
				}

				return false;
			},
			{
				message:
					"NEXT_PUBLIC_ALLOWED_ORIGIN must be '*', a valid URL, or a wildcard pattern like *.domain.com",
			},
		),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
