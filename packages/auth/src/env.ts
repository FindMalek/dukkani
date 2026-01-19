import { authModule, urlsModule } from "@dukkani/env";
import { baseEnv } from "@dukkani/env/base";
import { createEnv } from "@t3-oss/env-core";

/**
 * Auth package environment
 * Extends base env with auth-specific server variables
 * Also includes NEXT_PUBLIC_DASHBOARD_URL for trustedOrigins
 */
export const env = createEnv({
	extends: [baseEnv],
	server: {
		...authModule.server,
	},
	client: {
		...urlsModule.client,
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
