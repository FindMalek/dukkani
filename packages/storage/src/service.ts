import type {
	ProcessedImage,
	StorageFileResult,
} from "@dukkani/common/schemas/storage/output";
import { logger } from "@dukkani/logger";
import { addSpanAttributes, Trace, traceStaticClass } from "@dukkani/tracing";
import { nanoid } from "nanoid";
import { storageClient } from "./client";
import { env } from "./env";
import { ImageProcessor } from "./image-processor";

export type UploadOptions = {
	alt?: string;
};

/**
 * Storage service for file uploads and management
 * Handles Supabase Storage operations with image optimization
 */
class StorageServiceBase {
	/**
	 * Validate file before upload
	 */
	private static validateFile(file: File): void {
		// Check file size
		if (file.size > env.STORAGE_MAX_FILE_SIZE) {
			throw new Error(
				`File size exceeds maximum allowed size of ${env.STORAGE_MAX_FILE_SIZE} bytes`,
			);
		}

		// Check MIME type if configured
		if (env.STORAGE_ALLOWED_MIME_TYPES !== "*") {
			const allowedTypes = env.STORAGE_ALLOWED_MIME_TYPES.split(",").map((t) =>
				t.trim(),
			);
			const isAllowed = allowedTypes.some((type) => {
				if (type.endsWith("/*")) {
					return file.type.startsWith(type.slice(0, -1));
				}
				return file.type === type;
			});

			if (!isAllowed) {
				throw new Error(`File type ${file.type} is not allowed`);
			}
		}
	}

