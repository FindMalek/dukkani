import { storageEnv } from "@dukkani/env/presets";

/**
 * Storage package environment
 * Uses storageEnv preset which includes S3-compatible storage (R2/MinIO) configuration
 */
export const env = storageEnv;
