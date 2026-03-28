import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Server-only env for PR preview R2 cleanup in GitHub Actions.
 * Narrow S3 subset — no Next/Vercel client vars (unlike storageEnv).
 */
export const previewCleanupEnv = createEnv({
  server: {
    S3_ENDPOINT: z.url(),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    S3_BUCKET: z.string().min(1),
    S3_REGION: z.string().default("auto"),
    PREVIEW_CLEANUP_PR_NUMBER: z.coerce.number().int().positive(),
  },
  client: {},
  clientPrefix: "NEXT_PUBLIC_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NODE_ENV === "test",
});
