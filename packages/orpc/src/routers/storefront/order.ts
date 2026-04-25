import { createOrderPublicInputSchema } from "@dukkani/common/schemas/order/input";
import type { OrderPublicOutput } from "@dukkani/common/schemas/order/output";
import { orderPublicOutputSchema } from "@dukkani/common/schemas/order/output";
import { OrderService } from "@dukkani/common/services";
import { rateLimitPublicSafe } from "../../middleware/rate-limit";
import { baseProcedure } from "../../procedures";

export const orderRouter = {
  createPublic: baseProcedure
    .use(rateLimitPublicSafe)
    .input(createOrderPublicInputSchema)
    .output(orderPublicOutputSchema)
    .handler(async ({ input }): Promise<OrderPublicOutput> => {
      return await OrderService.createOrderPublic(input);
    }),
};
