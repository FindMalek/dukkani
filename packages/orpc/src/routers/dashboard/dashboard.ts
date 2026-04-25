import type { DashboardStatsOutput } from "@dukkani/common/schemas/dashboard/output";
import { dashboardStatsOutputSchema } from "@dukkani/common/schemas/dashboard/output";
import { DashboardService } from "@dukkani/common/services";
import { z } from "zod";
import { protectedProcedure } from "../../procedures";

export const dashboardStatsRouter = {
  getStats: protectedProcedure
    .input(
      z
        .object({
          storeId: z.string().optional(),
        })
        .optional(),
    )
    .output(dashboardStatsOutputSchema)
    .handler(async ({ input, context }): Promise<DashboardStatsOutput> => {
      const userId = context.session.user.id;
      return await DashboardService.getDashboardStats(userId, input?.storeId);
    }),
};
