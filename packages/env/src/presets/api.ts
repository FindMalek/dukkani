import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";
import { observabilityModule, telegramModule, urlsModule } from "../modules";
import { dbEnv } from "./db";

/**
 * API app environment preset
 * Extends base env and db env, adds API-specific variables
 */
export const apiEnv = createEnv({
	extends: [dbEnv, baseEnv],
	server: {
		...telegramModule.server,
		...observabilityModule.server,
	},
	client: {
		...urlsModule.client,
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
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
