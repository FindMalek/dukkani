import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { vercelModule } from "../modules";

/**
 * Vercel platform environment preset
 * Combines base environment with Vercel-specific variables
 * For applications deployed on Vercel platform
 */
export const vercelEnv = createEnv({
	extends: [baseEnv],
	server: {
		...vercelModule.server,
	},
	client: vercelModule.client,
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
