import { z } from "zod";
import { storeSimpleOutputSchema } from "../store/output";

export const salesMetricSimpleOutputSchema = z.object({
	id: z.string(),
	storeId: z.string(),
	date: z.date(),
	orderCount: z.number().int(),
	totalSales: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const salesMetricIncludeOutputSchema =
	salesMetricSimpleOutputSchema.extend({
		store: storeSimpleOutputSchema.optional(),
	});

export type SalesMetricSimpleOutput = z.infer<
	typeof salesMetricSimpleOutputSchema
>;
export type SalesMetricIncludeOutput = z.infer<
	typeof salesMetricIncludeOutputSchema
>;
