import { sendOTPInputSchema } from "@dukkani/common/schemas/telegram/input";
import { TelegramService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";

export const telegramRouter = {
	/**
	 * Get Telegram bot link and generate OTP for account linking
	 */
	getBotLink: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;
		const botLink = TelegramService.getBotLink();
		const otpCode = await TelegramService.generateLinkOTP(userId);

		return {
			botLink,
			otpCode,
			instructions: `1. Open ${botLink}\n2. Send: /link ${otpCode}\n3. Your account will be linked!`,
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
