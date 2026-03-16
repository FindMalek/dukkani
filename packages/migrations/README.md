# @dukkani/migrations

Database and storage migration utilities for Dukkani.

## Features

- **Template System**: Reusable migration patterns
- **Storage Migrations**: Seamless migration between storage providers
- **Progress Tracking**: Detailed progress reporting and resumption
- **Rollback Support**: Optional rollback capabilities
- **CLI Interface**: User-friendly command-line tools
- **Environment Validation**: Proper environment handling with `@dukkani/env`

## Installation

```bash
pnpm add @dukkani/migrations
```

## Environment Variables

### Source (Supabase)
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=production
```

### Migration Configuration
```bash
MIGRATION_BATCH_SIZE=5
MIGRATION_DRY_RUN=false
MIGRATION_VALIDATE_AFTER=true
MIGRATION_CLEANUP_SOURCE=false
MIGRATION_SCOPE=db-referenced
MIGRATION_ROLLBACK_ENABLED=true
```

## CLI Usage

### Storage Migration

#### Migrate from Supabase to R2
```bash
# Basic migration
pnpm migrate:storage

# Dry run (no changes)
pnpm migrate:storage -- --dry-run

# Custom batch size
pnpm migrate:storage -- --batch-size 10

# Migrate all bucket files
pnpm migrate:storage -- --scope all-bucket

# Clean up source after migration
pnpm migrate:storage -- --cleanup
```

#### Rollback Migration
```bash
# Interactive rollback
pnpm migrate:storage:rollback

# Skip confirmation
pnpm migrate:storage:rollback -- --confirm
```

#### Validate Migration
```bash
# Basic validation
pnpm migrate:storage:validate

# Detailed validation
pnpm migrate:storage:validate -- --detailed
```

## Programmatic Usage

```typescript
import { SupabaseToR2Migration } from "@dukkani/migrations";

const migration = new SupabaseToR2Migration({
  source: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseBucket: "production",
  },
  destination: {},
  scope: "db-referenced",
  dryRun: false,
  batchSize: 5,
  validateAfter: true,
  cleanupSource: false,
  rollbackEnabled: true,
});

// Run migration
const result = await migration.execute();
console.log(result);

// Rollback if needed
if (!result.success && migration.config.rollbackEnabled) {
  await migration.rollback();
}
```

## Migration Scopes

### db-referenced (Default)
Migrates only files referenced in the database:
- `storage_files` table
- `storage_file_variants` table  
- `images` table

### all-bucket
Migrates all files in the Supabase storage bucket.

### configurable
Uses custom target mapping provided in configuration.

## File Structure Mapping

The migration automatically infers target structure from file paths:

```
stores/{storeId}/logo/{file}     → { resource: "stores", entityId: storeId, assetRole: "logo" }
products/{productId}/gallery/{file} → { resource: "products", entityId: productId, assetRole: "gallery" }
avatars/{userId}/profile/{file}  → { resource: "avatars", entityId: userId, assetRole: "profile" }
```

## Error Handling

- **Retry Logic**: Failed operations are logged and can be retried
- **Progress Tracking**: Migration can be resumed from last successful batch
- **Rollback Support**: Optional rollback to previous state
- **Detailed Logging**: Comprehensive error reporting with context

## Development

```bash
# Build
pnpm build

# Run CLI
pnpm migrate

# Test migration
pnpm migrate:storage -- --dry-run
```

## Architecture

- **Templates**: Reusable migration base classes
- **Utils**: Client wrappers and mapping utilities  
- **CLI**: Command-line interface with progress tracking
- **Types**: TypeScript definitions for all migration interfaces

## Security

- Environment variables are validated using `@dukkani/env`
- No credentials are logged or exposed
- Secure file transfer with proper error handling
- Optional source cleanup for data privacy
