import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import type {
	ProcessedImage,
	StorageFileResult,
} from "@dukkani/common/schemas/storage/output";
import { logger } from "@dukkani/logger";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { nanoid } from "nanoid";
import { getS3Client } from "./client";
import { env } from "./env";
import { ImageProcessor } from "./image-processor";

export type UploadOptions = {
	alt?: string;
};

/**
 * Storage service for file uploads and management
 * Handles S3-compatible storage (R2/MinIO) with image optimization
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
	 * Health check: upload and delete a test object to verify storage connectivity
	 */
	static async checkHealth(): Promise<{ ok: true; latencyMs: number }> {
		const key = `_health/check-${Date.now()}`;
		const client = getS3Client();
		const start = Date.now();

		await client.send(
			new PutObjectCommand({
				Bucket: env.S3_BUCKET,
				Key: key,
				Body: "",
				ContentType: "application/octet-stream",
			}),
		);

		await client.send(
			new DeleteObjectCommand({
				Bucket: env.S3_BUCKET,
				Key: key,
			}),
		);

		const latencyMs = Date.now() - start;
		return { ok: true, latencyMs };
	}

	/**
	 * Upload a single file
	 */
	static async uploadFile(
		file: File,
		options?: UploadOptions,
	): Promise<StorageFileResult> {
		addSpanAttributes({
			"storage.bucket": env.S3_BUCKET,
			"storage.file_size": file.size,
			"storage.file_type": file.type,
		});

		StorageService.validateFile(file);

		const isImage = ImageProcessor.isImage(file.type);
		const filePath = StorageService.generateFilePath(file.name);
		const client = getS3Client();

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

			await client.send(
				new PutObjectCommand({
					Bucket: env.S3_BUCKET,
					Key: filePath,
					Body: originalBuffer,
					ContentType: file.type,
				}),
			);

			const originalUrl = await StorageService.getPublicUrl(filePath);

			return {
				bucket: env.S3_BUCKET,
				path: filePath,
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

				try {
					await client.send(
						new PutObjectCommand({
							Bucket: env.S3_BUCKET,
							Key: variantPath,
							Body: variant.buffer,
							ContentType: variant.mimeType,
						}),
					);

					return {
						variant: variant.variant,
						url: await StorageService.getPublicUrl(variantPath),
						width: variant.width,
						height: variant.height,
						fileSize: variant.fileSize,
					};
				} catch (error) {
					logger.error(
						{
							variant: variant.variant,
							error: error instanceof Error ? error.message : String(error),
							fileName: file.name,
						},
						"Failed to upload variant",
					);
					return null;
				}
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
		const primaryVariant = mediumVariant || variants[0];
		if (!primaryVariant) {
			throw new Error("Failed to upload any image variants");
		}

		// Use the primary variant's path (without the variant suffix) as the base path
		const basePath = filePath.replace(/\.[^/.]+$/, "");
		const primaryPath = `${basePath}_${primaryVariant.variant.toLowerCase()}.${primaryVariant.url.split(".").pop()?.split("?")[0] || "webp"}`;

		return {
			bucket: env.S3_BUCKET,
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
				const errorMessage =
					error instanceof Error
						? error.message
						: typeof error === "string"
							? error
							: JSON.stringify(error);

				logger.error(
					{ error, fileName: file.name },
					"File upload failed in batch",
				);

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
		const client = getS3Client();
		await client.send(
			new DeleteObjectCommand({
				Bucket: bucket,
				Key: path,
			}),
		);
	}

	/**
	 * Delete multiple files
	 */
	static async deleteFiles(bucket: string, paths: string[]): Promise<void> {
		if (paths.length === 0) {
			return;
		}

		const client = getS3Client();
		await client.send(
			new DeleteObjectsCommand({
				Bucket: bucket,
				Delete: {
					Objects: paths.map((Key) => ({ Key })),
					Quiet: true,
				},
			}),
		);
	}

	/**
	 * Extract object key from a public storage URL (R2/MinIO format)
	 */
	static async getKeyFromPublicUrl(
		url: string,
		baseUrl: string,
	): Promise<string | null> {
		const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
		if (url.startsWith(base + "/")) {
			return url.slice(base.length + 1);
		}
		return null;
	}

	/**
	 * Get public URL for an object
	 */
	static async getPublicUrl(path: string): Promise<string> {
		const base = env.S3_PUBLIC_BASE_URL.endsWith("/")
			? env.S3_PUBLIC_BASE_URL.slice(0, -1)
			: env.S3_PUBLIC_BASE_URL;
		return `${base}/${path}`;
	}
}

export const StorageService = traceStaticClass(StorageServiceBase);
