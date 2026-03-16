import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";
import { StorageMigration } from "../templates/storage-migration";
import type { StorageFileMapping, UploadBatchResult } from "../types";

/**
 * Grouped mappings by table type
 */
interface GroupedMappings {
	storage_files: StorageFileMapping[];
	storage_file_variants: StorageFileMapping[];
	images: StorageFileMapping[];
}

/**
 * Specific migration from Supabase Storage to R2
 */
export class SupabaseToR2Migration extends StorageMigration {
	/**
	 * Get migration name
	 */
	getName(): string {
		return "supabase-to-r2";
	}

	/**
	 * Get migration version
	 */
	getVersion(): string {
		return "2024-03-16";
	}

	/**
	 * Discover database-referenced files
	 */
	protected async discoverDatabaseReferencedFiles(): Promise<
		StorageFileMapping[]
	> {
		logger.info("Discovering database-referenced files");
		return await this.fileMapper.inferTargetFromDatabase();
	}

	/**
	 * Discover all bucket files
	 */
	protected async discoverAllBucketFiles(): Promise<StorageFileMapping[]> {
		logger.info("Discovering all bucket files");
		const allPaths = await this.sourceClient.listAllFiles();
		return this.fileMapper.createMappingsFromFileList(allPaths);
	}

	/**
	 * Discover configurable files (based on target mapping)
	 */
	protected async discoverConfigurableFiles(): Promise<StorageFileMapping[]> {
		logger.info("Discovering configurable files");

		if (!this.config.targetMapping) {
			throw new Error("Target mapping is required for configurable scope");
		}

		return this.config.targetMapping;
	}

	/**
	 * Upload a batch of files to R2
	 */
	protected async uploadBatch(
		batch: StorageFileMapping[],
	): Promise<UploadBatchResult> {
		const uploaded: StorageFileMapping[] = [];
		const failed: Array<{ mapping: StorageFileMapping; error: Error }> = [];
		const skipped: StorageFileMapping[] = [];

		for (const mapping of batch) {
			try {
				if (this.isDryRun()) {
					logger.info(
						`[DRY RUN] Would upload: ${mapping.sourcePath} -> ${mapping.target.resource}/${mapping.target.entityId}/${mapping.target.assetRole}`,
					);
					uploaded.push(mapping);
					continue;
				}

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

				// Store the new URL for database updates
				mapping.sourceUrl = result.url;
				uploaded.push(mapping);

				logger.debug(`Uploaded: ${mapping.sourcePath} -> ${result.url}`);
			} catch (error) {
				failed.push({
					mapping,
					error: error instanceof Error ? error : new Error(String(error)),
				});
				logger.error(
					`Failed to upload ${mapping.sourcePath}:`,
					error instanceof Error ? error.message : String(error),
				);
			}
		}

		return { uploaded, failed, skipped };
	}

	/**
	 * Update database URLs with new R2 URLs
	 */
	protected async updateDatabaseUrls(): Promise<void> {
		if (this.isDryRun()) {
			logger.info("[DRY RUN] Would update database URLs");
			return;
		}

		logger.info("Updating database URLs");

		// Group mappings by table for efficient updates
		const mappingsByTable = this.groupMappingsByTable(this.discoveredFiles);

		for (const [table, mappings] of Object.entries(mappingsByTable)) {
			await this.updateTableUrls(table, mappings);
		}
	}

	/**
	 * Group mappings by database table
	 */
	private groupMappingsByTable(
		mappings: StorageFileMapping[],
	): GroupedMappings {
		const grouped: GroupedMappings = {
			storage_files: [],
			storage_file_variants: [],
			images: [],
		};

		for (const mapping of mappings) {
			if (mapping.fileId) {
				// This is a primary storage file
				grouped.storage_files.push(mapping);
			} else if (mapping.sourceUrl?.includes("/storage/v1/object/public/")) {
				// This is likely a variant or image
				if (mapping.sourceUrl.includes("/variants/")) {
					grouped.storage_file_variants.push(mapping);
				} else {
					grouped.images.push(mapping);
				}
			}
		}

		return grouped;
	}

	/**
	 * Update URLs for a specific table
	 */
	private async updateTableUrls(
		table: string,
		mappings: StorageFileMapping[],
	): Promise<void> {
		if (mappings.length === 0) return;

		for (const mapping of mappings) {
			if (!mapping.sourceUrl) continue;

			try {
				// Update the URL in the appropriate table
				if (table === "storage_files" && mapping.fileId) {
					await database.storageFile.update({
						where: { id: mapping.fileId },
						data: {
							url: mapping.sourceUrl,
							originalUrl: mapping.sourceUrl,
						},
					});
				} else if (table === "storage_file_variants") {
					// Find variant by URL and update
					await database.storageFileVariant.updateMany({
						where: { url: mapping.sourceUrl },
						data: { url: mapping.sourceUrl },
					});
				} else if (table === "images") {
					await database.image.updateMany({
						where: { url: mapping.sourceUrl },
						data: { url: mapping.sourceUrl },
					});
				}

				logger.debug(`Updated ${table} URL for ${mapping.sourcePath}`);
			} catch (error) {
				logger.error(
					`Failed to update ${table} URL for ${mapping.sourcePath}:`,
					error instanceof Error ? error.message : String(error),
				);
				throw error;
			}
		}

		logger.info(`Updated ${mappings.length} URLs in ${table}`);
	}

	/**
	 * Restore original database URLs (rollback)
	 */
	protected async restoreDatabaseUrls(): Promise<void> {
		logger.info("Restoring original database URLs");
		// Implementation would restore original URLs from backup or Supabase
		// For now, this is a placeholder
	}

	/**
	 * Cleanup destination files (rollback)
	 */
	protected async cleanupDestination(): Promise<void> {
		logger.info("Cleaning up destination files");

		for (const mapping of this.discoveredFiles) {
			try {
				if (mapping.sourceUrl) {
					// Extract key from URL and delete from R2
					const key = await StorageService.getKeyFromPublicUrl(
						mapping.sourceUrl,
						process.env.S3_PUBLIC_BASE_URL || "",
					);
					if (key) {
						await StorageService.deleteFile("dukkani", key);
					}
				}
			} catch (error) {
				logger.warn(
					`Failed to cleanup destination file ${mapping.sourcePath}:`,
					error instanceof Error ? error.message : String(error),
				);
			}
		}
	}

	/**
	 * Cleanup source files
	 */
	protected async cleanupSource(): Promise<void> {
		logger.info("Cleaning up source files");

		const bucket = this.config.source.supabaseBucket || "production";
		const paths = this.discoveredFiles.map((m) => m.sourcePath);

		await this.sourceClient.deleteFiles(bucket, paths);
		logger.info(`Deleted ${paths.length} files from source`);
	}
}
