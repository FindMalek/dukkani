import { z } from "zod";
import {
	productPublicOutputSchema,
	productSimpleOutputSchema,
} from "../product/output";
import { salesMetricSimpleOutputSchema } from "../sales-metric/output";
import { storePlanSimpleOutputSchema } from "../store-plan/output";
import { teamMemberSimpleOutputSchema } from "../team-member/output";
import { userSimpleOutputSchema } from "../user/output";
import {
	storeCategorySchema,
	storeNotificationMethodSchema,
	storeThemeSchema,
} from "./enums";

export const storeSafeOutputSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	whatsappNumber: z.string().nullable(),
	category: storeCategorySchema.nullable(),
	theme: storeThemeSchema.nullable(),
	notificationMethod: storeNotificationMethodSchema.nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	storePlan: storePlanSimpleOutputSchema.optional(),
});

export const storeSimpleOutputSchema = storeSafeOutputSchema.extend({
	ownerId: z.string(),
});

export const storeIncludeOutputSchema = storeSimpleOutputSchema.extend({
	owner: userSimpleOutputSchema.optional(),
	storePlan: storePlanSimpleOutputSchema.optional(),
	products: z.array(productSimpleOutputSchema).optional(),
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

export const storePublicOutputSchema = storeSafeOutputSchema
	.extend({
		owner: z
			.object({
				name: z.string().nullable(),
				image: z.string().nullable(),
			})
			.optional(),
		products: z.array(productPublicOutputSchema).optional(),
		productsPagination: z
			.object({
				total: z.number().int(),
				hasMore: z.boolean(),
				page: z.number().int(),
				limit: z.number().int(),
			})
			.optional(),
	})
	.omit({
		notificationMethod: true,
	});

export type StorePublicOutput = z.infer<typeof storePublicOutputSchema>;
export type StoreSimpleOutput = z.infer<typeof storeSimpleOutputSchema>;
export type StoreSafeOutput = z.infer<typeof storeSafeOutputSchema>;
export type StoreIncludeOutput = z.infer<typeof storeIncludeOutputSchema>;
export type ListStoresOutput = z.infer<typeof listStoresOutputSchema>;
