import { createEnv } from "@t3-oss/env-nextjs";
import { clientModule, observabilityModule, urlsModule } from "../modules";
import { createNextjsRuntimeEnv } from "../utils/runtime-env";

/**
 * Web app environment preset
 * Uses @t3-oss/env-nextjs for proper Next.js client-side inlining
 * All NEXT_PUBLIC_* vars must be explicitly mapped in runtimeEnv for Next.js bundling
 */
export const webEnv = createEnv({
	server: observabilityModule.server,
	client: {
		...clientModule.client,
		...urlsModule.client,
	},
	runtimeEnv: createNextjsRuntimeEnv(),
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
