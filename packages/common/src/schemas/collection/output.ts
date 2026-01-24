import { z } from "zod";
import { productSimpleOutputSchema } from "../product/output";

export const collectionSimpleOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	position: z.number().int(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const collectionIncludeOutputSchema =
	collectionSimpleOutputSchema.extend({
		products: z.array(
			productSimpleOutputSchema.extend({
				position: z.number().int(),
			}),
		),
	});

export const listCollectionsOutputSchema = z.object({
	collections: z.array(collectionSimpleOutputSchema),
	total: z.number().int(),
});

export type CollectionOutput = z.infer<typeof collectionSimpleOutputSchema>;
export type CollectionIncludeOutput = z.infer<
	typeof collectionIncludeOutputSchema
>;
export type ListCollectionsOutput = z.infer<typeof listCollectionsOutputSchema>;
