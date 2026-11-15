import {
  connectKapsoInputSchema,
  disconnectKapsoInputSchema,
  kapsoStatusInputSchema,
  sendKapsoTestMessageInputSchema,
} from "@dukkani/common/schemas/kapso/input";
import {
  type KapsoStatusOutput,
  kapsoStatusOutputSchema,
} from "@dukkani/common/schemas/kapso/output";
import type { SuccessOutput } from "@dukkani/common/schemas/utils/success";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { KapsoService } from "@dukkani/common/services";
import { ORPCError } from "@orpc/server";
import { createRateLimitMiddleware } from "../../middleware/rate-limit";
import { protectedProcedure } from "../../procedures";
import { verifyStoreOwnership } from "../../utils/store-access";

const kapsoConnectRateLimit = createRateLimitMiddleware({
  custom: {
    max: 5,
    windowMs: 60 * 60 * 1000,
    keyPrefix: "ratelimit:kapso-connect",
  },
});

const kapsoTestMessageRateLimit = createRateLimitMiddleware({
  custom: {
    max: 5,
    windowMs: 60 * 60 * 1000,
    keyPrefix: "ratelimit:kapso-test-message",
  },
});

export const kapsoRouter = {
  getStatus: protectedProcedure
    .input(kapsoStatusInputSchema)
    .output(kapsoStatusOutputSchema)
    .handler(async ({ input, context }): Promise<KapsoStatusOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      return await KapsoService.getConnectionStatus(input.storeId);
    }),

  connect: protectedProcedure
    .use(kapsoConnectRateLimit)
    .input(connectKapsoInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }): Promise<SuccessOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      try {
        await KapsoService.connectStore(input.storeId, {
          phoneNumberId: input.phoneNumberId,
          notificationNumber: input.notificationNumber,
        });
        return { success: true };
      } catch (error) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to connect WhatsApp notifications",
        });
      }
    }),

  disconnect: protectedProcedure
    .input(disconnectKapsoInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }): Promise<SuccessOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      try {
        await KapsoService.disconnectStore(input.storeId);
        return { success: true };
      } catch (error) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to disconnect WhatsApp notifications",
        });
      }
    }),

  sendTestMessage: protectedProcedure
    .use(kapsoTestMessageRateLimit)
    .input(sendKapsoTestMessageInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }): Promise<SuccessOutput> => {
      const userId = context.session.user.id;
      await verifyStoreOwnership(userId, input.storeId);
      try {
        await KapsoService.sendTestMessage(input.storeId);
        return { success: true };
      } catch (error) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to send test WhatsApp message",
        });
      }
    }),
};
