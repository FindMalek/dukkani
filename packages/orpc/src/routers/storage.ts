import { StorageFileEntity } from "@dukkani/common/entities/storage/entity";
import { StorageFileQuery } from "@dukkani/common/entities/storage/query";
import {
	deleteFileInputSchema,
	deleteFilesInputSchema,
	uploadFileInputSchema,
	uploadFilesInputSchema,
} from "@dukkani/common/schemas/storage/input";
import type {
	UploadFileOutput,
	UploadFilesOutput,
} from "@dukkani/common/schemas/storage/output";
import {
	uploadFileOutputSchema,
	uploadFilesOutputSchema,
} from "@dukkani/common/schemas/storage/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { StorageService as StorageDbService } from "@dukkani/common/services/storageService";
import { database } from "@dukkani/db";
import { StorageService } from "@dukkani/storage";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";

export const storageRouter = {
	/**
	 * Upload a single file
	 */
	upload: protectedProcedure
		.input(uploadFileInputSchema)
		.output(uploadFileOutputSchema)
		.handler(async ({ input }): Promise<UploadFileOutput> => {
			try {
				// Upload file to storage
				const result = await StorageService.uploadFile(
					input.file,
					input.bucket,
					{ alt: input.alt },
				);

				// Create database record with variants
				const fileData = StorageFileEntity.createFileData(result);
				const variants = StorageFileEntity.createVariantData(result);

				// Use transaction to ensure atomicity
				const storageFile = await database.$transaction(async (tx) => {
					return await StorageDbService.createStorageFileWithVariants(
						fileData,
						variants,
						tx,
					);
				});

				// Fetch complete file with variants
				const file = await database.storageFile.findUnique({
					where: { id: storageFile.id },
					include: StorageFileQuery.getInclude(),
				});

				if (!file) {
					// Cleanup uploaded file if DB insert failed
					await StorageService.deleteFile(input.bucket, result.path);
					throw new ORPCError("INTERNAL_SERVER_ERROR", {
						message: "Failed to retrieve uploaded file",
					});
				}

				return {
					file: StorageFileEntity.getRo(file),
				};
			} catch (error) {
				if (error instanceof ORPCError) {
					throw error;
				}
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message:
						error instanceof Error ? error.message : "Failed to upload file",
				});
			}
		}),

	/**
	 * Upload multiple files
	 */
	uploadMany: protectedProcedure
		.input(uploadFilesInputSchema)
		.output(uploadFilesOutputSchema)
		.handler(async ({ input }): Promise<UploadFilesOutput> => {
			try {
				// Upload all files to storage
				const results = await StorageService.uploadFiles(
					input.files,
					input.bucket,
					{ alt: input.alt },
				);

				// Create database records in transaction
				const fileIds = await database.$transaction(async (tx) => {
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

				// Fetch all files with variants
				const filesWithVariants = await database.storageFile.findMany({
					where: {
						id: { in: fileIds },
					},
					include: StorageFileQuery.getInclude(),
				});

				return {
					files: filesWithVariants.map(StorageFileEntity.getRo),
				};
			} catch (error) {
				if (error instanceof ORPCError) {
					throw error;
				}
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message:
						error instanceof Error ? error.message : "Failed to upload files",
				});
			}
		}),

	/**
	 * Delete a single file
	 */
	delete: protectedProcedure
		.input(deleteFileInputSchema)
		.output(successOutputSchema)
		.handler(async ({ input }) => {
			try {
				// Get file paths (including variants) before deletion
				const file = await database.storageFile.findUnique({
					where: { id: input.id },
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

				if (!file) {
					throw new ORPCError("NOT_FOUND", {
						message: "File not found",
					});
				}

				// Extract paths from URLs (Supabase public URLs format: /storage/v1/object/public/{bucket}/{path})
				const paths = [file.path];
				for (const variant of file.variants) {
					try {
						const url = new URL(variant.url);
						// Extract path after /object/public/{bucket}/
						const pathMatch = url.pathname.match(
							/\/object\/public\/[^/]+\/(.+)$/,
						);
						if (pathMatch?.[1]) {
							paths.push(pathMatch[1]);
						}
					} catch {
						// If URL parsing fails, skip this variant
						console.warn("Failed to parse variant URL:", variant.url);
					}
				}

				// Delete from storage and database in transaction
				await database.$transaction(async (tx) => {
					// Delete from storage
					await StorageService.deleteFiles(file.bucket, paths);

					// Delete from database (variants cascade delete)
					await StorageDbService.deleteStorageFile(file.id, tx);
				});

				return { success: true };
			} catch (error) {
				if (error instanceof ORPCError) {
					throw error;
				}
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message:
						error instanceof Error ? error.message : "Failed to delete file",
				});
			}
		}),

	/**
	 * Delete multiple files
	 */
	deleteMany: protectedProcedure
		.input(deleteFilesInputSchema)
		.output(successOutputSchema)
		.handler(async ({ input }) => {
			try {
				// Get all file records
				const files = await database.storageFile.findMany({
					where: {
						id: { in: input.ids },
					},
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

				if (files.length === 0) {
					return { success: true, deleted: 0 };
				}

				// Prepare paths for storage deletion (group by bucket)
				const filesByBucket = new Map<
					string,
					Array<{ paths: string[]; fileId: string }>
				>();
				for (const file of files) {
					const paths = [file.path];
					for (const variant of file.variants) {
						try {
							const url = new URL(variant.url);
							// Extract path after /object/public/{bucket}/
							const pathMatch = url.pathname.match(
								/\/object\/public\/[^/]+\/(.+)$/,
							);
							if (pathMatch?.[1]) {
								paths.push(pathMatch[1]);
							}
						} catch {
							// If URL parsing fails, skip this variant
							console.warn("Failed to parse variant URL:", variant.url);
						}
					}

					const bucketFiles = filesByBucket.get(file.bucket) ?? [];
					bucketFiles.push({ paths, fileId: file.id });
					filesByBucket.set(file.bucket, bucketFiles);
				}

				// Delete from database first (within transaction)
				await database.$transaction(async (tx) => {
					// Delete from database
					await Promise.all(
						files.map((file) =>
							StorageDbService.deleteStorageFile(file.id, tx),
						),
					);
				});

				// Delete from storage after DB commit succeeds
				const storageErrors: Array<{
					bucket: string;
					paths: string[];
					error: unknown;
				}> = [];
				for (const [bucket, bucketFiles] of filesByBucket.entries()) {
					const allPaths = bucketFiles.flatMap((f) => f.paths);
					if (allPaths.length > 0) {
						try {
							await StorageService.deleteFiles(bucket, allPaths);
						} catch (error) {
							// Log for cleanup - DB records are already deleted
							storageErrors.push({ bucket, paths: allPaths, error });
							console.error(
								"Failed to delete storage files, orphaned:",
								{ bucket, paths: allPaths },
								error,
							);
						}
					}
				}

				return {
					success: true,
					deleted: files.length,
					...(storageErrors.length > 0 && {
						warnings: storageErrors.length,
					}),
				};
			} catch (error) {
				if (error instanceof ORPCError) {
					throw error;
				}
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message:
						error instanceof Error ? error.message : "Failed to delete files",
				});
			}
		}),
};
