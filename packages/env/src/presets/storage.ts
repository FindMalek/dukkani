import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { storageModule } from "../modules";

/**
 * Storage package environment preset
 * Includes S3-compatible storage (R2/MinIO) configuration and file upload limits
 */
export const storageEnv = createEnv({
	extends: [baseEnv],
	server: {
		...storageModule.server,
	},
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
