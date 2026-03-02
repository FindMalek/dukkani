import { baseEnv } from "@dukkani/env";
import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
	relatedProjects: baseEnv.VERCEL_RELATED_API_PROJECT_ID
		? [baseEnv.VERCEL_RELATED_API_PROJECT_ID]
		: [],
};
