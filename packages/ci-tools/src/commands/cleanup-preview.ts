#!/usr/bin/env node
/**
 * Deletes all R2 (S3-compatible) objects under prefix pr-{PR_NUMBER}/ for a closed PR.
 * Neon branch cleanup runs in GitHub Actions via neondatabase/delete-branch-action.
 */

import { previewCleanupEnv } from "@dukkani/env/presets/preview-cleanup";
import {
  createS3Client,
  deleteFolderByPrefixWithClient,
} from "@dukkani/storage/core";

async function main(): Promise<void> {
  const env = previewCleanupEnv;
  const pr = env.PREVIEW_CLEANUP_PR_NUMBER;
  if (!Number.isFinite(pr) || pr < 1) {
    console.error("Invalid PREVIEW_CLEANUP_PR_NUMBER");
    process.exit(1);
  }

  const prefix = `pr-${pr}`;
  const client = createS3Client({
    region: env.S3_REGION,
    endpoint: env.S3_ENDPOINT,
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  });

  console.log(
    `Preview R2 cleanup: PR #${pr}, bucket=${env.S3_BUCKET}, prefix=${prefix}/`,
  );

  const { totalDeleted } = await deleteFolderByPrefixWithClient(
    client,
    env.S3_BUCKET,
    prefix,
  );

  console.log(`Deleted ${totalDeleted} object(s) under ${prefix}/`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
