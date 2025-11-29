import sharp from "sharp";

export type ImageVariant = {
	variant: "THUMBNAIL" | "SMALL" | "MEDIUM" | "LARGE";
	buffer: Buffer;
	width: number;
	height: number;
	fileSize: number;
	mimeType: string;
};

export type ProcessedImage = {
	original: {
		buffer: Buffer;
		width: number;
		height: number;
		fileSize: number;
		mimeType: string;
	};
	variants: ImageVariant[];
	optimizedSize: number;
};

const VARIANT_SIZES = {
	THUMBNAIL: { width: 150, height: 150 },
	SMALL: { width: 400, height: 400 },
	MEDIUM: { width: 800, height: 800 },
	LARGE: { width: 1200, height: 1200 },
} as const;

/**
 * Image processor for optimization and variant generation
 * Uses Sharp for fast image processing with WebP/JPEG support
 */
export class ImageProcessor {
	/**
	 * Process an image file and generate size variants
	 */
	static async processImage(file: File): Promise<ProcessedImage> {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Get image metadata
		const metadata = await sharp(buffer).metadata();
		if (!metadata.width || !metadata.height) {
			throw new Error("Invalid image: unable to read dimensions");
		}

		// Determine output format (WebP preferred, fallback to JPEG)
		const isWebPSupported =
			metadata.format === "webp" ||
			metadata.format === "jpeg" ||
			metadata.format === "png";
		const outputFormat = isWebPSupported ? "webp" : "jpeg";
		const mimeType = outputFormat === "webp" ? "image/webp" : "image/jpeg";

		// Generate variants in parallel
		const variantPromises = Object.entries(VARIANT_SIZES).map(
			async ([variant, size]) => {
				const resized = await sharp(buffer)
					.resize(size.width, size.height, {
						fit: "inside",
						withoutEnlargement: true,
					})
					.toFormat(outputFormat, {
						quality: outputFormat === "webp" ? 85 : 90,
					})
					.toBuffer();

				const variantMetadata = await sharp(resized).metadata();
				return {
					variant: variant as ImageVariant["variant"],
					buffer: resized,
					width: variantMetadata.width ?? size.width,
					height: variantMetadata.height ?? size.height,
					fileSize: resized.length,
					mimeType,
				};
			},
		);

		const variants = await Promise.all(variantPromises);

		// Optimize original (use medium size as optimized original)
		const mediumVariant = variants.find((v) => v.variant === "MEDIUM");
		const optimizedBuffer = mediumVariant
			? mediumVariant.buffer
			: await sharp(buffer)
					.toFormat(outputFormat, {
						quality: outputFormat === "webp" ? 85 : 90,
					})
					.toBuffer();

		return {
			original: {
				buffer,
				width: metadata.width,
				height: metadata.height,
				fileSize: buffer.length,
				mimeType: file.type || `image/${metadata.format || "jpeg"}`,
			},
			variants,
			optimizedSize: optimizedBuffer.length,
		};
	}

	/**
	 * Generate variants from a buffer
	 */
	static async generateVariants(
		buffer: Buffer,
		mimeType: string,
	): Promise<ImageVariant[]> {
		const metadata = await sharp(buffer).metadata();
		if (!metadata.width || !metadata.height) {
			throw new Error("Invalid image: unable to read dimensions");
		}

		// Determine output format
		const outputFormat = mimeType.includes("webp") ? "webp" : "jpeg";
		const outputMimeType =
			outputFormat === "webp" ? "image/webp" : "image/jpeg";

		const variantPromises = Object.entries(VARIANT_SIZES).map(
			async ([variant, size]) => {
				const resized = await sharp(buffer)
					.resize(size.width, size.height, {
						fit: "inside",
						withoutEnlargement: true,
					})
					.toFormat(outputFormat, {
						quality: outputFormat === "webp" ? 85 : 90,
					})
					.toBuffer();

				const variantMetadata = await sharp(resized).metadata();
				return {
					variant: variant as ImageVariant["variant"],
					buffer: resized,
					width: variantMetadata.width ?? size.width,
					height: variantMetadata.height ?? size.height,
					fileSize: resized.length,
					mimeType: outputMimeType,
				};
			},
		);

		return Promise.all(variantPromises);
	}

	/**
	 * Check if a file is an image
	 */
	static isImage(mimeType: string): boolean {
		return mimeType.startsWith("image/");
	}
}
