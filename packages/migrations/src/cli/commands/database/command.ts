import { Command } from "commander";
import { migrations } from "./migrations";

const runCommand = new Command("run")
  .description("Run database migrations")
  .option("-n, --name <name>", "Migration name")
  .option("-p, --pattern <pattern>", "Pattern to match migrations")
  .action(async (options) => {
    const { name, pattern } = options;

    if (!name && !pattern) {
      throw new Error(
        "Please provide at least one selector: --name or --pattern",
      );
    }

    const selected = new Map<string, (typeof migrations)[number]>();

    if (name) {
      const migration = migrations.find((entry) => entry.name === name);
      if (!migration) {
        throw new Error(`Migration ${name} not found`);
      }
      selected.set(migration.name, migration);
    }

    if (pattern) {
      let regex: RegExp;
      try {
        regex = new RegExp(pattern);
      } catch (error) {
        throw new Error(
          `Invalid pattern "${pattern}": ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      const patternMatches = migrations.filter((entry) =>
        regex.test(entry.name),
      );
      if (patternMatches.length === 0) {
        throw new Error(`No migrations found with pattern ${pattern}`);
      }

      for (const migration of patternMatches) {
        selected.set(migration.name, migration);
      }
    }

    for (const migration of selected.values()) {
      await migration.create().execute();
    }
  });

export const dbCommand = new Command("db")
  .description("Database migration commands")
  .addCommand(runCommand);
