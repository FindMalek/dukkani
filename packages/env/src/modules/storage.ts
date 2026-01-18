import { z } from "zod";

/**
 * Storage module - defines Supabase Storage configuration
 * Used by storage package
 */
export const storageModule = {
	server: {
		SUPABASE_URL: z.url(),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
		STORAGE_BUCKET_NAME: z.string().default("production"),
		STORAGE_MAX_FILE_SIZE: z.coerce.number().int().positive().default(5242880), // 5MB default
		STORAGE_ALLOWED_MIME_TYPES: z.string().default("image/*"),
	},
} as const;
