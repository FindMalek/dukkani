import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { env as baseEnv } from "@dukkani/env";

export const env = createEnv({
	extends: [baseEnv],
	server: {
		CORS_ORIGIN: z.url().default("http://localhost:3002"),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});

