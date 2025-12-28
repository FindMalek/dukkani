import { z } from "zod";
import { orderSimpleOutputSchema } from "../order/output";
import { productSimpleOutputSchema } from "../product/output";

export const dashboardStatsOutputSchema = z.object({
	totalProducts: z.number().int(),
	totalOrders: z.number().int(),
	ordersByStatus: z.object({
		PENDING: z.number().int(),
		CONFIRMED: z.number().int(),
		PROCESSING: z.number().int(),
		SHIPPED: z.number().int(),
		DELIVERED: z.number().int(),
		CANCELLED: z.number().int(),
	}),
	totalRevenue: z.number(),
	recentOrders: z.array(orderSimpleOutputSchema),
	lowStockProducts: z.array(productSimpleOutputSchema),
});

export type DashboardStatsOutput = z.infer<typeof dashboardStatsOutputSchema>;
