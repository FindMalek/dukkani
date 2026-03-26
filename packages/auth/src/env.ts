import { authModule, urlsModule } from "@dukkani/env";
import { vercelEnv } from "@dukkani/env/presets";
import { createEnv } from "@t3-oss/env-core";

/**
 * Auth package environment
 * Extends Vercel env with auth-specific server variables
 * Also includes NEXT_PUBLIC_DASHBOARD_URL for trustedOrigins
 */
export const env = createEnv({
  extends: [vercelEnv],
  server: {
    ...authModule.server,
  },
  client: {
    ...urlsModule.client,
  },
  clientPrefix: "NEXT_PUBLIC_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
