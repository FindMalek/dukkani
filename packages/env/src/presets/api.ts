import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * API app environment preset
 * Extends base env and adds API-specific variables including Vercel system variables
 */
export const apiEnv = createEnv({
	extends: [baseEnv],
	server: {
		SUPABASE_URL: z.url(),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
		STORAGE_MAX_FILE_SIZE: z.number().int().positive().default(5242880), // 5MB default
		STORAGE_ALLOWED_MIME_TYPES: z.string().default("image/*"),
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
		NEXT_PUBLIC_ALLOWED_ORIGIN: z.string(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
