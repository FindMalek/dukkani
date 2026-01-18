import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";
import { otelServerSchema } from "./otel";

/**
 * API app environment preset
 * Extends base env and adds API-specific variables including Vercel system variables
 */
export const apiEnv = createEnv({
	extends: [baseEnv],
	server: {
		TELEGRAM_API_TOKEN: z.string(),
		TELEGRAM_WEBHOOK_SECRET: z.string(),
		...otelServerSchema,
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
		NEXT_PUBLIC_ALLOWED_ORIGIN: z.union([
			z.literal("*"),
			z.url(),
			z.string().refine(
				(val) => {
					// Allow wildcard patterns like *.domain.com
					// This matches the pattern validation in isOriginAllowed function
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
		]),
		NEXT_PUBLIC_STORE_DOMAIN: z.string(),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
