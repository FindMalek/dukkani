import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Dashboard app environment preset
 * Extends base env with dashboard-specific variables
 */
export const dashboardEnv = createEnv({
	extends: [baseEnv],
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
