import { createEnv } from "@t3-oss/env-core";
import { env as baseEnv } from "@dukkani/env";

export const env = createEnv({
	extends: [baseEnv],
	server: {
		// DB-specific env vars can be added here if needed
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

