import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

/**
 * Supabase Storage client singleton
 * Uses service role key for server-side operations
 */
export const storageClient = createClient(
	env.SUPABASE_URL,
	env.SUPABASE_SERVICE_ROLE_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
);
