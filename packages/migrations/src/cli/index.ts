#!/usr/bin/env node

import "./env-loader";
import { logger } from "@dukkani/logger";
import { Command } from "commander";
import { CreateCommands } from "./commands/create";
import { StorageCommands } from "./commands/storage";

/**
 * CLI entry point for migrations
 */
const program = new Command();

program
	.name("dukkani-migrate")
	.description("Dukkani migration CLI")
	.version("1.0.0");

// Add storage commands
const storageCommand = new Command("storage").description(
	"Storage migration commands",
);

storageCommand.addCommand(StorageCommands.createMigrateCommand());
storageCommand.addCommand(StorageCommands.createRollbackCommand());
storageCommand.addCommand(StorageCommands.createValidateCommand());

program.addCommand(storageCommand);

// Add creation commands
program.addCommand(CreateCommands.createCreateCommand());
program.addCommand(CreateCommands.createStorageCommand());
program.addCommand(CreateCommands.createDatabaseCommand());

// Global error handling
process.on("uncaughtException", (error) => {
	logger.error(error, "Uncaught exception");
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	logger.error({ promise, reason }, "Unhandled rejection");
	process.exit(1);
});

// Parse and execute
program.parse();
