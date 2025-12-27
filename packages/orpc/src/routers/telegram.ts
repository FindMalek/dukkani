import {
	sendOTPInputSchema,
	sendTestMessageInputSchema,
	sendTestOrderNotificationInputSchema,
	telegramUpdateSchema,
} from "@dukkani/common/schemas/telegram/input";
import { OrderService, TelegramService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { apiEnv, env } from "@dukkani/env";
import { ORPCError } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../index";

export const telegramRouter = {
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

	/**
	 * Handle Telegram webhook updates
	 * Processes incoming updates from Telegram Bot API
	 */
	webhook: publicProcedure
		.input(telegramUpdateSchema)
		.handler(async ({ input, context }) => {
			const secretToken = context.headers["x-telegram-bot-api-secret-token"];
			if (secretToken !== apiEnv.TELEGRAM_WEBHOOK_SECRET) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Invalid webhook secret token",
				});
			}

			// Handle callback queries (button clicks)
			if (input.callback_query) {
				const { data, id: callbackQueryId, message } = input.callback_query;

				if (data && callbackQueryId) {
					if (data.startsWith("ship_")) {
						const parts = data.split("_");
						if (parts.length >= 2) {
							const orderId = parts[1];
							if (orderId && message) {
								const chatId = message.chat.id.toString();

								// Find user by telegramChatId
								const user = await database.user.findFirst({
									where: { telegramChatId: chatId },
								});

								if (!user) {
									await TelegramService.answerCallbackQuery(
										callbackQueryId,
										"❌ User not found",
										true,
									);
									return { ok: true };
								}

								try {
									await OrderService.updateOrderStatus(
										orderId,
										"SHIPPED",
										user.id,
									);
									await TelegramService.answerCallbackQuery(
										callbackQueryId,
										`✅ Order #${orderId} marked as shipped!`,
									);
									await TelegramService.sendMessage(
										chatId,
										`✅ Order #${orderId} has been marked as shipped.`,
										{ parseMode: "HTML" },
									);
								} catch (error) {
									await TelegramService.answerCallbackQuery(
										callbackQueryId,
										error instanceof Error
											? error.message
											: "❌ Failed to update order",
										true,
									);
								}
							}
						}
					}
				}
				return { ok: true };
			}

			// Handle commands
			if (input.message?.text === "/help" || input.message?.text === "/start") {
				const chatId = input.message.chat.id.toString();
				await TelegramService.sendMessage(
					chatId,
					"👋 <b>Welcome to Dukkani Notifications Bot!</b>\n\nThis bot sends you real-time order notifications from your Dukkani stores.\n\n<b>Commands:</b>\n/start - Link your account\n/help - Show this help message\n\nTo link your account, use the link provided in your Dukkani dashboard settings.",
					{ parseMode: "HTML" },
				);
				return { ok: true };
			}

			// Return success for any other updates
			return { ok: true };
		}),
};
