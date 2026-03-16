#!/usr/bin/env node

import { logger } from "@dukkani/logger";
import { Command } from "commander";
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

// Global error handling
process.on("uncaughtException", (error) => {
	logger.error("Uncaught exception:", error);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	logger.error("Unhandled rejection at:", promise, "reason:", reason);
	process.exit(1);
});

// Parse and execute
program.parse();
