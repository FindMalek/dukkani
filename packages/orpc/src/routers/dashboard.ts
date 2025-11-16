import { protectedProcedure } from "../index";
import { DashboardService } from "@dukkani/common/services";

export const dashboardRouter = {
	/**
	 * Get aggregated dashboard statistics from user's stores
	 */
	getStats: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;
		return await DashboardService.getDashboardStats(userId);
	}),
};
