#!/usr/bin/env node

import "./env-loader";
import { logger } from "@dukkani/logger";
import { Command } from "commander";
import { CreateCommands } from "./commands/create";
import { dbCommand } from "./commands/database/command";
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

program.addCommand(dbCommand);

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
// Commander treats `--` as end-of-options; pnpm sometimes forwards an extra `--`
// token which would prevent flags like `--dry-run` from being parsed.
const argv = process.argv.slice();
const firstDoubleDashIdx = argv.indexOf("--");
if (
  firstDoubleDashIdx !== -1 &&
  argv[firstDoubleDashIdx + 1]?.startsWith("--")
) {
  argv.splice(firstDoubleDashIdx, 1);
}

// Use parseAsync to properly await async command handlers
program.parseAsync(argv).catch((error) => {
  logger.error(error, "CLI command failed");
  process.exit(1);
});
