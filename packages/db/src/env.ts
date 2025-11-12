import { env as baseEnv } from "@dukkani/env";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
	extends: [baseEnv],
	server: {},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
