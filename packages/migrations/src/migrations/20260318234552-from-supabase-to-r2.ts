import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService, env as storageEnv } from "@dukkani/storage";
import { StorageMigration } from "../templates/storage-migration";
import type { StorageFileMapping, UploadBatchResult } from "../types";

/**
 * Get content from Supabase to Cloudflare R2 Storage
 */
export class FromSupabaseToR2Migration extends StorageMigration {
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

		// In dry-run we avoid creating a DB health record or failing on DB writes.
		if (this.isDryRun()) {
			this.logProgress("Dry run enabled: skipping database health check");
			return;
		}

		// Validate database connectivity by writing a lightweight health record.
		try {
			await database.health.create({
				data: {
					status: "UNKNOWN",
					duration: 0,
					startTime: new Date(),
					endTime: new Date(),
				},
			});
		} catch (error) {
			throw new Error(
				`Database not accessible: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}

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

		// TODO: Implement your database discovery logic
		// Examples:
		// - Query specific tables for file references
		// - Filter by specific criteria
		// - Map database records to file mappings

		const mappings = await this.fileMapper.inferTargetFromDatabase();
		logger.info(`Found ${mappings.length} database-referenced files`);

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

		type MappingWithOldSourceUrl = StorageFileMapping & {
			// Runtime-only helper to preserve the original Supabase URL for later DB updates.
			oldSourceUrl?: string;
		};

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

				const m = mapping as MappingWithOldSourceUrl;

				// Preserve the original Supabase URL so we can update rows by matching the old value later.
				m.oldSourceUrl ??= m.sourceUrl;

				// Download file from Supabase
				const bucket = this.config.source.supabaseBucket || "production";
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
				m.sourceUrl = result.url;
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
				"[DRY RUN] Would update database URLs for from-supabase-to-r2",
			);
			return;
		}

		logger.info("Updating database URLs for from-supabase-to-r2");

		const bucketName = this.config.source.supabaseBucket || "production";

		type MappingWithOldSourceUrl = StorageFileMapping & {
			oldSourceUrl?: string;
		};

		for (const mapping of this.discoveredFiles) {
			const m = mapping as MappingWithOldSourceUrl;

			// New URL is written during uploadBatch().
			const newUrl = m.sourceUrl;
			if (!newUrl) continue;

			// Old URL is either preserved from uploadBatch (fast path), or recomputed from the Supabase URL structure.
			const oldUrl =
				m.oldSourceUrl ??
				this.sourceClient.getPublicUrl(bucketName, m.sourcePath);
			if (!oldUrl) continue;

			// storage_files: the primary record is tracked by fileId.
			if (m.fileId) {
				await database.storageFile.update({
					where: { id: m.fileId },
					data: {
						url: newUrl,
						originalUrl: newUrl,
					},
				});
				continue;
			}

			// storage_file_variants vs images: distinguish by Supabase object path.
			if (m.sourcePath.includes("/variants/")) {
				await database.storageFileVariant.updateMany({
					where: { url: oldUrl },
					data: { url: newUrl },
				});
			} else {
				await database.image.updateMany({
					where: { url: oldUrl },
					data: { url: newUrl },
				});
			}
		}
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
