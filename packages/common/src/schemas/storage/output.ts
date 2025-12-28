import { z } from "zod";
import { storageFileVariantTypeSchema } from "../enums";

export const imageVariantSchema = z.object({
	variant: storageFileVariantTypeSchema,
	buffer: z.instanceof(Buffer).optional(), // Optional for output schemas
	width: z.number().int(),
	height: z.number().int(),
	fileSize: z.number().int(),
	mimeType: z.string(),
});

export const processedImageOriginalSchema = z.object({
	buffer: z.instanceof(Buffer).optional(), // Optional for output schemas
	width: z.number().int(),
	height: z.number().int(),
	fileSize: z.number().int(),
	mimeType: z.string(),
});

export const processedImageSchema = z.object({
	original: processedImageOriginalSchema,
	variants: z.array(imageVariantSchema),
	optimizedSize: z.number().int(),
});

export const storageFileVariantOutputSchema = z.object({
	id: z.string(),
	storageFileId: z.string(),
	variant: storageFileVariantTypeSchema,
	url: z.string(),
	width: z.number().int().nullable(),
	height: z.number().int().nullable(),
	fileSize: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const storageFileSimpleOutputSchema = z.object({
	id: z.string(),
	bucket: z.string(),
	path: z.string(),
	originalUrl: z.string(),
	url: z.string(),
	mimeType: z.string(),
	fileSize: z.number().int(),
	optimizedSize: z.number().int().nullable(),
	width: z.number().int().nullable(),
	height: z.number().int().nullable(),
	alt: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const storageFileIncludeOutputSchema =
	storageFileSimpleOutputSchema.extend({
		variants: z.array(storageFileVariantOutputSchema),
	});

export const uploadFileOutputSchema = z.object({
	file: storageFileIncludeOutputSchema,
});

export const uploadFilesOutputSchema = z.object({
	files: z.array(storageFileIncludeOutputSchema),
});

export const storageFileResultSchema = z.object({
	bucket: z.string(),
	path: z.string(),
	originalUrl: z.string(),
	url: z.string(),
	mimeType: z.string(),
	fileSize: z.number().int(),
	optimizedSize: z.number().int().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional(),
	alt: z.string().optional(),
	variants: z.array(
		z.object({
			variant: storageFileVariantTypeSchema,
			url: z.string(),
			width: z.number().int(),
			height: z.number().int(),
			fileSize: z.number().int(),
		}),
	),
});

export const createStorageFileDataSchema = z.object({
	bucket: z.string(),
	path: z.string(),
	originalUrl: z.string(),
	url: z.string(),
	mimeType: z.string(),
	fileSize: z.number().int(),
	optimizedSize: z.number().int().nullable().optional(),
	width: z.number().int().nullable().optional(),
	height: z.number().int().nullable().optional(),
	alt: z.string().nullable().optional(),
});

export const createVariantDataSchema = z.object({
	variant: storageFileVariantTypeSchema,
	url: z.string(),
	width: z.number().int().nullable().optional(),
	height: z.number().int().nullable().optional(),
	fileSize: z.number().int(),
});

export const deleteManyOutputSchema = z.object({
	success: z.boolean(),
	deleted: z.number().int(),
	warnings: z.number().int().optional(),
});

export type DeleteManyOutput = z.infer<typeof deleteManyOutputSchema>;

export type StorageFileVariantOutput = z.infer<
	typeof storageFileVariantOutputSchema
>;
export type StorageFileSimpleOutput = z.infer<
	typeof storageFileSimpleOutputSchema
>;
export type StorageFileIncludeOutput = z.infer<
	typeof storageFileIncludeOutputSchema
>;
export type UploadFileOutput = z.infer<typeof uploadFileOutputSchema>;
export type UploadFilesOutput = z.infer<typeof uploadFilesOutputSchema>;
export type ImageVariant = z.infer<typeof imageVariantSchema>;
export type ProcessedImage = z.infer<typeof processedImageSchema>;
export type StorageFileResult = z.infer<typeof storageFileResultSchema>;
export type CreateStorageFileData = z.infer<typeof createStorageFileDataSchema>;
export type CreateVariantData = z.infer<typeof createVariantDataSchema>;
