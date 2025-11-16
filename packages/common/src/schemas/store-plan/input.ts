import { z } from "zod";
import { storePlanTypeSchema } from "./enums";

export const storePlanInputSchema = z.object({
	planType: storePlanTypeSchema,
	orderLimit: z.number().int().min(0),
	orderCount: z.number().int().min(0).default(0),
	resetAt: z.date().optional(),
	storeId: z.string().min(1, "Store ID is required"),
});

export const createStorePlanInputSchema = storePlanInputSchema;

export const updateStorePlanInputSchema = storePlanInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Store Plan ID is required"),
	});

export const getStorePlanInputSchema = z
	.object({
		id: z.string().min(1, "Store Plan ID is required").optional(),
		storeId: z.string().min(1, "Store ID is required").optional(),
	})
	.refine((data) => data.id || data.storeId, {
		message: "Either id or storeId must be provided",
	});

export type StorePlanInput = z.infer<typeof storePlanInputSchema>;
export type CreateStorePlanInput = z.infer<typeof createStorePlanInputSchema>;
export type UpdateStorePlanInput = z.infer<typeof updateStorePlanInputSchema>;
export type GetStorePlanInput = z.infer<typeof getStorePlanInputSchema>;
