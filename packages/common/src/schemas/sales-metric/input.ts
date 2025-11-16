import { z } from "zod";

export const salesMetricInputSchema = z.object({
	storeId: z.string().min(1, "Store ID is required"),
	date: z.date(),
	orderCount: z.number().int().min(0, "Order count cannot be negative"),
	totalSales: z.number().min(0, "Total sales cannot be negative"),
});

export const createSalesMetricInputSchema = salesMetricInputSchema;

export const updateSalesMetricInputSchema = salesMetricInputSchema
	.partial()
	.extend({
		id: z.string().min(1, "Sales Metric ID is required"),
	});

export const getSalesMetricInputSchema = z.object({
	id: z.string().min(1, "Sales Metric ID is required"),
});

export const listSalesMetricsInputSchema = z.object({
	storeId: z.string().optional(),
	startDate: z.date().optional(),
	endDate: z.date().optional(),
});

export type SalesMetricInput = z.infer<typeof salesMetricInputSchema>;
export type CreateSalesMetricInput = z.infer<
	typeof createSalesMetricInputSchema
>;
export type UpdateSalesMetricInput = z.infer<
	typeof updateSalesMetricInputSchema
>;
export type GetSalesMetricInput = z.infer<typeof getSalesMetricInputSchema>;
export type ListSalesMetricsInput = z.infer<typeof listSalesMetricsInputSchema>;
