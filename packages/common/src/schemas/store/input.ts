import {
	StoreNotificationMethod,
	StoreTheme,
} from "@dukkani/db/prisma/generated/enums";
import { z } from "zod";
import {
	storeCategorySchema,
	storeNotificationMethodSchema,
	storeThemeSchema,
} from "./enums";

export const storeInputSchema = z.object({
	name: z.string().min(1, "Store name is required"),
	slug: z.string().min(1, "Store slug is required"),
	description: z.string().optional(),
	whatsappNumber: z.string().optional(),
	category: storeCategorySchema.optional(),
	theme: storeThemeSchema.optional(),
	notificationMethod: storeNotificationMethodSchema.optional(),
	ownerId: z.string().min(1, "Owner ID is required"),
});

// Separate schema for onboarding (slug is auto-generated, ownerId comes from context)
export const createStoreOnboardingInputSchema = z.object({
	name: z.string().min(3, "Store name must be at least 3 characters"),
	description: z.string().optional(),
	theme: storeThemeSchema.optional().default(StoreTheme.MODERN),
	notificationMethod: storeNotificationMethodSchema
		.optional()
		.default(StoreNotificationMethod.EMAIL),
});

export const createStoreInputSchema = storeInputSchema;

export const updateStoreInputSchema = storeInputSchema.partial().extend({
	id: z.string().min(1, "Store ID is required"),
});

export const getStoreInputSchema = z
	.object({
		id: z.string().min(1, "Store ID is required").optional(),
		slug: z.string().min(1, "Store slug is required").optional(),
	})
	.refine((data) => data.id || data.slug, {
		message: "Either id or slug must be provided",
	});

export const listStoresInputSchema = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
	ownerId: z.string().optional(),
	category: storeCategorySchema.optional(),
});

export type StoreInput = z.infer<typeof storeInputSchema>;
export type CreateStoreInput = z.infer<typeof createStoreInputSchema>;
export type CreateStoreOnboardingInput = z.infer<
	typeof createStoreOnboardingInputSchema
>;
export type UpdateStoreInput = z.infer<typeof updateStoreInputSchema>;
export type GetStoreInput = z.infer<typeof getStoreInputSchema>;
export type ListStoresInput = z.infer<typeof listStoresInputSchema>;
