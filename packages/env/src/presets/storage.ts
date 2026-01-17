import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Storage package environment preset
 * Includes Supabase Storage configuration and file upload limits
 * Uses skipValidation during build to avoid requiring env vars at build time
 */
export const storageEnv = createEnv({
	extends: [baseEnv],
	server: {
		SUPABASE_URL: z.url(),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
		STORAGE_BUCKET_NAME: z.string().default("production"), // Default bucket
		STORAGE_MAX_FILE_SIZE: z.number().int().positive().default(5242880), // 5MB default
		STORAGE_ALLOWED_MIME_TYPES: z.string().default("image/*"),
	},
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
