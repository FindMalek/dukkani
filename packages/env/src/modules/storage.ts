import { z } from "zod";

/**
 * Storage module - defines S3-compatible storage configuration (R2/MinIO)
 * Used by storage package
 */
export const storageModule = {
	server: {
		S3_ENDPOINT: z.url(),
		S3_ACCESS_KEY_ID: z.string().min(1),
		S3_SECRET_ACCESS_KEY: z.string().min(1),
		S3_BUCKET: z.string().min(1),
		S3_PUBLIC_BASE_URL: z.url(),
		S3_REGION: z.string().default("auto"),
		STORAGE_MAX_FILE_SIZE: z.coerce.number().int().positive().default(4587520),
		STORAGE_ALLOWED_MIME_TYPES: z.string().default("image/*"),
		SUPABASE_URL: z.url().optional(),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
		SUPABASE_STORAGE_BUCKET_NAME: z.string().default("production").optional(),
	},
} as const;
