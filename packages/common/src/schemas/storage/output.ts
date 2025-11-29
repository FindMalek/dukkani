import { z } from "zod";

export const storageFileVariantOutputSchema = z.object({
	id: z.string(),
	storageFileId: z.string(),
	variant: z.enum(["THUMBNAIL", "SMALL", "MEDIUM", "LARGE"]),
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
