/**
 * Migration script: Copy objects from Supabase Storage to R2 and update DB URLs.
 *
 * Prerequisites:
 * - Source: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET (default: production)
 * - Destination: S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_PUBLIC_BASE_URL
 * - Database: DATABASE_URL (for DB URL updates; optional with --list-bucket only)
 *
 * Usage:
 *   pnpm migrate:storage-to-r2              # Migrate objects referenced in DB
 *   pnpm migrate:storage-to-r2 -- --dry-run  # Plan only (DB-referenced)
 *   pnpm migrate:storage-to-r2 -- --list-bucket        # Migrate ALL objects in bucket
 *   pnpm migrate:storage-to-r2 -- --list-bucket --dry-run  # List bucket contents only
 *
 * By default, only objects referenced in storage_files, storage_file_variants, images
 * are migrated. Use --list-bucket to migrate everything in the Supabase bucket.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

// Load root .env before imports that use env validation (ESM hoists static imports)
const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), "../../../../"); // packages/ci-tools/src/commands -> repo root
config({ path: path.join(rootDir, ".env") });

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");
const LIST_BUCKET = process.argv.includes("--list-bucket");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET ?? "production";

const S3_ENDPOINT = process.env.S3_ENDPOINT;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_PUBLIC_BASE_URL = process.env.S3_PUBLIC_BASE_URL;

function requireEnv(name: string): string {
	const val = process.env[name];
	if (!val || val.trim() === "") {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return val.trim();
}

function validateUrl(url: string, name: string): string {
	try {
		const urlObj = new URL(url);
		if (!urlObj.protocol || !urlObj.hostname) {
			throw new Error(`Invalid URL format for ${name}`);
		}
		return url;
	} catch (error) {
		throw new Error(
			`Invalid URL for ${name}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

function validateEnvironmentVariables(): void {
	// Always validate basic environment structure
	const errors: string[] = [];

	// Check for conflicting or invalid configurations
	if (DRY_RUN && LIST_BUCKET) {
		// In dry-run with list-bucket, we still need source for listing
		if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
			errors.push(
				"Source environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are required for bucket listing",
			);
		}
	}

	if (!DRY_RUN) {
		// For actual migration, validate all required variables
		try {
			validateUrl(requireEnv("S3_ENDPOINT"), "S3_ENDPOINT");
			requireEnv("S3_ACCESS_KEY_ID");
			requireEnv("S3_SECRET_ACCESS_KEY");
			requireEnv("S3_BUCKET");
			validateUrl(requireEnv("S3_PUBLIC_BASE_URL"), "S3_PUBLIC_BASE_URL");
		} catch (error) {
			errors.push(error instanceof Error ? error.message : String(error));
		}
	}

	if (errors.length > 0) {
		console.error("Environment validation failed:");
		errors.forEach((error) => console.error(`  - ${error}`));
		process.exit(1);
	}
}

/** Extract path from Supabase public URL: .../object/public/{bucket}/{path} */
function pathFromSupabaseUrl(url: string, bucket: string): string | null {
	try {
		const suffix = `/object/public/${bucket}/`;
		const idx = url.indexOf(suffix);
		if (idx === -1) return null;
		return url.slice(idx + suffix.length);
	} catch {
		return null;
	}
}

/** Recursively list all file paths in a Supabase bucket folder */
async function listBucketRecursive(
	supabase: ReturnType<typeof createClient>,
	bucket: string,
	folder = "",
): Promise<string[]> {
	const { data, error } = await supabase.storage.from(bucket).list(folder, {
		limit: 1000,
	});
	if (error)
		throw new Error(`List failed for ${folder || "/"}: ${error.message}`);
	const paths: string[] = [];
	for (const item of data ?? []) {
		const fullPath = folder ? `${folder}/${item.name}` : item.name;
		if (item.id == null) {
			// Folder (no id) - recurse
			paths.push(...(await listBucketRecursive(supabase, bucket, fullPath)));
		} else {
			paths.push(fullPath);
		}
	}
	return paths;
}

