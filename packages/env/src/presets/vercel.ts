import { createEnv } from "@t3-oss/env-nextjs";
import { baseEnv } from "../base";
import { clientModule, vercelModule } from "../modules";
import { createNextjsRuntimeEnv } from "../utils/runtime-env";

/**
 * Vercel platform environment preset
 * Combines base environment with Vercel-specific variables
 * For applications deployed on Vercel platform
 */
export const vercelEnv = createEnv({
  extends: [baseEnv],
  server: {
    ...vercelModule.server,
  },
  client: {
    ...clientModule.client,
    ...vercelModule.client,
  },
  runtimeEnv: createNextjsRuntimeEnv(),
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});
