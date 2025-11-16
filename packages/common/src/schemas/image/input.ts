import { z } from "zod";

export const imageInputSchema = z.object({
	url: z.string().url("Please enter a valid image URL"),
	productId: z.string().min(1, "Product ID is required"),
});

export const createImageInputSchema = imageInputSchema;

export const updateImageInputSchema = imageInputSchema.partial().extend({
	id: z.string().min(1, "Image ID is required"),
});

export const getImageInputSchema = z.object({
	id: z.string().min(1, "Image ID is required"),
});

export const listImagesInputSchema = z.object({
	productId: z.string().optional(),
});

export type ImageInput = z.infer<typeof imageInputSchema>;
export type CreateImageInput = z.infer<typeof createImageInputSchema>;
export type UpdateImageInput = z.infer<typeof updateImageInputSchema>;
export type GetImageInput = z.infer<typeof getImageInputSchema>;
export type ListImagesInput = z.infer<typeof listImagesInputSchema>;

