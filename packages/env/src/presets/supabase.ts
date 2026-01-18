import { z } from "zod";

export const supabaseServerSchema = {
	SUPABASE_URL: z.url(),
	SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
};
