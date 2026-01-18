import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";
import { otelServerSchema } from "./otel";

/**
 * Web app environment preset
 * Extends base env and adds web-specific variables
 */
export const webEnv = createEnv({
	extends: [baseEnv],
	server: {
		...otelServerSchema,
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
