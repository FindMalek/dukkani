import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Storefront app environment preset
 * Extends base env and adds storefront-specific variables
 */
export const storefrontEnv = createEnv({
	extends: [baseEnv],
	server: {
		BETTER_STACK_API_KEY: z.string().optional(),
		OTEL_SERVICE_NAME: z.string().default("dukkani-storefront"),
		OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1).default(1.0),
		OTEL_ENABLED: z.boolean().default(true),
	},
	client: {
		NEXT_PUBLIC_STORE_DOMAIN: z.string().refine((val) => val.includes("."), {
			message: "NEXT_PUBLIC_STORE_DOMAIN must be a valid domain name.",
		}),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});