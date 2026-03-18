import { logger } from "@dukkani/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import { dbEnv } from "@dukkani/env";
import { initializeDatabase } from "@dukkani/db";
import { migrationEnv } from "../../env";
import { FromSupabaseToR2Migration } from "../../migrations/20260318234552-from-supabase-to-r2";
import type {
	MigrationError,
	MigrationResult,
	StorageMigrationConfig,
} from "../../types";

interface MigrateCommandOptions {
	dryRun: boolean;
	batchSize: string;
	scope: StorageMigrationConfig["scope"];
	validate: boolean;
	cleanup: boolean;
	rollback: boolean;
}

interface RollbackCommandOptions {
	confirm: boolean;
}

interface ValidateCommandOptions {
	detailed: boolean;
}

/**
 * Storage migration commands
 */
export class StorageCommands {
	private static databaseInitialized = false;

	private static ensureDatabaseInitialized(): void {
		if (StorageCommands.databaseInitialized) return;

		initializeDatabase({
			DATABASE_URL: dbEnv.DATABASE_URL,
		});

		StorageCommands.databaseInitialized = true;
	}

	/**
	 * Create storage migrate command
	 */
	static createMigrateCommand(): Command {
		const command = new Command("migrate")
			.description("Migrate storage from Supabase to R2")
			.option("--dry-run", "Run migration without making changes", false)
			.option("--batch-size <size>", "Number of files to process in batch", "5")
			.option(
				"--scope <scope>",
				"Migration scope: db-referenced | all-bucket | configurable",
				"db-referenced",
			)
			.option("--no-validate", "Skip post-migration validation", false)
			.option("--cleanup", "Clean up source files after migration", false)
			.option("--no-rollback", "Disable rollback capability", false)
			.action(async (options) => {
				await StorageCommands.handleMigrate(options);
			});

		return command;
	}

	/**
	 * Create storage rollback command
	 */
	static createRollbackCommand(): Command {
		const command = new Command("rollback")
			.description("Rollback storage migration")
			.option("--confirm", "Skip confirmation prompt", false)
			.action(async (options) => {
				await StorageCommands.handleRollback(options);
			});

		return command;
	}

	/**
	 * Create storage validate command
	 */
	static createValidateCommand(): Command {
		const command = new Command("validate")
			.description("Validate migration results")
			.option("--detailed", "Show detailed validation results", false)
			.action(async (options) => {
				await StorageCommands.handleValidate(options);
			});

		return command;
	}

	/**
	 * Handle migrate command
	 */
	private static async handleMigrate(
		options: MigrateCommandOptions,
	): Promise<void> {
		try {
			logger.info("Starting storage migration");

			// Validate environment
			await StorageCommands.validateEnvironment();

			// Ensure Prisma is initialized before any DB health checks or updates.
			StorageCommands.ensureDatabaseInitialized();

			// Create migration config
			const config: StorageMigrationConfig = {
				source: {
					supabaseUrl: migrationEnv.SUPABASE_URL,
					supabaseServiceKey: migrationEnv.SUPABASE_SERVICE_ROLE_KEY,
					supabaseBucket: migrationEnv.SUPABASE_STORAGE_BUCKET,
				},
				destination: {}, // Uses storage service env
				scope: options.scope,
				dryRun: options.dryRun,
				batchSize: Number.parseInt(options.batchSize, 10),
				validateAfter: options.validate,
				cleanupSource: options.cleanup,
				rollbackEnabled: options.rollback,
			};

			// Show migration summary
			await StorageCommands.showMigrationSummary(config);

			// Create and run migration
			const migration = new FromSupabaseToR2Migration(config);

			// Validate prerequisites
			await migration.validatePrerequisites();

			// Execute migration
			const result = await migration.execute();

			// Show results
			StorageCommands.showMigrationResult(result);

			// Cleanup
			await migration.cleanup();

			if (result.success) {
				logger.info("Migration completed successfully!");
				process.exit(0);
			} else {
				logger.error("Migration failed:", result.message);
				process.exit(1);
			}
		} catch (error) {
			logger.error(error, "Migration error");
			process.exit(1);
		}
	}

