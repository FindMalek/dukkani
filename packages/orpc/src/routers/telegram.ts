// packages/orpc/src/routers/telegram.ts
import {
	createLinkTokenInputSchema,
	sendOTPInputSchema,
	telegramUpdateSchema,
} from "@dukkani/common/schemas/telegram/input";
import { OrderService, TelegramService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { apiEnv, env } from "@dukkani/env";
import { ORPCError } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../index";

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

	/**
	 * Handle Telegram webhook updates
	 * Public procedure (no auth required) - Telegram calls this
	 */
	webhook: publicProcedure
		.input(telegramUpdateSchema)
		.handler(async ({ input, context }) => {
			const secretToken = context.headers["x-telegram-bot-api-secret-token"];

			if (secretToken !== apiEnv.TELEGRAM_WEBHOOK_SECRET) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Invalid webhook secret",
				});
			}

			// Handle deep link account linking
			if (input.message?.text?.startsWith("/start link_")) {
				const text = input.message.text;
				const parts = text.split("_");
				if (parts.length === 3) {
					const token = parts[2];
					if (!token) {
						return { ok: true };
					}
					const chatId = input.message.chat.id.toString();

					try {
						await TelegramService.linkAccount(token, chatId);
						await TelegramService.sendMessage(
							chatId,
							"✅ <b>Account Linked Successfully!</b>\n\nYou will now receive order notifications from Dukkani.",
							{ parseMode: "HTML" },
						);
					} catch (error) {
						await TelegramService.sendMessage(
							chatId,
							"❌ <b>Linking Failed</b>\n\n" +
								(error instanceof Error
									? error.message
									: "Invalid or expired link token."),
							{ parseMode: "HTML" },
						);
					}
				}
				return { ok: true };
			}

			// Handle callback queries (button clicks)
			if (input.callback_query) {
				const { data, id: callbackQueryId, message } = input.callback_query;

				if (!data || !callbackQueryId) {
					return { ok: true };
				}

				if (data.startsWith("ship_")) {
					const parts = data.split("_");
					if (parts.length < 2) {
						return { ok: true };
					}

					const orderId = parts[1];
					if (!orderId) {
						return { ok: true };
					}

					// message is optional in callback_query, need to check
					if (!message) {
						await TelegramService.answerCallbackQuery(
							callbackQueryId,
							"❌ Message not found",
							true,
						);
						return { ok: true };
					}

					const chatId = message.chat.id.toString();

					// telegramChatId is not unique, use findFirst instead
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
						await OrderService.updateOrderStatus(orderId, "SHIPPED", user.id);
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

			return { ok: true };
		}),
};
