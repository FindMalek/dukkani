import { z } from "zod";
import { storePlanTypeSchema } from "./enums";

export const storePlanSimpleOutputSchema = z.object({
	id: z.string(),
	planType: storePlanTypeSchema,
	orderLimit: z.number().int(),
	orderCount: z.number().int(),
	resetAt: z.date().nullable(),
	storeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const storePlanIncludeOutputSchema = storePlanSimpleOutputSchema.extend({
	store: z.unknown().optional(),
});

export type StorePlanSimpleOutput = z.infer<typeof storePlanSimpleOutputSchema>;
export type StorePlanIncludeOutput = z.infer<typeof storePlanIncludeOutputSchema>;

