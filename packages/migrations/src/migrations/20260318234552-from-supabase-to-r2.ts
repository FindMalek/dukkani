import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService, env as storageEnv } from "@dukkani/storage";
import { StorageMigration } from "../templates/storage-migration";
import type {
  StorageFileMapping,
  StorageMappingUpdateRef,
  UploadBatchResult,
} from "../types";

/**
 * Get content from Supabase to Cloudflare R2 Storage
 */
export class FromSupabaseToR2Migration extends StorageMigration {
  private getSupabaseBucket(): string {
    return this.config.source.supabaseBucket || "production";
  }

  /**
   * Check if URL belongs to this Supabase project
   */
  private isSupabaseProjectUrl(url: string | null | undefined): boolean {
    if (!url) return false;
    try {
      const urlHost = new URL(url).host;
      const supabaseHost = new URL(this.config.source.supabaseUrl || "").host;
      return urlHost === supabaseHost;
    } catch {
      return false;
    }
  }

  private getUpdateRefKey(ref: StorageMappingUpdateRef): string {
    switch (ref.kind) {
      case "storage-file-url":
        return `${ref.kind}:${ref.storageFileId}`;
      case "storage-file-original-url":
        return `${ref.kind}:${ref.storageFileId}`;
      case "storage-file-variant-url":
        return `${ref.kind}:${ref.storageFileVariantId}`;
    }
  }

  /**
   * Get migration name
   */
  getName(): string {
    return "from-supabase-to-r2";
  }

  /**
   * Get migration version
   */
  getVersion(): string {
    return "20260318234552";
  }

