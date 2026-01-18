import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { observabilityModule, urlsModule } from "../modules";

/**
 * Web app environment preset
 * Extends base env and adds web-specific variables
 */
export const webEnv = createEnv({
	extends: [baseEnv],
	server: {
		...observabilityModule.server,
	},
	client: {
		...urlsModule.client,
		NEXT_PUBLIC_DASHBOARD_URL: urlsModule.client.NEXT_PUBLIC_DASHBOARD_URL,
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
