import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Dashboard app environment preset
 * Extends base env and adds dashboard-specific variables
 */
export const dashboardEnv = createEnv({
	extends: [baseEnv],
	server: {
		BETTER_STACK_API_KEY: z.string().optional(),
		OTEL_SERVICE_NAME: z.string().default("dukkani-dashboard"),
		OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1).default(1.0),
		OTEL_ENABLED: z.boolean().default(true),
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});