  /**
   * Validate prerequisites for this migration
   */
  async validatePrerequisites(): Promise<void> {
    this.addTracing({ phase: "validation" });
    this.logProgress("Validating migration prerequisites");

    // Validate source connectivity
    await this.sourceClient.validateConnection();

    // Validate destination connectivity
    try {
      await StorageService.checkHealth();
    } catch (error) {
      throw new Error(
        `Destination storage not accessible: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    // Skip database health check - not essential for storage migration
    this.logProgress("Database health check skipped");

    this.logProgress("Prerequisites validation completed");
  }

  /**
   * Discover database-referenced files for migration
   */
  protected async discoverDatabaseReferencedFiles(): Promise<
    StorageFileMapping[]
  > {
    logger.info(
      "Discovering database-referenced files for from-supabase-to-r2",
    );

    const mappingsByPath = new Map<string, StorageFileMapping>();
    let skipped = 0;
    let refs = 0;

    const upsertMapping = (
      sourcePath: string,
      sourceBucket: string,
      sourceUrl: string | undefined,
      updateRef: StorageMappingUpdateRef,
    ): void => {
      const target = this.fileMapper.inferTargetFromPath(sourcePath);
      if (!target) {
        skipped += 1;
        return;
      }

      const existing = mappingsByPath.get(sourcePath);
      if (!existing) {
        mappingsByPath.set(sourcePath, {
          sourcePath,
          target,
          sourceBucket,
          sourceUrl,
          updateRefs: [updateRef],
          fileId:
            "storageFileId" in updateRef ? updateRef.storageFileId : undefined,
        });
        refs += 1;
        return;
      }

      existing.sourceBucket ||= sourceBucket;
      existing.sourceUrl ||= sourceUrl;
      existing.updateRefs ||= [];

      const refKey = this.getUpdateRefKey(updateRef);
      const hasRef = existing.updateRefs.some(
        (ref) => this.getUpdateRefKey(ref) === refKey,
      );

      if (!hasRef) {
        existing.updateRefs.push(updateRef);
        refs += 1;
      }
    };

    const storageFiles = await database.storageFile.findMany({
      select: {
        id: true,
        bucket: true,
        path: true,
        url: true,
        originalUrl: true,
      },
    });

    for (const file of storageFiles) {
      // Filter URLs to only process Supabase project URLs
      if (file.url && this.isSupabaseProjectUrl(file.url)) {
        upsertMapping(file.path, this.getSupabaseBucket(), file.url, {
          kind: "storage-file-url",
          storageFileId: file.id,
          oldUrl: file.url,
        });
      } else if (file.url) {
        logger.info(`Skipping non-Supabase URL: ${file.url}`);
        skipped++;
      }

      if (file.originalUrl && this.isSupabaseProjectUrl(file.originalUrl)) {
        upsertMapping(file.path, this.getSupabaseBucket(), file.originalUrl, {
          kind: "storage-file-original-url",
          storageFileId: file.id,
          oldUrl: file.originalUrl,
        });
      } else if (file.originalUrl) {
        logger.info(`Skipping non-Supabase originalUrl: ${file.originalUrl}`);
        skipped++;
      }
    }

    const variants = await database.storageFileVariant.findMany({
      select: {
        id: true,
        variant: true,
        url: true,
        storageFile: {
          select: {
            bucket: true,
            path: true,
          },
        },
      },
    });

    for (const variant of variants) {
      // Filter URLs to only process Supabase project URLs
      if (!variant.url || !this.isSupabaseProjectUrl(variant.url)) {
        if (variant.url) {
          logger.info(`Skipping non-Supabase variant URL: ${variant.url}`);
          skipped++;
        } else {
          skipped++;
        }
        continue;
      }

      const bucket = variant.storageFile.bucket || this.getSupabaseBucket();
      let path = this.fileMapper.extractPathFromSupabaseUrl(
        variant.url,
        bucket,
      );

      if (!path) {
        const basePath = variant.storageFile.path;
        const slashIdx = basePath.lastIndexOf("/");
        const dotIdx = basePath.lastIndexOf(".");
        const parent = slashIdx >= 0 ? basePath.slice(0, slashIdx) : "";
        const ext = dotIdx > slashIdx ? basePath.slice(dotIdx + 1) : "webp";
        const variantFileName = `${variant.variant.toLowerCase()}.${ext}`;
        path = parent ? `${parent}/${variantFileName}` : variantFileName;
      }

      if (!path) {
        skipped += 1;
        logger.warn(
          { variantId: variant.id, url: variant.url },
          "Skipping variant URL that is not a valid Supabase public URL",
        );
        continue;
      }

      upsertMapping(path, bucket, variant.url, {
        kind: "storage-file-variant-url",
        storageFileVariantId: variant.id,
        oldUrl: variant.url,
      });
    }

    const mappings = [...mappingsByPath.values()];
    logger.info(
      `Found ${mappings.length} database-referenced unique files (refs=${refs}, skipped=${skipped})`,
    );

    return mappings;
  }

  /**
   * Discover all bucket files for migration
   */
  protected async discoverAllBucketFiles(): Promise<StorageFileMapping[]> {
    logger.info("Discovering all bucket files for from-supabase-to-r2");

    // TODO: Implement your bucket discovery logic
    // Examples:
    // - List all files in source bucket
    // - Filter by specific paths or patterns
    // - Create mappings for discovered files

    const allPaths = await this.sourceClient.listAllFiles();
    const mappings = this.fileMapper.createMappingsFromFileList(allPaths);
    logger.info(`Found ${mappings.length} files in bucket`);

    return mappings;
  }

  /**
   * Discover configurable files based on target mapping
   */
  protected async discoverConfigurableFiles(): Promise<StorageFileMapping[]> {
    logger.info("Discovering configurable files for from-supabase-to-r2");

    if (!this.config.targetMapping) {
      throw new Error("Target mapping is required for configurable scope");
    }

    // TODO: Implement your configurable discovery logic
    // Use the provided targetMapping from configuration

    return this.config.targetMapping;
  }

  /**
   * Upload a batch of files to destination storage
   */
  protected async uploadBatch(
    batch: StorageFileMapping[],
  ): Promise<UploadBatchResult> {
    const uploaded: StorageFileMapping[] = [];
    const failed: Array<{ mapping: StorageFileMapping; error: Error }> = [];
    const skipped: StorageFileMapping[] = [];

    logger.info(
      `Processing batch of ${batch.length} files for from-supabase-to-r2`,
    );

    for (const mapping of batch) {
      try {
        if (this.isDryRun()) {
          logger.info(
            `[DRY RUN] Would upload: ${mapping.sourcePath} -> ${mapping.target.resource}/${mapping.target.entityId}`,
          );
          uploaded.push(mapping);
          continue;
        }

        // Download file from Supabase
        const bucket = this.getSupabaseBucket();
        const blob = await this.sourceClient.downloadFile(
          bucket,
          mapping.sourcePath,
        );

        // Convert Blob to File for StorageService
        const file = new File(
          [blob],
          mapping.sourcePath.split("/").pop() || "file",
          {
            type: blob.type || "application/octet-stream",
          },
        );

        // Upload to R2 using StorageService
        const result = await StorageService.uploadFile(file, {
          target: mapping.target,
        });

        // Store the new R2 URL for database updates
        mapping.destinationUrl = result.url;
        mapping.sourceUrl = result.url;
        uploaded.push(mapping);

        logger.debug(`Uploaded: ${mapping.sourcePath} -> ${result.url}`);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        failed.push({ mapping, error: err });
        logger.error(`Failed to upload ${mapping.sourcePath}:`, err.message);
      }
    }

    return {
      uploaded,
      failed,
      skipped,
    };
  }

  /**
   * Update database URLs and references
   */
  protected async updateDatabaseUrls(): Promise<void> {
    if (this.isDryRun()) {
      logger.info(
        `[DRY RUN] Would update database URLs for from-supabase-to-r2 (mappings=${this.discoveredFiles.length})`,
      );
      return;
    }

    logger.info("Updating database URLs for from-supabase-to-r2");

    let updatedStorageFiles = 0;
    let updatedStorageVariants = 0;

    for (const mapping of this.discoveredFiles) {
      const newUrl = mapping.destinationUrl;
      if (!newUrl) continue;

      const refs = mapping.updateRefs || [];
      const storageFileUpdates = new Map<
        string,
        { url?: string; originalUrl?: string }
      >();
      const variantIds = new Set<string>();

      for (const ref of refs) {
        switch (ref.kind) {
          case "storage-file-url": {
            const existing = storageFileUpdates.get(ref.storageFileId) || {};
            existing.url = newUrl;
            storageFileUpdates.set(ref.storageFileId, existing);
            break;
          }
          case "storage-file-original-url": {
            const existing = storageFileUpdates.get(ref.storageFileId) || {};
            existing.originalUrl = newUrl;
            storageFileUpdates.set(ref.storageFileId, existing);
            break;
          }
          case "storage-file-variant-url":
            variantIds.add(ref.storageFileVariantId);
            break;
        }
      }

      for (const [storageFileId, data] of storageFileUpdates) {
        await database.storageFile.update({
          where: { id: storageFileId },
          data,
        });
        updatedStorageFiles += 1;
      }

      for (const storageFileVariantId of variantIds) {
        await database.storageFileVariant.update({
          where: { id: storageFileVariantId },
          data: { url: newUrl },
        });
        updatedStorageVariants += 1;
      }
    }

    logger.info(
      `Updated database URLs (storageFiles=${updatedStorageFiles}, storageFileVariants=${updatedStorageVariants})`,
    );
  }

  /**
   * Restore database URLs and references (rollback)
   */
  protected async restoreDatabaseUrls(): Promise<void> {
    if (this.isDryRun()) {
      logger.info(
        "[DRY RUN] Would restore database URLs for from-supabase-to-r2 rollback",
      );
      return;
    }

    logger.info("Restoring database URLs for from-supabase-to-r2 rollback");

    if (this.discoveredFiles.length === 0) {
      const discoveryResult = await this.discoverFiles();
      this.discoveredFiles = discoveryResult.files;
    }

    let restoredStorageFiles = 0;
    let restoredStorageVariants = 0;

    for (const mapping of this.discoveredFiles) {
      const refs = mapping.updateRefs || [];
      const storageFileUpdates = new Map<
        string,
        { url?: string; originalUrl?: string }
      >();
      const variantUpdates = new Map<string, string>();

      for (const ref of refs) {
        if (!ref.oldUrl) {
          continue;
        }

        switch (ref.kind) {
          case "storage-file-url": {
            const existing = storageFileUpdates.get(ref.storageFileId) || {};
            existing.url = ref.oldUrl;
            storageFileUpdates.set(ref.storageFileId, existing);
            break;
          }
          case "storage-file-original-url": {
            const existing = storageFileUpdates.get(ref.storageFileId) || {};
            existing.originalUrl = ref.oldUrl;
            storageFileUpdates.set(ref.storageFileId, existing);
            break;
          }
          case "storage-file-variant-url":
            variantUpdates.set(ref.storageFileVariantId, ref.oldUrl);
            break;
        }
      }

      for (const [storageFileId, data] of storageFileUpdates) {
        await database.storageFile.update({
          where: { id: storageFileId },
          data,
        });
        restoredStorageFiles += 1;
      }

      for (const [storageFileVariantId, url] of variantUpdates) {
        await database.storageFileVariant.update({
          where: { id: storageFileVariantId },
          data: { url },
        });
        restoredStorageVariants += 1;
      }
    }

    logger.info(
      `Restored database URLs (storageFiles=${restoredStorageFiles}, storageFileVariants=${restoredStorageVariants})`,
    );
  }

  /**
   * Cleanup source files after successful migration
   */
  protected async cleanupSource(): Promise<void> {
    // Note: `StorageMigration.execute()` already checks `cleanupSource` and `isDryRun()`,
    // so this is a safety guard only.
    if (!this.config.cleanupSource || this.isDryRun()) return;

    const bucket = this.config.source.supabaseBucket || "production";
    const paths = this.discoveredFiles.map((m) => m.sourcePath);

    if (paths.length === 0) {
      logger.info("No source files discovered for cleanup");
      return;
    }

    logger.info(
      `Cleaning up Supabase source files for from-supabase-to-r2 (${paths.length} objects)`,
    );
    await this.sourceClient.deleteFiles(bucket, paths);
  }

  /**
   * Cleanup destination files (rollback)
   */
  protected async cleanupDestination(): Promise<void> {
    // Note: `StorageMigration.rollback()` does not call `discoverFiles()`,
    // so we ensure `discoveredFiles` is populated here.
    if (this.discoveredFiles.length === 0) {
      const discoveryResult = await this.discoverFiles();
      this.discoveredFiles = discoveryResult.files;
    }

    const bucket = storageEnv.S3_BUCKET;
    const baseUrl = storageEnv.S3_PUBLIC_BASE_URL;

    logger.info(
      `Cleaning up R2 destination files for from-supabase-to-r2 (${this.discoveredFiles.length} objects)`,
    );

    for (const mapping of this.discoveredFiles) {
      if (!mapping.sourceUrl) continue;

      try {
        const key = await StorageService.getKeyFromPublicUrl(
          mapping.sourceUrl,
          baseUrl,
        );

        if (!key) continue;

        await StorageService.deleteFile(bucket, key);
      } catch (error) {
        logger.warn(
          {
            sourcePath: mapping.sourcePath,
            error: error instanceof Error ? error.message : String(error),
          },
          "Failed to delete destination file during rollback",
        );
      }
    }
  }

  /**
   * Validate migration results
   */
  protected async validateResults(): Promise<void> {
    logger.info("Validating migration results for from-supabase-to-r2");

    logger.info(
      `Migration summary: processed=${this.progress.processed}/${this.progress.total}, failed=${this.progress.failed}, skipped=${this.progress.skipped}`,
    );

    if (this.progress.errors.length > 0) {
      logger.warn(
        `Migration had ${this.progress.errors.length} logged errors (showing up to 5)`,
      );
      for (const err of this.progress.errors.slice(0, 5)) {
        logger.warn(err.message);
      }
    }
  }

  /**
   * Run additional validation after the base storage migration validation.
   */
  async validate(): Promise<void> {
    await super.validate();
    await this.validateResults();
  }
}
