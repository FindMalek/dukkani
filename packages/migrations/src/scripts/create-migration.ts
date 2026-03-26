#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "@dukkani/logger";
import { program } from "commander";
import inquirer from "inquirer";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Migration creation options
 */
interface CreateMigrationOptions {
	name?: string;
	type?: "storage" | "database" | "base";
	interactive?: boolean;
	dryRun?: boolean;
}

/**
 * Migration template data
 */
interface MigrationTemplateData {
	name: string;
	className: string;
	description: string;
	timestamp: string;
	author?: string;
}

/**
 * Migration template generator
 */
class MigrationTemplateGenerator {
	private readonly migrationsDir: string;
	private readonly templatesDir: string;

	constructor() {
		this.migrationsDir = join(__dirname, "..", "migrations");
		this.templatesDir = join(
			__dirname,
			"..",
			"templates",
			"migration-templates",
		);
	}

	/**
	 * Format migration name to class name
	 */
	formatClassName(name: string): string {
		return `${name
			.split(/[-_]/)
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join("")}Migration`;
	}

	/**
	 * Get current timestamp (YYYYMMDDHHmmss) for migration naming
	 */
	getTimestamp(): string {
		const now = new Date();
		return [
			now.getFullYear(),
			String(now.getMonth() + 1).padStart(2, "0"),
			String(now.getDate()).padStart(2, "0"),
			String(now.getHours()).padStart(2, "0"),
			String(now.getMinutes()).padStart(2, "0"),
			String(now.getSeconds()).padStart(2, "0"),
		].join("");
	}

	/**
	 * Format file name with timestamp
	 */
	formatFileName(name: string, timestamp?: string): string {
		const ts = timestamp || this.getTimestamp();
		const formattedName = name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
		return `${ts}-${formattedName}.ts`;
	}

	/**
	 * Load migration template
	 */
	loadTemplate(type: string): string {
		const templatePath = join(this.templatesDir, `${type}.template`);
		try {
			return readFileSync(templatePath, "utf-8");
		} catch (error) {
			throw new Error(
				`Template not found: ${type}. Please ensure template exists at ${templatePath}`,
			);
		}
	}

	/**
	 * Replace template variables
	 */
	replaceTemplateVariables(
		template: string,
		data: MigrationTemplateData,
	): string {
		return template
			.replace(/\$\{MIGRATION_NAME\}/g, data.name)
			.replace(/\$\{CLASS_NAME\}/g, data.className)
			.replace(/\$\{DESCRIPTION\}/g, data.description)
			.replace(/\$\{TIMESTAMP\}/g, data.timestamp)
			.replace(/\$\{AUTHOR\}/g, data.author || "");
	}

	/**
	 * Validate migration name
	 */
	validateName(name: string): boolean {
		// Allow alphanumeric, hyphens, and underscores
		// Must start with letter, minimum 3 chars, max 50 chars
		const nameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,49}$/;
		return nameRegex.test(name);
	}

	/**
	 * Generate migration file
	 */
	async generateMigration(options: CreateMigrationOptions): Promise<void> {
		// Interactive mode or use provided options
		let migrationName = options.name;
		let migrationType = options.type;
		let description = `${migrationName || ""} migration`;
		let author: string | undefined;

		// Only use interactive mode if explicitly enabled or missing required options
		if (options.interactive !== false && (!migrationName || !migrationType)) {
			// Interactive prompts
			const answers = await inquirer.prompt([
				{
					type: "input",
					name: "name",
					message: "Migration name (e.g., migrate-user-avatars):",
					when: !migrationName,
					validate: (input: string) => {
						if (!input.trim()) {
							return "Migration name is required";
						}
						if (!this.validateName(input.trim())) {
							return "Name must start with letter, contain only letters, numbers, hyphens, underscores (3-50 chars)";
						}
						return true;
					},
				},
				{
					type: "list",
					name: "type",
					message: "Migration type:",
					when: !migrationType,
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
				{
					type: "input",
					name: "description",
					message: "Migration description:",
					default: (answers: { name?: string }) =>
						`${answers.name || migrationName} migration`,
				},
				{
					type: "input",
					name: "author",
					message: "Author name (optional):",
				},
			]);

			migrationName = migrationName || answers.name;
			migrationType = migrationType || answers.type;
			description = answers.description || description;
			author = answers.author;
		}

		if (!migrationName || !migrationType) {
			throw new Error(
				"Migration name and type are required. Use --name and --type options or run in interactive mode.",
			);
		}

		// Validate name
		if (!this.validateName(migrationName)) {
			throw new Error(
				"Invalid migration name. Use letters, numbers, hyphens, underscores (3-50 chars)",
			);
		}

		// Generate timestamp once
		const timestamp = this.getTimestamp();

		// Compute file paths once using the same timestamp
		const fileName = this.formatFileName(migrationName, timestamp);
		const filePath = join(this.migrationsDir, fileName);

		// Prepare template data using the same timestamp
		const templateData: MigrationTemplateData = {
			name: migrationName,
			className: this.formatClassName(migrationName),
			description: description,
			timestamp,
			author: author,
		};

		// Load and process template
		const template = this.loadTemplate(migrationType);
		const content = this.replaceTemplateVariables(template, templateData);

		// Dry run or actual creation
		if (options.dryRun) {
			logger.info("DRY RUN - Migration file that would be created:");
			logger.info(`File: ${filePath}`);
			logger.info("Content:");
			console.log(content);
			return;
		}

		// Atomic write - fails if file exists
		try {
			writeFileSync(filePath, content, { flag: "wx", encoding: "utf-8" });
			logger.info(`Migration created successfully: ${fileName}`);
			logger.info(`Path: ${filePath}`);
			logger.info("Next steps:");
			logger.info(`1. Open ${fileName} and implement the migration logic`);
			logger.info("2. Run: pnpm migrate:storage -- --dry-run");
			logger.info("3. When ready: pnpm migrate:storage");
		} catch (error) {
			if (error instanceof Error && error.message.includes("EEXIST")) {
				throw new Error(`Migration file already exists: ${fileName}`);
			}
			throw new Error(`Failed to create migration file: ${error}`);
		}
	}
}

/**
 * CLI setup and execution
 */
async function main(): Promise<void> {
	program
		.name("migration:create")
		.description("Create a new migration file")
		.option("-n, --name <name>", "Migration name")
		.option("-t, --type <type>", "Migration type (storage, database, base)")
		.option("--no-interactive", "Skip interactive prompts")
		.option("--dry-run", "Show what would be created without creating files")
		.argument("[name]", "Migration name (optional)")
		.action(async (name, options: CreateMigrationOptions) => {
			try {
				// If name is provided as argument, use it
				if (name && !options.name) {
					options.name = name;
				}
				const generator = new MigrationTemplateGenerator();
				await generator.generateMigration(options);
			} catch (error) {
				logger.error({ error }, "Failed to create migration");
				process.exit(1);
			}
		});

	// Parse command line arguments
	await program.parseAsync();

	// If no arguments provided, show help
	if (process.argv.length <= 2) {
		program.outputHelp();
	}
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
	main().catch((error) => {
		logger.error("Migration generator error:", error);
		process.exit(1);
	});
}

export type { CreateMigrationOptions };
export { MigrationTemplateGenerator };
