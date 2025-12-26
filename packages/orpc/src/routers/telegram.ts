import {
	createLinkTokenInputSchema,
	handleWebhookInputSchema,
	sendOTPInputSchema,
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
		.input(handleWebhookInputSchema)
		.handler(async ({ input }) => {
			if (input.secretToken !== apiEnv.TELEGRAM_WEBHOOK_SECRET) {
				throw new ORPCError("UNAUTHORIZED", {
					message: "Invalid webhook secret",
				});
			}

			const { update } = input;

			// Handle deep link account linking
			if (update.message?.text?.startsWith("/start link_")) {
				const parts = update.message.text.split("_");
				if (parts.length === 3) {
					const [, userId, token] = parts;
					const chatId = update.message.chat.id.toString();

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
			if (update.callback_query) {
				const { data, id: callbackQueryId, message } = update.callback_query;

				if (data?.startsWith("ship_")) {
					const [, orderId, shopId] = data.split("_");

					const user = await database.user.findUnique({
						where: { telegramChatId: message.chat.id.toString() },
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
							message.chat.id.toString(),
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
			if (
				update.message?.text === "/help" ||
				update.message?.text === "/start"
			) {
				const chatId = update.message.chat.id.toString();
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