async function main() {
	// Validate environment variables upfront
	validateEnvironmentVariables();

	// DB only needed when migrating (copy/update) or when using DB-referenced paths
	const needsDb = !LIST_BUCKET || !DRY_RUN;
	let database: Awaited<
		ReturnType<typeof import("@dukkani/db")["database"]>
	> | null = null;
	if (needsDb) {
		const { env: dbEnv } = await import("@dukkani/db/env");
		const dbModule = await import("@dukkani/db");
		dbModule.initializeDatabase({ DATABASE_URL: dbEnv.DATABASE_URL });
		database = dbModule.database;
	}

	if (DRY_RUN) {
		console.log("DRY RUN - no changes will be made\n");
	}
	if (LIST_BUCKET) {
		console.log(
			"LIST_BUCKET - migrating all objects in bucket (not just DB-referenced)\n",
		);
	}

	const supabaseBase =
		SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
			? `https://${new URL(SUPABASE_URL).hostname.replace(".supabase.co", "")}.supabase.co/storage/v1/object/public/${SUPABASE_BUCKET}/`
			: "";
	const r2Base = S3_PUBLIC_BASE_URL
		? S3_PUBLIC_BASE_URL.endsWith("/")
			? S3_PUBLIC_BASE_URL
			: S3_PUBLIC_BASE_URL + "/"
		: "";

	console.log(
		"Source:",
		supabaseBase || "(dry run - source URL not configured)",
	);
	console.log(
		"Destination:",
		r2Base || "(dry run - destination URL not configured)",
	);
	console.log("");

	let pathList: string[];

	if (LIST_BUCKET) {
		// List all objects from Supabase bucket
		const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
		console.log("Listing all objects in bucket...");
		pathList = await listBucketRecursive(supabase, SUPABASE_BUCKET);
	} else {
		// Collect paths from database (only migrate referenced objects)
		const paths = new Set<string>();
		if (!database) throw new Error("Database not initialized");

		const storageFiles = await database.storageFile.findMany({
			select: { path: true, originalUrl: true, url: true },
		});
		for (const f of storageFiles) {
			paths.add(f.path);
			const pathFromOrig = pathFromSupabaseUrl(f.originalUrl, SUPABASE_BUCKET);
			if (pathFromOrig) paths.add(pathFromOrig);
			const pathFromUrl = pathFromSupabaseUrl(f.url, SUPABASE_BUCKET);
			if (pathFromUrl) paths.add(pathFromUrl);
		}

		const variants = await database.storageFileVariant.findMany({
			select: { url: true },
		});
		for (const v of variants) {
			const p = pathFromSupabaseUrl(v.url, SUPABASE_BUCKET);
			if (p) paths.add(p);
		}

		const images = await database.image.findMany({ select: { url: true } });
		for (const img of images) {
			const p = pathFromSupabaseUrl(img.url, SUPABASE_BUCKET);
			if (p) paths.add(p);
		}

		pathList = [...paths];
	}
	console.log(`Found ${pathList.length} objects to migrate\n`);

	if (pathList.length === 0) {
		console.log("No objects to migrate.");
		return;
	}

	if (!DRY_RUN) {
		const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
		const s3 = new S3Client({
			region: "auto",
			endpoint: S3_ENDPOINT,
			credentials: {
				accessKeyId: S3_ACCESS_KEY_ID!,
				secretAccessKey: S3_SECRET_ACCESS_KEY!,
			},
			forcePathStyle: true,
		});

		let copied = 0;
		for (const path of pathList) {
			try {
				const { data, error } = await supabase.storage
					.from(SUPABASE_BUCKET)
					.download(path);

				if (error) {
					console.error(`Download failed ${path}:`, error.message);
					continue;
				}

				const body = Buffer.from(await data.arrayBuffer());

				await s3.send(
					new PutObjectCommand({
						Bucket: S3_BUCKET,
						Key: path,
						Body: body,
					}),
				);

				copied++;
				if (copied % 10 === 0) {
					console.log(`Copied ${copied}/${pathList.length}...`);
				}
			} catch (err) {
				console.error(`Copy failed ${path}:`, err);
			}
		}

		console.log(`\nCopied ${copied} objects to R2`);
	}

	// Update database URLs (skip in dry run)
	if (!DRY_RUN && database) {
		console.log("\nUpdating database URLs...");

		// Define allowed tables and columns for security
		const allowedUpdates = [
			{ table: "storage_files", columns: ["original_url", "url"] },
			{ table: "storage_file_variants", columns: ["url"] },
			{ table: "images", columns: ["url"] },
		] as const;

		for (const { table, columns } of allowedUpdates) {
			for (const col of columns) {
				try {
					// Use parameterized query to prevent SQL injection
					const result = await database.$executeRaw`
						UPDATE ${table} 
						SET ${col} = REPLACE(${col}, ${supabaseBase}, ${r2Base}) 
						WHERE ${col} LIKE ${`${supabaseBase}%`}
					`;
					console.log(`  ${table}.${col}: ${result} rows updated`);
				} catch (error) {
					console.error(`  Failed to update ${table}.${col}:`, error);
					throw error;
				}
			}
		}
	}

	console.log("\nMigration complete.");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
