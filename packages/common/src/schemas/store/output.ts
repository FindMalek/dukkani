import { z } from "zod";
import { storeCategorySchema, storeThemeSchema } from "./enums";

export const storeSimpleOutputSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	whatsappNumber: z.string().nullable(),
	category: storeCategorySchema.nullable(),
	theme: storeThemeSchema.nullable(),
	ownerId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const storeIncludeOutputSchema = storeSimpleOutputSchema.extend({
	owner: z.any().optional(),
	storePlan: z.any().optional(),
	products: z.array(z.any()).optional(),
	orders: z.array(z.any()).optional(),
	customers: z.array(z.any()).optional(),
	teamMembers: z.array(z.any()).optional(),
	salesMetrics: z.array(z.any()).optional(),
});

export const listStoresOutputSchema = z.object({
	stores: z.array(storeSimpleOutputSchema),
	total: z.number().int(),
	hasMore: z.boolean(),
	page: z.number().int(),
	limit: z.number().int(),
});

export type StoreSimpleOutput = z.infer<typeof storeSimpleOutputSchema>;
export type StoreIncludeOutput = z.infer<typeof storeIncludeOutputSchema>;
export type ListStoresOutput = z.infer<typeof listStoresOutputSchema>;

