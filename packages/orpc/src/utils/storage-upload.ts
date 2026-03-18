import { StorageFileEntity } from "@dukkani/common/entities/storage/entity";
import { StorageFileQuery } from "@dukkani/common/entities/storage/query";
import type { StorageUploadTarget } from "@dukkani/common/schemas/storage/input";
import type {
	UploadFileOutput,
	UploadFilesOutput,
} from "@dukkani/common/schemas/storage/output";
import { StorageService as StorageDbService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { StorageService } from "@dukkani/storage";

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

	const storageFile = await database.$transaction(async (tx) => {
		return await StorageDbService.createStorageFileWithVariants(
			fileData,
			variants,
			tx,
		);
	});

	const uploadedFile = await database.storageFile.findUnique({
		where: { id: storageFile.id },
		include: StorageFileQuery.getInclude(),
	});

	if (!uploadedFile) {
		await StorageService.deleteFile(result.bucket, result.path);
		throw new Error("Failed to retrieve uploaded file");
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

	const fileIds = await database.$transaction(async (tx) => {
		const createdFileIds: string[] = [];

		for (const result of results) {
			try {
				const fileData = StorageFileEntity.createFileData(result);
				const variants = StorageFileEntity.createVariantData(result);

				const storageFile =
					await StorageDbService.createStorageFileWithVariants(
						fileData,
						variants,
						tx,
					);

				createdFileIds.push(storageFile.id);
			} catch (error) {
				logger.error(
					{
						error,
						result,
					},
					"Failed to create database record for uploaded file",
				);
			}
		}

		return createdFileIds;
	});

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
