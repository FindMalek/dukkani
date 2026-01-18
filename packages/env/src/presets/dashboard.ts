import { createEnv } from "@t3-oss/env-core";
import { baseEnv } from "../base";
import { observabilityModule, urlsModule } from "../modules";
import { dbEnv } from "./db";

/**
 * Dashboard app environment preset
 * Extends base env and adds dashboard-specific variables
 */
export const dashboardEnv = createEnv({
	extends: [baseEnv, dbEnv],
	server: observabilityModule.server,
	client: urlsModule.client,
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
