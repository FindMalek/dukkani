import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

let _s3Client: S3Client | null = null;

/**
 * S3-compatible storage client singleton (R2/MinIO)
 * Initialized lazily to avoid requiring env vars at build time
 */
export function getS3Client(): S3Client {
  if (!_s3Client) {
    _s3Client = new S3Client({
      region: env.S3_REGION,
      endpoint: env.S3_ENDPOINT,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }
  return _s3Client;
}
