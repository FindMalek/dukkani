import { z } from "zod";
import { storeCategorySchema, storeThemeSchema } from "./enums";
import { userSimpleOutputSchema } from "../user/output";
import { storePlanSimpleOutputSchema } from "../store-plan/output";
import { productSimpleOutputSchema } from "../product/output";
import { orderSimpleOutputSchema } from "../order/output";
import { customerSimpleOutputSchema } from "../customer/output";
import { teamMemberSimpleOutputSchema } from "../team-member/output";
import { salesMetricSimpleOutputSchema } from "../sales-metric/output";

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
	owner: userSimpleOutputSchema.optional(),
	storePlan: storePlanSimpleOutputSchema.optional(),
	products: z.array(productSimpleOutputSchema).optional(),
	orders: z.array(orderSimpleOutputSchema).optional(),
	customers: z.array(customerSimpleOutputSchema).optional(),
	teamMembers: z.array(teamMemberSimpleOutputSchema).optional(),
	salesMetrics: z.array(salesMetricSimpleOutputSchema).optional(),
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
