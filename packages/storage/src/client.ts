import { S3Client } from "@aws-sdk/client-s3";
import { createS3Client } from "./s3-client-factory";
import { env } from "./env";

export type { S3ConnectionConfig } from "./s3-client-factory";
export { createS3Client } from "./s3-client-factory";

let _s3Client: S3Client | null = null;

/**
 * S3-compatible storage client singleton (R2/MinIO)
 * Initialized lazily to avoid requiring env vars at build time
 */
export function getS3Client(): S3Client {
  if (!_s3Client) {
    _s3Client = createS3Client({
      region: env.S3_REGION,
      endpoint: env.S3_ENDPOINT,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    });
  }
  return _s3Client;
}
