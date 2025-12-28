import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import { dashboardStatsOutputSchema } from "@dukkani/common/schemas/dashboard/output";
import { DashboardService } from "@dukkani/common/services";
import { protectedProcedure } from "../index";

export const dashboardRouter = {
	/**
	 * Get aggregated dashboard statistics from user's stores
	 */
	getStats: protectedProcedure
		.output(dashboardStatsOutputSchema)
		.handler(async ({ context }): Promise<DashboardStatsOutput> => {
			const userId = context.session.user.id;
			return await DashboardService.getDashboardStats(userId);
		}),
};
