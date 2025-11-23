import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../index";

/**
 * API app environment preset
 * Uses base env only - no app-specific variables needed
 */
export const apiEnv = createEnv({
	extends: [baseEnv],
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
