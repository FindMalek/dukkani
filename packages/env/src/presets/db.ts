import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * DB package environment preset
 * Only includes server-side variables - no client vars needed
 */
export const dbEnv = createEnv({
	extends: [baseEnv],
	server: {
		DATABASE_URL: z.url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
