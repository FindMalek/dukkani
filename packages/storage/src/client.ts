import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

let _storageClient: ReturnType<typeof createClient> | null = null;

/**
 * Supabase Storage client singleton
 * Initialized lazily to avoid requiring env vars at build time
 */
export function getStorageClient() {
	if (!_storageClient) {
		_storageClient = createClient(
			env.SUPABASE_URL,
			env.SUPABASE_SERVICE_ROLE_KEY,
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false,
				},
			},
		);
	}
	return _storageClient;
}

// Export getter function instead of direct client
export const storageClient = new Proxy({} as ReturnType<typeof createClient>, {
	get(_target, prop) {
		return getStorageClient()[prop as keyof ReturnType<typeof createClient>];
	},
});
