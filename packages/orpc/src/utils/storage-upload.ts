import { StorageFileEntity } from "@dukkani/common/entities/storage/entity";
import {
	type StorageFileIncludeDbData,
	StorageFileQuery,
} from "@dukkani/common/entities/storage/query";
import type { StorageUploadTarget } from "@dukkani/common/schemas/storage/input";
import type {
	UploadFileOutput,
	UploadFilesOutput,
} from "@dukkani/common/schemas/storage/output";
import { StorageService as StorageDbService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";
import { env } from "@dukkani/storage/env";

/**
 * Extract storage paths from variant URLs for cleanup
 */
function extractVariantPaths(variants: { url: string }[]): string[] {
	const baseUrl = env.S3_PUBLIC_BASE_URL.endsWith("/")
		? env.S3_PUBLIC_BASE_URL.slice(0, -1)
		: env.S3_PUBLIC_BASE_URL;

	return variants.map((variant) => variant.url.replace(`${baseUrl}/`, ""));
}

/**
 * Clean up uploaded files and variants on failure
 */
async function cleanupUploadedFiles(
	bucket: string,
	originalPath: string,
	variants: { url: string }[],
): Promise<void> {
	try {
		// Delete original file
		await StorageService.deleteFile(bucket, originalPath);

		// Delete all variants
		if (variants.length > 0) {
			const variantPaths = extractVariantPaths(variants);
			await StorageService.deleteFiles(bucket, variantPaths);

			logger.info(
				{
					bucket,
					originalPath,
					variantCount: variantPaths.length,
					totalFilesDeleted: variantPaths.length + 1,
				},
				"Successfully cleaned up uploaded files",
			);
		} else {
			logger.info(
				{
					bucket,
					originalPath,
					totalFilesDeleted: 1,
				},
				"Successfully cleaned up uploaded file (no variants)",
			);
		}
	} catch (cleanupError) {
		logger.error(
			{
				cleanupError,
				bucket,
				originalPath,
				variantCount: variants.length,
			},
			"Failed to clean up uploaded files",
		);
		// Don't rethrow - original error is more important
	}
}

/**
 * Clean up multiple uploaded files and their variants
 */
async function cleanupMultipleUploadedFiles(
	results: Array<{ bucket: string; path: string; variants: { url: string }[] }>,
): Promise<void> {
	const cleanupPromises = results.map(async (result) => {
		try {
			await cleanupUploadedFiles(result.bucket, result.path, result.variants);
		} catch (cleanupError) {
			logger.error(
				{
					cleanupError,
					bucket: result.bucket,
					path: result.path,
				},
				"Failed to cleanup individual file during batch cleanup",
			);
		}
	});

	await Promise.allSettled(cleanupPromises);
}

/**
 * Internal helper to execute a single file upload.
 * Used by domain-specific upload endpoints (product, store, account).
 */
export async function executeUploadFile(
	file: File,
	target: StorageUploadTarget,
	alt?: string,
): Promise<UploadFileOutput> {
	const result = await StorageService.uploadFile(file, {
		alt,
		target,
	});

	const fileData = StorageFileEntity.createFileData(result);
	const variants = StorageFileEntity.createVariantData(result);

	let storageFile: Awaited<
		ReturnType<typeof StorageDbService.createStorageFileWithVariants>
	>;

	try {
		storageFile = await database.$transaction(async (tx) => {
			return await StorageDbService.createStorageFileWithVariants(
				fileData,
				variants,
				tx,
			);
		});
	} catch (error) {
		logger.error(
			{
				error,
				bucket: result.bucket,
				originalPath: result.path,
				variantCount: variants.length,
				fileSize: result.fileSize,
			},
			"Database persistence failed, cleaning up uploaded files",
		);

		await cleanupUploadedFiles(result.bucket, result.path, variants);
		throw error;
	}

	let uploadedFile: StorageFileIncludeDbData;

	try {
		const result = await database.storageFile.findUnique({
			where: { id: storageFile.id },
			include: StorageFileQuery.getInclude(),
		});

		if (!result) {
			throw new Error("Failed to retrieve uploaded file");
		}

		uploadedFile = result;
	} catch (error) {
		logger.error(
			{
				error,
				bucket: result.bucket,
				originalPath: result.path,
				variantCount: variants.length,
				storageFileId: storageFile.id,
			},
			"Database retrieval failed, cleaning up uploaded files",
		);

		await cleanupUploadedFiles(result.bucket, result.path, variants);
		throw error;
	}

	return {
		file: StorageFileEntity.getRo(uploadedFile),
	};
}

/**
 * Internal helper to execute multiple file uploads.
 * Used by domain-specific upload endpoints (product).
 */
export async function executeUploadFiles(
	files: File[],
	target: StorageUploadTarget,
	alt?: string,
): Promise<UploadFilesOutput> {
	const results = await StorageService.uploadFiles(files, {
		alt,
		target,
	});

	if (results.length === 0) {
		throw new Error("All file uploads failed");
	}

	let fileIds: string[];

	try {
		fileIds = await database.$transaction(async (tx) => {
			const createdFileIds: string[] = [];

			for (const result of results) {
				const fileData = StorageFileEntity.createFileData(result);
				const variants = StorageFileEntity.createVariantData(result);

				const storageFile =
					await StorageDbService.createStorageFileWithVariants(
						fileData,
						variants,
						tx,
					);

				createdFileIds.push(storageFile.id);
			}

			return createdFileIds;
		});
	} catch (error) {
		logger.error(
			{
				error,
				uploadedCount: results.length,
				totalFileSize: results.reduce((sum, r) => sum + r.fileSize, 0),
				files: results.map((r) => ({
					bucket: r.bucket,
					path: r.path,
					fileSize: r.fileSize,
					variantCount: r.variants.length,
				})),
			},
			"Database transaction failed, cleaning up all uploaded files",
		);

		// Clean up all uploaded files on transaction failure
		await cleanupMultipleUploadedFiles(results);

		throw new AggregateError(
			[error],
			`Failed to persist ${results.length} uploaded files (${results.reduce((sum, r) => sum + r.fileSize, 0)} bytes total) to database. All uploaded files have been cleaned up.`,
		);
	}

	const filesWithVariants = await database.storageFile.findMany({
		where: {
			id: { in: fileIds },
		},
		include: StorageFileQuery.getInclude(),
	});

	return {
		files: filesWithVariants.map(StorageFileEntity.getRo),
	};
}
