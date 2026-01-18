import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";
import { otelServerSchema } from "./otel";

/**
 * Storefront app environment preset
 * Extends base env and adds storefront-specific variables
 */
export const storefrontEnv = createEnv({
	extends: [baseEnv],
	server: {
		...otelServerSchema,
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