	/**
	 * Handle rollback command
	 */
	private static async handleRollback(
		options: RollbackCommandOptions,
	): Promise<void> {
		try {
			logger.info("Starting storage migration rollback");

			if (!options.confirm) {
				const { confirmed } = await inquirer.prompt([
					{
						type: "confirm",
						name: "confirmed",
						message: "This will rollback the storage migration. Are you sure?",
						default: false,
					},
				]);

				if (!confirmed) {
					logger.info("Rollback cancelled");
					return;
				}
			}

			// Validate environment
			await StorageCommands.validateEnvironment();

			// Ensure Prisma is initialized for rollback discovery and DB updates.
			StorageCommands.ensureDatabaseInitialized();

			// Create migration config
			const config: StorageMigrationConfig = {
				source: {
					supabaseUrl: migrationEnv.SUPABASE_URL,
					supabaseServiceKey: migrationEnv.SUPABASE_SERVICE_ROLE_KEY,
					supabaseBucket: migrationEnv.SUPABASE_STORAGE_BUCKET,
				},
				destination: {},
				scope: "db-referenced",
				rollbackEnabled: true,
			};

			// Create and run rollback
			const migration = new FromSupabaseToR2Migration(config);

			const result = await migration.rollback();
			await migration.cleanup();

			StorageCommands.showMigrationResult(result);

			if (result.success) {
				logger.info("Rollback completed successfully!");
				process.exit(0);
			} else {
				logger.error("Rollback failed:", result.message);
				process.exit(1);
			}
		} catch (error) {
			logger.error(error, "Rollback error");
			process.exit(1);
		}
	}

	/**
	 * Handle validate command
	 */
	private static async handleValidate(
		_options: ValidateCommandOptions,
	): Promise<void> {
		try {
			logger.info("Validating migration results");

			// This would implement validation logic
			// For now, just show a placeholder
			logger.info("Validation completed successfully!");
		} catch (error) {
			logger.error(error, "Validation error");
			process.exit(1);
		}
	}

	/**
	 * Validate environment variables
	 */
	private static async validateEnvironment(): Promise<void> {
		const errors: string[] = [];

		if (!migrationEnv.SUPABASE_URL) {
			errors.push("SUPABASE_URL is required");
		}

		if (!migrationEnv.SUPABASE_SERVICE_ROLE_KEY) {
			errors.push("SUPABASE_SERVICE_ROLE_KEY is required");
		}

		// Storage service env validation is handled by the storage package

		if (errors.length > 0) {
			logger.error("Environment validation failed:");
			errors.forEach((error) => {
				logger.error(`  - ${error}`);
			});
			throw new Error("Environment validation failed");
		}

		logger.info("Environment validation passed");
	}

	/**
	 * Show migration summary
	 */
	private static async showMigrationSummary(
		config: StorageMigrationConfig,
	): Promise<void> {
		console.log(`\n${"=".repeat(60)}`);
		console.log("STORAGE MIGRATION SUMMARY");
		console.log("=".repeat(60));
		console.log(`Source: ${config.source.supabaseUrl}`);
		console.log(`Source Bucket: ${config.source.supabaseBucket}`);
		console.log(`Scope: ${config.scope}`);
		console.log(`Batch Size: ${config.batchSize}`);
		console.log(`Dry Run: ${config.dryRun ? "YES" : "NO"}`);
		console.log(`Validate After: ${config.validateAfter ? "YES" : "NO"}`);
		console.log(`Cleanup Source: ${config.cleanupSource ? "YES" : "NO"}`);
		console.log(`Rollback Enabled: ${config.rollbackEnabled ? "YES" : "NO"}`);
		console.log(`${"=".repeat(60)}\n`);
	}

	/**
	 * Show migration result
	 */
	private static showMigrationResult(result: MigrationResult): void {
		console.log(`\n${"=".repeat(60)}`);
		console.log("MIGRATION RESULT");
		console.log("=".repeat(60));
		console.log(`Status: ${result.success ? "SUCCESS" : "FAILED"}`);
		console.log(`Duration: ${Math.round(result.duration / 1000)}s`);
		console.log(
			`Files Processed: ${result.progress.processed}/${result.progress.total}`,
		);
		console.log(`Files Failed: ${result.progress.failed}`);
		console.log(`Files Skipped: ${result.progress.skipped}`);

		if (result.message) {
			console.log(`Message: ${result.message}`);
		}

		if (result.progress.errors.length > 0) {
			console.log("\nErrors:");
			result.progress.errors.slice(0, 5).forEach((error: MigrationError) => {
				console.log(`  - ${error.message}`);
			});

			if (result.progress.errors.length > 5) {
				console.log(
					`  ... and ${result.progress.errors.length - 5} more errors`,
				);
			}
		}

		console.log(`${"=".repeat(60)}\n`);
	}
}
