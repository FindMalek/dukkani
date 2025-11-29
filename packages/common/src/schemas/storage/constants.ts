/**
 * Image variant sizes configuration
 * Used for generating multiple size variants of uploaded images
 */
export const VARIANT_SIZES = {
	THUMBNAIL: { width: 150, height: 150 },
	SMALL: { width: 400, height: 400 },
	MEDIUM: { width: 800, height: 800 },
	LARGE: { width: 1200, height: 1200 },
} as const;

export type VariantSize = (typeof VARIANT_SIZES)[keyof typeof VARIANT_SIZES];
