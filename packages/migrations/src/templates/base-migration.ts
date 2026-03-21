import { logger } from "@dukkani/logger";
import { addSpanAttributes } from "@dukkani/tracing";
import type {
	MigrationConfig,
	MigrationProgress,
	MigrationResult,
} from "../types";

/**
 * Abstract base class for all migrations
 * Provides common functionality and enforces migration patterns
 */
export abstract class BaseMigration<
	TConfig extends MigrationConfig = MigrationConfig,
> {
	protected config: TConfig;
	protected progress: MigrationProgress;

	constructor(config: TConfig) {
		this.config = config;
		this.progress = {
			total: 0,
			processed: 0,
			failed: 0,
			skipped: 0,
			startTime: new Date(),
			errors: [],
		};
	}

	/**
	 * Get migration name and version
	 */
	abstract getName(): string;
	abstract getVersion(): string;

	/**
	 * Validate prerequisites for migration
	 */
	abstract validatePrerequisites(): Promise<void>;

	/**
	 * Execute the migration
	 */
	abstract execute(): Promise<MigrationResult>;

	/**
	 * Rollback the migration (if supported)
	 */
	abstract rollback?(): Promise<MigrationResult>;

	/**
	 * Validate migration results
	 */
	abstract validate?(): Promise<void>;

	/**
	 * Cleanup temporary resources
	 */
	abstract cleanup(): Promise<void>;

	/**
	 * Update progress tracking
	 */
	protected updateProgress(increment: number, error?: Error): void {
		this.progress.processed += increment;
		if (error) {
			this.progress.failed += increment;
			this.progress.errors.push({
				timestamp: new Date(),
				message: error.message,
				stack: error.stack,
			});
		} else {
			this.progress.skipped += increment;
		}
	}

	/**
	 * Log migration progress
	 */
	protected logProgress(message: string): void {
		const percentage =
			this.progress.total > 0
				? Math.round((this.progress.processed / this.progress.total) * 100)
				: 0;

		logger.info(
			{
				migration: this.getName(),
				version: this.getVersion(),
				progress: this.progress,
				percentage,
			},
			message,
		);
	}

	/**
	 * Add tracing attributes
	 */
	protected addTracing(attributes: Record<string, unknown>): void {
		addSpanAttributes({
			migration: this.getName(),
			version: this.getVersion(),
			...attributes,
		});
	}

	/**
	 * Check if migration is in dry run mode
	 */
	protected isDryRun(): boolean {
		return this.config.dryRun ?? false;
	}

	/**
	 * Generate migration result
	 */
	protected generateResult(
		success: boolean,
		message?: string,
	): MigrationResult {
		return {
			name: this.getName(),
			version: this.getVersion(),
			success,
			message,
			progress: this.progress,
			duration: Date.now() - this.progress.startTime.getTime(),
			timestamp: new Date(),
		};
	}
}
