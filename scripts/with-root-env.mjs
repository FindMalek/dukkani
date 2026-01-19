import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// Load root .env file
config({ path: path.resolve(root, ".env") });

const [cmd, ...args] = process.argv.slice(2);
if (!cmd) process.exit(1);

spawn(cmd, args, { stdio: "inherit", shell: true, env: process.env });
