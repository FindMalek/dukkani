import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	ListObjectsCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import {
	getFileExtensionFromMimeType,
	isImageMimeType,
	type SupportedMimeType,
} from "@dukkani/common/schemas/constants";
import {
	StorageFileVariantType,
	type StorageFileVariantTypeInfer,
} from "@dukkani/common/schemas/enums";
import type { StorageUploadTarget } from "@dukkani/common/schemas/storage/input";
import type {
	ProcessedImage,
	StorageFileResult,
} from "@dukkani/common/schemas/storage/output";
import {
	extractFallbackExtension,
	validateMimeType,
} from "@dukkani/common/utils/mime-types";
import { logger } from "@dukkani/logger";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { nanoid } from "nanoid";
import { getS3Client } from "./client";
import { env } from "./env";
import { ImageProcessor } from "./image-processor";

export type UploadOptions = {
	alt?: string;
	target: StorageUploadTarget;
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

	private static sanitizePathSegment(value: string): string {
		const sanitized = value
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.slice(0, 64);
		return sanitized || "unknown";
	}

	/**
	 * Validate and truncate S3 object key to stay within limits
	 * S3 key limit: 1024 bytes, but we use 800 chars for safety with UTF-8
	 */
	private static validateAndTruncateKey(key: string): string {
		const MAX_KEY_LENGTH = 800; // Conservative limit for UTF-8 safety

		if (key.length <= MAX_KEY_LENGTH) {
			return key;
		}

		// If key is too long, truncate the middle part while preserving extension
		const parts = key.split(".");
		const extension = parts.length > 1 ? (parts.pop() ?? "") : "";
		const baseKey = parts.join(".");

		if (extension && baseKey.length <= MAX_KEY_LENGTH - extension.length - 1) {
			return `${baseKey}.${extension}`;
		}

		// Truncate the middle of the base key
		const keepStart = Math.floor((MAX_KEY_LENGTH - extension.length - 3) / 2);
		const keepEnd = MAX_KEY_LENGTH - extension.length - 3 - keepStart;

		const truncated =
			baseKey.substring(0, keepStart) +
			"..." +
			baseKey.substring(baseKey.length - keepEnd);

		logger.warn(
			{
				originalLength: key.length,
				truncatedLength: truncated.length + extension.length + 1,
				key: key.substring(0, 100) + "...",
			},
			"S3 key was truncated to stay within limits",
		);

		return extension ? `${truncated}.${extension}` : truncated;
	}

	private static resolveStorageEnvironment():
		| "local"
		| "preview"
		| "production" {
		// Use env package for type-safe access to Vercel environment variables
		if (env.VERCEL_ENV === "preview") {
			return "preview";
		}
		if (env.VERCEL_ENV === "production" || env.NODE_ENV === "production") {
			return "production";
		}
		return "local";
	}

	private static resolvePreviewScope(): string | null {
		if (StorageService.resolveStorageEnvironment() !== "preview") {
			return null;
		}
		if (env.STORAGE_PREVIEW_PREFIX) {
			return StorageService.sanitizePathSegment(env.STORAGE_PREVIEW_PREFIX);
		}
		if (env.VERCEL_GIT_PULL_REQUEST_ID) {
			return `pr-${StorageService.sanitizePathSegment(env.VERCEL_GIT_PULL_REQUEST_ID)}`;
		}
		if (env.VERCEL_GIT_COMMIT_REF) {
			return `branch-${StorageService.sanitizePathSegment(env.VERCEL_GIT_COMMIT_REF)}`;
		}
		if (env.VERCEL_DEPLOYMENT_ID) {
			return `deploy-${StorageService.sanitizePathSegment(env.VERCEL_DEPLOYMENT_ID)}`;
		}
		return "preview";
	}

	private static buildAssetRoot(target: StorageUploadTarget): string {
		const previewScope = StorageService.resolvePreviewScope();
		const assetId = target.assetId
			? StorageService.sanitizePathSegment(target.assetId)
			: `asset-${nanoid()}`;
		return [
			previewScope,
			StorageService.sanitizePathSegment(target.resource),
			StorageService.sanitizePathSegment(target.entityId),
			assetId,
		]
			.filter(Boolean)
			.join("/");
	}

	/**
	 * Type-safe MIME type detection from URL
	 */
	private static detectMimeTypeFromUrl(url: string): SupportedMimeType {
		if (url.includes("webp")) return "image/webp";
		if (url.includes("jpeg") || url.includes("jpg")) return "image/jpeg";
		if (url.includes("png")) return "image/png";
		if (url.includes("avif")) return "image/avif";
		if (url.includes("gif")) return "image/gif";
		if (url.includes("svg")) return "image/svg+xml";

		// Default fallback to supported image type
		return "image/jpeg";
	}

	private static buildVariantObjectKey(
		assetRoot: string,
		variant: StorageFileVariantTypeInfer,
		mimeType: string,
	): string {
		// Properly parse MIME type instead of simple string splitting
		const extension = StorageServiceBase.extractFileExtension(mimeType);
		const key = `${assetRoot}/${variant.toLowerCase()}.${extension}`;
		return StorageServiceBase.validateAndTruncateKey(key);
	}

	private static buildOriginalObjectKey(
		assetRoot: string,
		fileName: string,
	): string {
		// Use the original file's extension, fallback to proper MIME parsing
		const originalExtension = fileName.split(".").pop()?.toLowerCase();
		if (originalExtension && originalExtension.length > 1) {
			const key = `${assetRoot}/original.${originalExtension}`;
			return StorageServiceBase.validateAndTruncateKey(key);
		}

		// Fallback: try to determine from file type if available
		// This will be handled by the calling function with proper MIME type
		const key = `${assetRoot}/original.bin`;
		return StorageServiceBase.validateAndTruncateKey(key);
	}

	/**
	 * Extract file extension from MIME type with type-safe validation
	 * Replaces the brittle string-based approach
	 */
	private static extractFileExtension(mimeType: string): string {
		try {
			// Validate MIME type first
			const validatedMimeType = validateMimeType(mimeType);
			return getFileExtensionFromMimeType(validatedMimeType);
		} catch (error) {
			// Fallback for development/unknown types
			if (process.env.NODE_ENV === "development") {
				console.warn(`MIME type validation failed: ${mimeType}`, error);
			}

			// Try to extract reasonable extension for unknown types
			return extractFallbackExtension(mimeType);
		}
	}

	/**
	 * Health check: upload and delete a test object to verify storage connectivity
	 */
	static async checkHealth(): Promise<{ ok: true; latencyMs: number }> {
		const key = `_health/check-${Date.now()}`;
		const client = getS3Client();
		const start = Date.now();

		try {
			// Upload test object
			await client.send(
				new PutObjectCommand({
					Bucket: env.S3_BUCKET,
					Key: key,
					Body: "",
					ContentType: "application/octet-stream",
				}),
			);

			// Delete test object with error handling to prevent orphaned objects
			try {
				await client.send(
					new DeleteObjectCommand({
						Bucket: env.S3_BUCKET,
						Key: key,
					}),
				);
			} catch (deleteError) {
				// Log warning but don't fail the health check - cleanup can be handled later
				logger.warn(
					{
						key,
						error:
							deleteError instanceof Error
								? deleteError.message
								: String(deleteError),
					},
					"Failed to delete health check test object - will require manual cleanup",
				);
			}

			const latencyMs = Date.now() - start;
			return { ok: true, latencyMs };
		} catch (error) {
			// If upload failed, no cleanup needed
			throw new Error(
				`Storage health check failed: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
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
		if (!options?.target) {
			throw new Error("Storage upload target is required");
		}

		const isImage = isImageMimeType(file.type);
		const assetRoot = StorageService.buildAssetRoot(options.target);
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
			const filePath = StorageService.buildOriginalObjectKey(
				assetRoot,
				file.name,
			);
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
				const variantPath = StorageService.buildVariantObjectKey(
					assetRoot,
					variant.variant,
					variant.mimeType,
				);

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
		const mediumVariant = variants.find(
			(v) => v.variant === StorageFileVariantType.MEDIUM,
		);
		const primaryVariant = mediumVariant || variants[0];
		if (!primaryVariant) {
			throw new Error("Failed to upload any image variants");
		}

		const primaryPath = StorageService.buildVariantObjectKey(
			assetRoot,
			primaryVariant.variant,
			StorageService.detectMimeTypeFromUrl(primaryVariant.url),
		);

		return {
			bucket: env.S3_BUCKET,
			path: primaryPath,
			originalUrl: primaryVariant.url,
			url: primaryVariant.url,
			mimeType: StorageService.detectMimeTypeFromUrl(primaryVariant.url),
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
		try {
			const client = getS3Client();
			await client.send(
				new DeleteObjectCommand({
					Bucket: bucket,
					Key: path,
				}),
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			logger.error(
				{
					bucket,
					path,
					error: errorMessage,
				},
				"Failed to delete storage file",
			);
			throw new Error(`Failed to delete file ${path}: ${errorMessage}`);
		}
	}

	/**
	 * Delete multiple files
	 */
	static async deleteFiles(bucket: string, paths: string[]): Promise<void> {
		if (paths.length === 0) {
			return;
		}

		try {
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
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			logger.error(
				{
					bucket,
					paths,
					error: errorMessage,
				},
				"Failed to delete storage files",
			);
			throw new Error(
				`Failed to delete ${paths.length} files: ${errorMessage}`,
			);
		}
	}

	/**
	 * Extract object key from a public storage URL (R2/MinIO format)
	 */
	static async getKeyFromPublicUrl(
		url: string,
		baseUrl: string,
	): Promise<string | null> {
		try {
			// Parse both URLs properly
			const urlObj = new URL(url);
			const baseUrlObj = new URL(baseUrl);

			// Remove trailing slash from base URL for comparison
			const baseUrlPath = baseUrlObj.pathname.endsWith("/")
				? baseUrlObj.pathname.slice(0, -1)
				: baseUrlObj.pathname;

			// Check if the URL starts with the base URL (same origin and path prefix)
			if (urlObj.origin !== baseUrlObj.origin) {
				return null;
			}

			if (!urlObj.pathname.startsWith(baseUrlPath + "/")) {
				return null;
			}

			// Extract the key by removing the base path prefix
			const key = urlObj.pathname.slice(baseUrlPath.length + 1);

			// Remove any query parameters (shouldn't exist for storage URLs but handle defensively)
			return key.split("?")[0] ?? null;
		} catch (error) {
			logger.warn(
				{
					url,
					baseUrl,
					error: error instanceof Error ? error.message : String(error),
				},
				"Failed to parse storage URL",
			);
			return null;
		}
	}

	/**
	 * Delete all objects in a folder by prefix
	 */
	static async deleteFolderByPrefix(
		bucket: string,
		prefix: string,
	): Promise<void> {
		const folderPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;

		try {
			const client = getS3Client();
			let marker: string | undefined;
			let totalDeleted = 0;
			let isTruncated = true;

			do {
				const listResponse = await client.send(
					new ListObjectsCommand({
						Bucket: bucket,
						Prefix: folderPrefix,
						Marker: marker,
					}),
				);

				const objects =
					listResponse.Contents?.map((obj) => ({ Key: obj.Key || "" })).filter(
						(obj) => obj.Key,
					) || [];

				if (objects.length > 0) {
					await client.send(
						new DeleteObjectsCommand({
							Bucket: bucket,
							Delete: {
								Objects: objects,
								Quiet: true,
							},
						}),
					);
					totalDeleted += objects.length;
				}

				isTruncated = listResponse.IsTruncated || false;
				marker = listResponse.NextMarker || listResponse.Contents?.at(-1)?.Key;
			} while (isTruncated);

			if (totalDeleted > 0) {
				logger.info(
					{ bucket, prefix: folderPrefix, totalDeleted },
					"Successfully deleted folder contents",
				);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			logger.error(
				{
					bucket,
					prefix: folderPrefix,
					error: errorMessage,
				},
				"Failed to delete storage folder",
			);
			throw new Error(
				`Failed to delete folder ${folderPrefix}: ${errorMessage}`,
			);
		}
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
