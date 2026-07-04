import { createEnv } from "@t3-oss/env-core";
import { aiModule } from "../modules";

/**
 * @dukkani/common package environment preset
 * Server-only credentials used by shared business logic (e.g. AI-backed
 * product description generation in ProductService).
 */
export const commonEnv = createEnv({
  server: {
    ...aiModule.server,
  },
  client: {},
  clientPrefix: "NEXT_PUBLIC_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});
