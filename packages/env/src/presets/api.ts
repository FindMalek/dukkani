import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { observabilityModule, telegramModule, urlsModule } from "../modules";
import { dbEnv } from "./db";

/**
 * API app environment preset
 * Extends base env and db env, adds API-specific variables
 * Note: baseEnv already includes NEXT_PUBLIC_API_URL and NEXT_PUBLIC_ALLOWED_ORIGIN
 */
export const apiEnv = createEnv({
	extends: [dbEnv, baseEnv],
	server: {
		...telegramModule.server,
		...observabilityModule.server,
	},
	client: {
		...urlsModule.client,
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
