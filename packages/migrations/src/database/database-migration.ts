import { createDatabase, type PrismaClient } from "@dukkani/db";
import { dbEnv } from "@dukkani/env/presets/db";
import logger from "@dukkani/logger";

export abstract class DatabaseMigration {
  database: PrismaClient = createDatabase(dbEnv);
  abstract version: string;
  abstract name: string;
  abstract runWhen: () => Promise<boolean>;
  protected abstract run: () => Promise<void>;
  abstract rollback: () => Promise<void>;
  abstract cleanup: () => Promise<void>;
  execute = async () => {
    try {
      await this.database.$connect();
      if (await this.runWhen()) {
        await this.run();
      }
    } catch (error) {
      logger.error({ error }, "Error executing migration");
      throw error;
    } finally {
      await this.database.$disconnect();
    }
  };
}
