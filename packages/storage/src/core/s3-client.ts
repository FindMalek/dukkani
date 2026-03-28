import { S3Client } from "@aws-sdk/client-s3";

export type S3ConnectionConfig = {
  region: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
};

/**
 * Build an S3-compatible client (R2/MinIO) from explicit config.
 * Use in CI or scripts that must not load storage package env.
 */
export function createS3Client(config: S3ConnectionConfig): S3Client {
  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    forcePathStyle: true,
  });
}
