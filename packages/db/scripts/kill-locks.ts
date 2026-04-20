/**
 * Terminates idle/stuck Prisma connections that may hold advisory locks,
 * preventing `prisma migrate` from acquiring its own lock.
 *
 * Run this before `prisma migrate dev` / `prisma migrate reset` when
 * hitting P1002 advisory lock timeouts on Neon.
 */
import path from "node:path";
import { config } from "dotenv";
import pg from "pg";

if (!process.env.VERCEL) {
  config({ path: path.resolve(import.meta.dirname, "../../../.env") });
}

const rawUrl = process.env.DATABASE_URL ?? "";
// Use direct (non-pooler) connection — advisory locks require session scope.
const url = process.env.DATABASE_URL_UNPOOLED ?? rawUrl.replace(/-pooler\./g, ".");

const client = new pg.Client({ connectionString: url });

await client.connect();

const { rows } = await client.query<{ pid: number; state: string; app: string }>(`
  SELECT pid, state, application_name AS app
  FROM pg_stat_activity
  WHERE pid != pg_backend_pid()
    AND state IN ('idle', 'idle in transaction', 'idle in transaction (aborted)')
`);

if (rows.length === 0) {
  console.log("No idle sessions to terminate.");
} else {
  for (const row of rows) {
    await client.query("SELECT pg_terminate_backend($1)", [row.pid]);
    console.log(`Terminated pid=${row.pid} state=${row.state} app=${row.app}`);
  }
}

await client.end();
