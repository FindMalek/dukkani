import { DatabaseMigration } from "../../../database/database-migration";

interface DatabaseMigrationRegistryEntry {
  name: string;
  version: string;
  create: () => DatabaseMigration;
}

export const migrations: DatabaseMigrationRegistryEntry[] = [];
