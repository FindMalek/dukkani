import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Storefront app environment preset
 * Extends base env and adds storefront-specific variables
 */
export const storefrontEnv = createEnv({
	extends: [baseEnv],
	client: {
		NEXT_PUBLIC_STORE_DOMAIN: z.string(),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