	/**
	 * Generate a unique file path
	 */
	private static generateFilePath(fileName: string): string {
		const id = nanoid();
		const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 50);
		return `${id}/${sanitizedName}`;
	}

	/**
	 * Get public URL for a file
	 */
	static getPublicUrl(bucket: string, path: string): string {
		const { data } = storageClient.storage.from(bucket).getPublicUrl(path);
		return data.publicUrl;
	}

	/**
	 * Upload a single file
	 */
	static async uploadFile(
		file: File,
		options?: UploadOptions,
	): Promise<StorageFileResult> {
		addSpanAttributes({
			"storage.bucket": env.STORAGE_BUCKET_NAME,
			"storage.file_size": file.size,
			"storage.file_type": file.type,
		});

		StorageService.validateFile(file);

		const isImage = ImageProcessor.isImage(file.type);
		const filePath = StorageService.generateFilePath(file.name);

		// Process image if applicable
		let processedImage: ProcessedImage | null = null;
		if (isImage) {
			try {
				processedImage = await ImageProcessor.processImage(file);
			} catch (error) {
				logger.error({ error }, "Image processing failed");
				throw new Error("Failed to process image");
			}
		}

		// For images: only upload compressed variants, skip original
		// For non-images: upload original file
		if (!isImage || !processedImage) {
			// Non-image file: upload original
			const originalBuffer = Buffer.from(await file.arrayBuffer());

			const { data: uploadData, error: uploadError } =
				await storageClient.storage
					.from(env.STORAGE_BUCKET_NAME)
					.upload(filePath, originalBuffer, {
						contentType: file.type,
						upsert: false,
					});

			if (uploadError) {
				// Safely extract error message without triggering JSON parsing
				let errorMessage = "Unknown upload error";
				try {
					if (typeof uploadError === "string") {
						errorMessage = uploadError;
					} else if (uploadError && typeof uploadError === "object") {
						// Try to get message property safely
						if (
							"message" in uploadError &&
							typeof uploadError.message === "string"
						) {
							errorMessage = uploadError.message;
						} else if (
							"error" in uploadError &&
							typeof uploadError.error === "string"
						) {
							errorMessage = uploadError.error;
						} else if (
							"name" in uploadError &&
							typeof uploadError.name === "string"
						) {
							errorMessage = uploadError.name;
						}
					}
				} catch {
					// If any error occurs during extraction, use fallback
					errorMessage = "Failed to upload file";
				}

				logger.error(
					{
						uploadError: errorMessage,
						fileName: file.name,
						filePath,
					},
					"File upload failed",
				);

				throw new Error(`Failed to upload file: ${errorMessage}`);
			}

			const originalUrl = StorageService.getPublicUrl(
				env.STORAGE_BUCKET_NAME,
				uploadData.path,
			);

			return {
				bucket: env.STORAGE_BUCKET_NAME,
				path: uploadData.path,
				originalUrl,
				url: originalUrl,
				mimeType: file.type,
				fileSize: file.size,
				variants: [],
			};
		}

		// Image file: upload only compressed variants
		const variants: StorageFileResult["variants"] = [];
		const variantUploadPromises = processedImage.variants
			.filter(
				(variant): variant is typeof variant & { buffer: Buffer } =>
					variant.buffer !== undefined,
			)
			.map(async (variant) => {
				const variantPath = `${filePath.replace(/\.[^/.]+$/, "")}_${variant.variant.toLowerCase()}.${variant.mimeType.split("/")[1]}`;

				const { data: variantData, error: variantError } =
					await storageClient.storage
						.from(env.STORAGE_BUCKET_NAME)
						.upload(variantPath, variant.buffer, {
							contentType: variant.mimeType,
							upsert: false,
						});

				if (variantError) {
					// Safely extract error message without triggering JSON parsing
					let errorMessage = "Unknown upload error";
					try {
						if (typeof variantError === "string") {
							errorMessage = variantError;
						} else if (variantError && typeof variantError === "object") {
							// Try to get message property safely
							if (
								"message" in variantError &&
								typeof variantError.message === "string"
							) {
								errorMessage = variantError.message;
							} else if (
								"error" in variantError &&
								typeof variantError.error === "string"
							) {
								errorMessage = variantError.error;
							} else if (
								"name" in variantError &&
								typeof variantError.name === "string"
							) {
								errorMessage = variantError.name;
							}
						}
					} catch {
						// If any error occurs during extraction, use fallback
						errorMessage = "Failed to upload variant";
					}

					logger.error(
						{
							variant: variant.variant,
							error: errorMessage,
							fileName: file.name,
						},
						"Failed to upload variant",
					);
					return null;
				}

				return {
					variant: variant.variant,
					url: StorageService.getPublicUrl(
						env.STORAGE_BUCKET_NAME,
						variantData.path,
					),
					width: variant.width,
					height: variant.height,
					fileSize: variant.fileSize,
				};
			});

		const uploadedVariants = await Promise.all(variantUploadPromises);
		variants.push(
			...uploadedVariants.filter((v): v is NonNullable<typeof v> => v !== null),
		);

		// Ensure we have at least one variant
		if (variants.length === 0) {
			throw new Error("Failed to upload any image variants");
		}

		// Use MEDIUM variant as the "original" (primary file)
		const mediumVariant = variants.find((v) => v.variant === "MEDIUM");
		// TypeScript now knows variants[0] exists because we checked length > 0
		const primaryVariant = mediumVariant || variants[0];
		if (!primaryVariant) {
			throw new Error("Failed to upload any image variants");
		}

		// Use the primary variant's path (without the variant suffix) as the base path
		const basePath = filePath.replace(/\.[^/.]+$/, "");
		const primaryPath = `${basePath}_${primaryVariant.variant.toLowerCase()}.${primaryVariant.url.split(".").pop()?.split("?")[0] || "webp"}`;

		return {
			bucket: env.STORAGE_BUCKET_NAME,
			path: primaryPath,
			originalUrl: primaryVariant.url,
			url: primaryVariant.url,
			mimeType: primaryVariant.url.includes("webp")
				? "image/webp"
				: "image/jpeg",
			fileSize: primaryVariant.fileSize,
			optimizedSize: processedImage.optimizedSize,
			width: primaryVariant.width,
			height: primaryVariant.height,
			alt: options?.alt,
			variants,
		};
	}

	/**
	 * Upload multiple files
	 */
	static async uploadFiles(
		files: File[],
		options?: UploadOptions,
	): Promise<StorageFileResult[]> {
		// Validate all files first
		for (const file of files) {
			StorageService.validateFile(file);
		}

		// Upload files in parallel
		const uploadPromises = files.map((file) =>
			StorageService.uploadFile(file, options).catch((error) => {
				// Safely extract error message
				const errorMessage =
					error instanceof Error
						? error.message
						: typeof error === "string"
							? error
							: JSON.stringify(error);

				logger.error(
					{
						error,
						fileName: file.name,
					},
					"File upload failed in batch",
				);

				// Return error result instead of throwing
				return {
					error: errorMessage,
					fileName: file.name,
				} as const;
			}),
		);

		const results = await Promise.all(uploadPromises);

		// Separate successful uploads from errors
		const successful: StorageFileResult[] = [];
		const errors: Array<{ fileName: string; error: string }> = [];

		for (const result of results) {
			if ("error" in result) {
				errors.push({ fileName: result.fileName, error: result.error });
			} else {
				successful.push(result);
			}
		}

		// If there are errors, log them but still return successful uploads
		if (errors.length > 0) {
			logger.warn(
				{
					errors,
					successfulCount: successful.length,
					failedCount: errors.length,
				},
				"Some files failed to upload",
			);
		}

		return successful;
	}

	/**
	 * Delete a single file
	 */
	static async deleteFile(bucket: string, path: string): Promise<void> {
		const { error } = await storageClient.storage.from(bucket).remove([path]);

		if (error) {
			throw new Error(`Failed to delete file: ${error.message}`);
		}
	}

	/**
	 * Delete multiple files
	 */
	static async deleteFiles(bucket: string, paths: string[]): Promise<void> {
		if (paths.length === 0) {
			return;
		}

		const { error } = await storageClient.storage.from(bucket).remove(paths);

		if (error) {
			throw new Error(`Failed to delete files: ${error.message}`);
		}
	}
}

export const StorageService = traceStaticClass(StorageServiceBase);
