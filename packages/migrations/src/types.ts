import type { StorageUploadTarget } from "@dukkani/common/schemas/storage/input";

/**
 * Base migration configuration
 */
export interface MigrationConfig {
	dryRun?: boolean;
	batchSize?: number;
	validateAfter?: boolean;
	cleanupSource?: boolean;
	rollbackEnabled?: boolean;
}

/**
 * Migration progress tracking
 */
export interface MigrationProgress {
	total: number;
	processed: number;
	failed: number;
	skipped: number;
	startTime: Date;
	errors: MigrationError[];
}

/**
 * Migration error details
 */
export interface MigrationError {
	timestamp: Date;
	message: string;
	stack?: string;
}

/**
 * Migration result
 */
export interface MigrationResult {
	name: string;
	version: string;
	success: boolean;
	message?: string;
	progress: MigrationProgress;
	duration: number;
	timestamp: Date;
}

/**
 * Storage migration configuration
 */
export interface StorageMigrationConfig extends MigrationConfig {
	source: {
		supabaseUrl?: string;
		supabaseServiceKey?: string;
		supabaseBucket?: string;
	};
	destination: Record<string, never>;
	scope: "db-referenced" | "all-bucket" | "configurable";
	targetMapping?: StorageFileMapping[];
}

export type StorageMappingUpdateRef =
	| {
			kind: "storage-file-url";
			storageFileId: string;
			oldUrl?: string;
	  }
	| {
			kind: "storage-file-original-url";
			storageFileId: string;
			oldUrl?: string;
	  }
	| {
			kind: "storage-file-variant-url";
			storageFileVariantId: string;
			oldUrl?: string;
	  };

/**
 * File mapping for migration
 */
export interface StorageFileMapping {
	sourcePath: string;
	target: StorageUploadTarget;
	sourceUrl?: string;
	sourceBucket?: string;
	fileId?: string;
	destinationUrl?: string;
	updateRefs?: StorageMappingUpdateRef[];
}

/**
 * File discovery result
 */
export interface FileDiscoveryResult {
	files: StorageFileMapping[];
	totalCount: number;
	totalSize: number;
}

/**
 * Upload batch result
 */
export interface UploadBatchResult {
	uploaded: StorageFileMapping[];
	failed: Array<{ mapping: StorageFileMapping; error: Error }>;
	skipped: StorageFileMapping[];
}
