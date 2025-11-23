import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";

/**
 * API app environment preset
 * Uses base env only - NEXT_PUBLIC_DASHBOARD_URL is obtained from process.env
 * directly in server initialization (not validated here to avoid requiring it
 * in API app's .env.local, but it's still needed for auth trusted origins)
 */
export const apiEnv = createEnv({
	extends: [baseEnv],
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
