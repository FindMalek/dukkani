import { logger } from "@dukkani/logger";
import { Command } from "commander";
import inquirer from "inquirer";
import {
	type CreateMigrationOptions,
	MigrationTemplateGenerator,
} from "../../scripts/create-migration";

/**
 * Migration creation commands
 */
export class CreateCommands {
	/**
	 * Create migration command
	 */
	static createCreateCommand(): Command {
		const command = new Command("create")
			.description("Create a new migration")
			.option("-n, --name <name>", "Migration name")
			.option("-t, --type <type>", "Migration type (storage, database, base)")
			.option("--no-interactive", "Skip interactive prompts")
			.option("--dry-run", "Show what would be created without creating files")
			.action(async (options) => {
				await CreateCommands.handleCreate(options);
			});

		return command;
	}

	/**
	 * Create storage migration command
	 */
	static createStorageCommand(): Command {
		const command = new Command("create:storage")
			.description("Create a new storage migration")
			.argument("[name]", "Migration name")
			.option("--no-interactive", "Skip interactive prompts")
			.option("--dry-run", "Show what would be created without creating files")
			.action(async (name, options) => {
				const createOptions = {
					...options,
					name,
					type: "storage",
				};
				await CreateCommands.handleCreate(createOptions);
			});

		return command;
	}

	/**
	 * Create database migration command
	 */
	static createDatabaseCommand(): Command {
		const command = new Command("create:database")
			.description("Create a new database migration")
			.argument("[name]", "Migration name")
			.option("--no-interactive", "Skip interactive prompts")
			.option("--dry-run", "Show what would be created without creating files")
			.action(async (name, options) => {
				const createOptions = {
					...options,
					name,
					type: "database",
				};
				await CreateCommands.handleCreate(createOptions);
			});

		return command;
	}

	/**
	 * Handle create command
	 */
	private static async handleCreate(
		options: CreateMigrationOptions,
	): Promise<void> {
		try {
			const createOptions: CreateMigrationOptions = options;
			// If no name provided and interactive mode is enabled, prompt for it
			if (!createOptions.name && createOptions.interactive !== false) {
				const answers = await inquirer.prompt([
					{
						type: "input",
						name: "name",
						message: "Migration name (e.g., migrate-user-avatars):",
						validate: (input: string) => {
							if (!input.trim()) {
								return "Migration name is required";
							}
							const generator = new MigrationTemplateGenerator();
							if (!generator.validateName(input.trim())) {
								return "Name must start with letter, contain only letters, numbers, hyphens, underscores (3-50 chars)";
							}
							return true;
						},
					},
				]);
				createOptions.name = answers.name;
			}

			// If no type provided and interactive mode is enabled, prompt for it
			if (!createOptions.type && createOptions.interactive !== false) {
				const answers = await inquirer.prompt([
					{
						type: "list",
						name: "type",
						message: "Migration type:",
						choices: [
							{
								name: "Storage Migration (for file/storage migrations)",
								value: "storage",
							},
							{
								name: "Database Migration (for schema/data migrations)",
								value: "database",
							},
							{
								name: "Base Migration (custom migration logic)",
								value: "base",
							},
						],
					},
				]);
				createOptions.type = answers.type;
			}

			// Validate required options
			if (!createOptions.name) {
				logger.error("Migration name is required");
				process.exit(1);
			}

			if (!createOptions.type) {
				logger.error("Migration type is required");
				process.exit(1);
			}

			// Create the migration
			const generator = new MigrationTemplateGenerator();
			await generator.generateMigration(createOptions);
		} catch (error) {
			logger.error(
				`Failed to create migration: ${error instanceof Error ? error.message : String(error)}`,
			);
			process.exit(1);
		}
	}
}
