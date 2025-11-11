import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { env as baseEnv } from "@dukkani/env";

export const env = createEnv({
	extends: [baseEnv],
	server: {
		CORS_ORIGIN: z.string().url().optional(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

