import {
	sendOTPInputSchema,
	sendTestMessageInputSchema,
	sendTestOrderNotificationInputSchema,
} from "@dukkani/common/schemas/telegram/input";
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

	/**
	 * Send a test message to your linked Telegram account (dev only)
	 * Useful for testing message formatting and delivery
	 */
	sendTestMessage: protectedProcedure
		.input(sendTestMessageInputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			const user = await database.user.findUnique({
				where: { id: userId },
				select: { telegramChatId: true },
			});

			if (!user?.telegramChatId) {
				throw new ORPCError("BAD_REQUEST", {
					message:
						"Telegram account not linked. Please link your account first.",
				});
			}

			try {
				await TelegramService.sendMessage(user.telegramChatId, input.message, {
					parseMode: input.parseMode,
				});
				return { success: true };
			} catch (error) {
				throw new ORPCError("BAD_REQUEST", {
					message:
						error instanceof Error
							? error.message
							: "Failed to send test message",
				});
			}
		}),

	/**
	 * Send a test order notification (dev only)
	 * Useful for testing order notification formatting and buttons
	 */
	sendTestOrderNotification: protectedProcedure
		.input(sendTestOrderNotificationInputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			// Verify store ownership
			const store = await database.store.findUnique({
				where: { id: input.storeId },
				select: { ownerId: true, name: true },
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: "Store not found",
				});
			}

			if (store.ownerId !== userId) {
				throw new ORPCError("FORBIDDEN", {
					message: "You don't have access to this store",
				});
			}

			const user = await database.user.findUnique({
				where: { id: userId },
				select: { telegramChatId: true },
			});

			if (!user?.telegramChatId) {
				throw new ORPCError("BAD_REQUEST", {
					message:
						"Telegram account not linked. Please link your account first.",
				});
			}

			try {
				// Send test order notification with mock data
				await TelegramService.sendOrderNotification(input.storeId, {
					id: "TEST-12345",
					customerName: "Test Customer",
					customerPhone: "+21612345678",
					items: [
						{ name: "Test Product 1", quantity: 2 },
						{ name: "Test Product 2", quantity: 1 },
					],
					total: "50.00 TND",
				});
				return { success: true };
			} catch (error) {
				throw new ORPCError("BAD_REQUEST", {
					message:
						error instanceof Error
							? error.message
							: "Failed to send test order notification",
				});
			}
		}),
};
