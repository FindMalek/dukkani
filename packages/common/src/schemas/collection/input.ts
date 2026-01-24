import { z } from "zod";

export const collectionInputSchema = z.object({
	name: z.string().min(1, "Collection name is required"),
	slug: z.string().min(1, "Collection slug is required"),
	description: z.string().optional(),
	image: z.string().url().optional().or(z.literal("")),
	position: z.number().int().min(0).default(0),
	storeId: z.string().min(1, "Store ID is required"),
});

export const createCollectionInputSchema = collectionInputSchema
	.omit({ slug: true })
	.extend({
		productIds: z.array(z.string()).default([]),
	});

export const updateCollectionInputSchema = collectionInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Collection ID is required"),
		productIds: z.array(z.string()).optional(),
	});

export const getCollectionInputSchema = z.object({
	id: z.string().min(1, "Collection ID is required"),
});

export const listCollectionsInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required"),
	search: z.string().optional(),
});

export const reorderCollectionProductsInputSchema = z.object({
	collectionId: z.string().min(1, "Collection ID is required"),
	productIds: z.array(z.string()).min(1, "At least one product ID is required"),
});

export const reorderCollectionsInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required"),
	collectionIds: z
		.array(z.string())
		.min(1, "At least one collection ID is required"),
});

export type CollectionInput = z.infer<typeof collectionInputSchema>;
export type CreateCollectionInput = z.infer<typeof createCollectionInputSchema>;
export type UpdateCollectionInput = z.infer<typeof updateCollectionInputSchema>;
export type GetCollectionInput = z.infer<typeof getCollectionInputSchema>;
export type ListCollectionsInput = z.infer<typeof listCollectionsInputSchema>;
export type ReorderCollectionProductsInput = z.infer<
	typeof reorderCollectionProductsInputSchema
>;
export type ReorderCollectionsInput = z.infer<
	typeof reorderCollectionsInputSchema
>;
