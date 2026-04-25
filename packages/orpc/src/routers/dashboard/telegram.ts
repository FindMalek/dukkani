import { StoreQuery } from "@dukkani/common/entities/store/query";
import {
  disconnectTelegramInputSchema,
  sendOTPInputSchema,
} from "@dukkani/common/schemas/telegram/input";
import {
  type TelegramBotLinkOutput,
  type TelegramStatusOutput,
  telegramBotLinkOutputSchema,
  telegramStatusOutputSchema,
} from "@dukkani/common/schemas/telegram/output";
import type { SuccessOutput } from "@dukkani/common/schemas/utils/success";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { TelegramService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { createRateLimitMiddleware } from "../../middleware/rate-limit";
import { protectedProcedure } from "../../procedures";

const telegramLinkRateLimit = createRateLimitMiddleware({
  custom: {
    max: 3,
    windowMs: 60 * 60 * 1000,
  },
});

export const telegramRouter = {
  getBotLink: protectedProcedure
    .output(telegramBotLinkOutputSchema)
    .handler(async ({ context }): Promise<TelegramBotLinkOutput> => {
      const userId = context.session.user.id;
      const botLink = TelegramService.getBotLink();
      const otpCode = await TelegramService.generateLinkOTP(userId);
      return {
        botLink,
        otpCode,
        instructions: `1. Open ${botLink}\n2. Send: /link ${otpCode}\n3. Your account will be linked!`,
      };
    }),

  sendOTP: protectedProcedure
    .input(sendOTPInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }): Promise<SuccessOutput> => {
      const userId = context.session.user.id;
      try {
        await TelegramService.sendOTP(userId, input.otp);
        return { success: true };
      } catch (error) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            error instanceof Error ? error.message : "Failed to send OTP",
        });
      }
    }),

  getStatus: protectedProcedure
    .output(telegramStatusOutputSchema)
    .handler(async ({ context }): Promise<TelegramStatusOutput> => {
      const userId = context.session.user.id;
      const user = await database.user.findUnique({
        where: { id: userId },
        select: {
          telegramChatId: true,
          telegramLinkedAt: true,
          telegramUserName: true,
          name: true,
          email: true,
          stores: { select: StoreQuery.getMinimalSelect() },
        },
      });
      return {
        linked: !!user?.telegramChatId,
        linkedAt: user?.telegramLinkedAt ?? null,
        telegramUserName: user?.telegramUserName ?? null,
        userName: user?.name ?? null,
        userEmail: user?.email ?? null,
        stores: user?.stores ?? [],
      };
    }),

  disconnect: protectedProcedure
    .use(telegramLinkRateLimit)
    .input(disconnectTelegramInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }): Promise<SuccessOutput> => {
      const userId = context.session.user.id;
      try {
        await TelegramService.disconnectTelegramAccount(
          userId,
          input.storeName,
        );
        return { success: true };
      } catch (error) {
        throw new ORPCError("BAD_REQUEST", {
          message:
            error instanceof Error
              ? error.message
              : "Failed to disconnect Telegram account",
        });
      }
    }),
};
