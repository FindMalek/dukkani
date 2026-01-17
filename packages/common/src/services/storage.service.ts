import type {
	CreateStorageFileData,
	CreateVariantData,
} from "@dukkani/common/schemas/storage/output";
import { database } from "@dukkani/db";
import type { PrismaClient } from "@prisma/client/extension";

/**
 * Storage database service - Database operations for storage files
 */
export class StorageService {
	/**
	 * Create a storage file record
	 */
	static async createStorageFile(
		data: CreateStorageFileData,
		tx?: PrismaClient,
	): Promise<{ id: string }> {
		const client = tx ?? database;
		const file = await client.storageFile.create({
			data,
			select: { id: true },
		});
		return file;
	}

	/**
	 * Create a storage file with variants
	 */
	static async createStorageFileWithVariants(
		fileData: CreateStorageFileData,
		variants: CreateVariantData[],
		tx?: PrismaClient,
	): Promise<{ id: string }> {
		const client = tx ?? database;
		const file = await client.storageFile.create({
			data: {
				...fileData,
				variants: {
					create: variants,
				},
			},
			select: { id: true },
		});
		return file;
	}

	/**
	 * Delete a storage file (variants cascade delete automatically)
	 */
	static async deleteStorageFile(id: string, tx?: PrismaClient): Promise<void> {
		const client = tx ?? database;
		await client.storageFile.delete({
			where: { id },
		});
	}

	/**
	 * Get a storage file by ID
	 */
	static async getStorageFileById(
		id: string,
		tx?: PrismaClient,
	): Promise<{
		id: string;
		bucket: string;
		path: string;
		variants: Array<{ path: string }>;
	} | null> {
		const client = tx ?? database;
		const file = await client.storageFile.findUnique({
			where: { id },
			select: {
				id: true,
				bucket: true,
				path: true,
				variants: {
					select: {
						url: true,
					},
				},
			},
		});
		return file;
	}

	/**
	 * Get storage file paths for deletion (including variants)
	 */
	static async getStorageFilePaths(
		id: string,
		tx?: PrismaClient,
	): Promise<{ bucket: string; paths: string[] } | null> {
		const client = tx ?? database;
		const file = await client.storageFile.findUnique({
			where: { id },
			select: {
				bucket: true,
				path: true,
				variants: {
					select: {
						url: true,
					},
				},
			},
		});

		if (!file) {
			return null;
		}

		// Extract paths from URLs (Supabase public URLs contain the path)
		const paths = [file.path];
		for (const variant of file.variants) {
			// Extract path from public URL
			const url = new URL(variant.url);
			const pathParts = url.pathname.split("/");
			const bucketIndex = pathParts.indexOf(file.bucket);
			if (bucketIndex >= 0 && bucketIndex < pathParts.length - 1) {
				paths.push(pathParts.slice(bucketIndex + 1).join("/"));
			}
		}

		return {
			bucket: file.bucket,
			paths,
		};
	}
}
