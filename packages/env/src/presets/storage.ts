import { createEnv } from "@t3-oss/env-nextjs";
import { storageModule } from "../modules";
import { createNextjsRuntimeEnv } from "../utils/runtime-env";
import { vercelEnv } from "./vercel";

/**
 * Storage package environment preset
 * Includes S3-compatible storage configuration and Vercel deployment variables
 */
export const storageEnv = createEnv({
  extends: [vercelEnv],
  server: {
    ...storageModule.server,
  },
  runtimeEnv: createNextjsRuntimeEnv(),
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});
