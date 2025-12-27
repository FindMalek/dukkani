import { z } from "zod";
import { storeSimpleOutputSchema } from "../store/output";
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
	store: storeSimpleOutputSchema.optional(),
});

export type StorePlanSimpleOutput = z.infer<typeof storePlanSimpleOutputSchema>;
export type StorePlanIncludeOutput = z.infer<
	typeof storePlanIncludeOutputSchema
>;
