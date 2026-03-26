import { createEnv } from "@t3-oss/env-nextjs";
import { observabilityModule, telegramModule, urlsModule } from "../modules";
import { createNextjsRuntimeEnv } from "../utils/runtime-env";
import { dbEnv } from "./db";
import { vercelEnv } from "./vercel";

/**
 * API app environment preset
 * Extends Vercel env and db env, adds API-specific variables
 * Note: vercelEnv already includes NEXT_PUBLIC_API_URL and NEXT_PUBLIC_ALLOWED_ORIGIN
 */
export const apiEnv = createEnv({
  extends: [dbEnv, vercelEnv],
  server: {
    ...telegramModule.server,
    ...observabilityModule.server,
  },
  client: {
    ...urlsModule.client,
  },
  runtimeEnv: createNextjsRuntimeEnv(),
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});
