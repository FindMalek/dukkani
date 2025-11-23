import { DashboardService } from "@dukkani/common/services";
import { protectedProcedure } from "../index";

export const dashboardRouter = {
	/**
	 * Get aggregated dashboard statistics from user's stores
	 */
	getStats: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;
		return await DashboardService.getDashboardStats(userId);
	}),
};
