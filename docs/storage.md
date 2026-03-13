# Storage Setup (MinIO / Cloudflare R2)

Dukkani uses S3-compatible object storage for product images and file uploads.

## Local Development (MinIO)

MinIO runs in Docker alongside PostgreSQL. Start all services:

```bash
pnpm db:setup
```

This starts Postgres and MinIO. The `minio-init` service creates the `dukkani` bucket with public read access.

### MinIO Web Console

- **URL:** http://localhost:9001
- **Login:** `minioadmin` / `minioadmin`
- Browse buckets, view/download files, manage policies

### Local Environment

Add to `.env`:

```env
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY_ID="minioadmin"
S3_SECRET_ACCESS_KEY="minioadmin"
S3_BUCKET="dukkani"
S3_PUBLIC_BASE_URL="http://localhost:9000/dukkani"
S3_REGION="us-east-1"
```

## Production (Cloudflare R2)

1. Create an R2 bucket in the [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Create an API token with R2 read/write permissions
3. Enable [public access](https://developers.cloudflare.com/r2/buckets/public-buckets/) for the bucket
4. Set environment variables:

```env
S3_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
# EU: https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID="<R2_ACCESS_KEY>"
S3_SECRET_ACCESS_KEY="<R2_SECRET_KEY>"
S3_BUCKET="dukkani"
S3_PUBLIC_BASE_URL="https://pub-xxx.r2.dev"
S3_REGION="auto"
```

## Migration from Supabase

To migrate existing images from Supabase Storage to R2:

```bash
# Dry run (list objects, no copy)
pnpm migrate:storage-to-r2 -- --dry-run

# Execute migration
pnpm migrate:storage-to-r2
```

Required env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET` (source), plus R2/S3 vars (destination).
