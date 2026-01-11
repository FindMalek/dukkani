import { z } from "zod";

export const uploadFileInputSchema = z.object({
	file: z.file(),
	bucket: z.string().min(1, "Bucket name is required"),
	alt: z.string().optional(),
});

export const uploadFilesInputSchema = z.object({
	files: z
		.array(z.file())
		.min(1, "At least one file is required")
		.max(10, "Maximum 10 files allowed"),
	alt: z.string().optional(),
});

export const deleteFileInputSchema = z.object({
	id: z.string().min(1, "File ID is required"),
});

export const deleteFilesInputSchema = z.object({
	ids: z.array(z.string().min(1)).min(1, "At least one file ID is required"),
});

export type UploadFileInput = z.infer<typeof uploadFileInputSchema>;
export type UploadFilesInput = z.infer<typeof uploadFilesInputSchema>;
export type DeleteFileInput = z.infer<typeof deleteFileInputSchema>;
export type DeleteFilesInput = z.infer<typeof deleteFilesInputSchema>;
