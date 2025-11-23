import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../index";

/**
 * Web app environment preset
 * Extends base env with web-specific variables
 * Also includes NEXT_PUBLIC_DASHBOARD_URL for cross-app linking
 */
export const webEnv = createEnv({
	extends: [baseEnv],
	client: {
		NEXT_PUBLIC_WEB_URL: z.url(),
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
