import {
	createLinkTokenInputSchema,
	sendOTPInputSchema,
} from "@dukkani/common/schemas/telegram/input";
import { TelegramService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { env } from "@dukkani/env";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";

export const telegramRouter = {
	/**
	 * Generate deep link token for Telegram account linking
	 */
	createLinkToken: protectedProcedure
		.input(createLinkTokenInputSchema.optional())
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;
			const token = await TelegramService.createLinkToken(
				userId,
				input?.expiresInMinutes,
			);

			const deepLink = `https://t.me/${env.TELEGRAM_BOT_NAME}?start=link_${userId}_${token}`;

			return {
				token,
				deepLink,
				expiresIn: input?.expiresInMinutes ?? 10,
			};
		}),

	/**
	 * Send OTP to user's linked Telegram account
	 */
	sendOTP: protectedProcedure
		.input(sendOTPInputSchema)
		.handler(async ({ input, context }) => {
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

	/**
	 * Get Telegram linking status
	 */
	getStatus: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;
		const user = await database.user.findUnique({
			where: { id: userId },
			select: {
				telegramChatId: true,
				telegramLinkedAt: true,
			},
		});

		return {
			linked: !!user?.telegramChatId,
			linkedAt: user?.telegramLinkedAt ?? null,
		};
	}),
};
