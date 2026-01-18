import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { observabilityModule, urlsModule } from "../modules";

/**
 * Storefront app environment preset
 * Extends base env and adds storefront-specific variables
 */
export const storefrontEnv = createEnv({
	extends: [baseEnv],
	server: {
		...observabilityModule.server,
	},
	client: {
		...urlsModule.client,
		NEXT_PUBLIC_STORE_DOMAIN: urlsModule.client.NEXT_PUBLIC_STORE_DOMAIN,
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
