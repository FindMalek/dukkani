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
		bucket: string,
		options?: UploadOptions,
	): Promise<StorageFileResult> {
		addSpanAttributes({
			"storage.bucket": bucket,
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
				// If image processing fails, upload original
				logger.warn({ error }, "Image processing failed, uploading original");
			}
		}

		// Upload original file
		// Upload original file
		const originalBuffer =
			processedImage?.original.buffer ?? Buffer.from(await file.arrayBuffer());

		const { data: uploadData, error: uploadError } = await storageClient.storage
			.from(bucket)
			.upload(filePath, originalBuffer, {
				contentType: file.type,
				upsert: false,
			});

		if (uploadError) {
			throw new Error(`Failed to upload file: ${uploadError.message}`);
		}

		const originalUrl = StorageService.getPublicUrl(bucket, uploadData.path);

		// Upload variants if image was processed
		const variants: StorageFileResult["variants"] = [];
		if (processedImage) {
			const variantUploadPromises = processedImage.variants
				.filter(
					(variant): variant is typeof variant & { buffer: Buffer } =>
						variant.buffer !== undefined,
				)
				.map(async (variant) => {
					const variantPath = `${filePath.replace(/\.[^/.]+$/, "")}_${variant.variant.toLowerCase()}.${variant.mimeType.split("/")[1]}`;

					const { data: variantData, error: variantError } =
						await storageClient.storage
							.from(bucket)
							.upload(variantPath, variant.buffer, {
								contentType: variant.mimeType,
								upsert: false,
							});

					if (variantError) {
						logger.warn(
							{ variant: variant.variant, error: variantError },
							"Failed to upload variant",
						);
						return null;
					}

					return {
						variant: variant.variant,
						url: StorageService.getPublicUrl(bucket, variantData.path),
						width: variant.width,
						height: variant.height,
						fileSize: variant.fileSize,
					};
				});

			const uploadedVariants = await Promise.all(variantUploadPromises);
			variants.push(
				...uploadedVariants.filter(
					(v): v is NonNullable<typeof v> => v !== null,
				),
			);
		}

		// Use medium variant URL as default, or original if no variants
		const defaultUrl =
			variants.find((v) => v.variant === "MEDIUM")?.url || originalUrl;

		return {
			bucket,
			path: uploadData.path,
			originalUrl,
			url: defaultUrl,
			mimeType: file.type,
			fileSize: file.size,
			optimizedSize: processedImage?.optimizedSize,
			width: processedImage?.original.width,
			height: processedImage?.original.height,
			alt: options?.alt,
			variants,
		};
	}

	/**
	 * Upload multiple files
	 */
	static async uploadFiles(
		files: File[],
		bucket: string,
		options?: UploadOptions,
	): Promise<StorageFileResult[]> {
		// Validate all files first
		for (const file of files) {
			StorageService.validateFile(file);
		}

		// Upload files in parallel
		const uploadPromises = files.map((file) =>
			StorageService.uploadFile(file, bucket, options).catch((error) => {
				// Return error result instead of throwing
				return {
					error: error instanceof Error ? error.message : String(error),
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
			logger.warn({ errors }, "Some files failed to upload");
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