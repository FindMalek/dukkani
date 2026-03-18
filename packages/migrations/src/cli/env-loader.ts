/**
 * Load .env before any other imports.
 * Must be imported first in the CLI entry point so process.env is populated
 * before baseEnv (from @dukkani/env) is validated.
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), "../../.env") });
