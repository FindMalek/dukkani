import { z } from "zod";

export const salesMetricSimpleOutputSchema = z.object({
	id: z.string(),
	storeId: z.string(),
	date: z.date(),
	orderCount: z.number().int(),
	totalSales: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const salesMetricIncludeOutputSchema = salesMetricSimpleOutputSchema.extend({
	store: z.unknown().optional(),
});

export type SalesMetricSimpleOutput = z.infer<typeof salesMetricSimpleOutputSchema>;
export type SalesMetricIncludeOutput = z.infer<typeof salesMetricIncludeOutputSchema>;

