import { createEnv } from "@t3-oss/env-nextjs";
import { baseEnv } from "../base";
import { clientModule, observabilityModule, urlsModule } from "../modules";
import { createNextjsRuntimeEnv } from "../utils/runtime-env";
import { dbEnv } from "./db";

/**
 * Dashboard app environment preset
 * Uses base environment for platform-agnostic deployment
 * Can be extended with Vercel variables if needed for Vercel deployments
 */
export const dashboardEnv = createEnv({
  extends: [dbEnv, baseEnv],
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
