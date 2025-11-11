import { createEnv } from "@t3-oss/env-core";
import { env as baseEnv } from "@dukkani/env";

export const env = createEnv({
	extends: [baseEnv],
	server: {
		// Auth-specific env vars are already in base env
		// Additional auth vars can be added here if needed
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

