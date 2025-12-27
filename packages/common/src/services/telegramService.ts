import { randomInt } from "node:crypto";
import { database } from "@dukkani/db";
import { apiEnv } from "@dukkani/env";
import { OrderService } from "./orderService";

/**
 * Telegram Service - Handles all Telegram Bot API interactions
 *
 * Rate Limiting: Uses simple delay-based rate limiting (MVP approach)
 * TODO: Replace with proper queue system (BullMQ/Redis) for production scale
 * Telegram limit: 30 messages/second globally, 20 messages/minute per user
 */
export class TelegramService {
	private static readonly BOT_API_URL =
		`https://api.telegram.org/bot${apiEnv.TELEGRAM_API_TOKEN}`;

	// MVP: Simple delay-based rate limiting
	// Production: Should use BullMQ/Redis queue for proper rate limiting
	private static readonly RATE_LIMIT_DELAY = 50; // 20 messages/second (50ms between messages)
	private static lastMessageTime = 0;

	/**
	 * Get Telegram bot deep link URL
	 */
	static getBotLink(): string {
		return `https://t.me/${apiEnv.TELEGRAM_BOT_NAME}`;
	}

	/**
	 * Generate 6-digit OTP code for account linking
	 * Format: 123456
	 * Handles collisions by retrying (very rare but possible)
	 */
	static async generateLinkOTP(
		userId: string,
		expiresInMinutes = 10,
	): Promise<string> {
		const maxRetries = 5;
		let attempts = 0;

		while (attempts < maxRetries) {
			// Generate 6-digit OTP
			const code = randomInt(100000, 999999).toString();
			const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

			try {
				// Try to store OTP in database
				await database.telegramOTP.create({
					data: {
						userId,
						code,
						expiresAt,
					},
				});

				return code;
			} catch (error) {
				// If unique constraint violation, retry with new code
				// Prisma error code P2002 = unique constraint violation
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					attempts++;
					if (attempts >= maxRetries) {
						throw new Error(
							"Failed to generate unique OTP code after multiple attempts",
						);
					}
					// Retry with new code
					continue;
				}
				// Re-throw other errors
				throw error;
			}
		}

		throw new Error("Failed to generate OTP code");
	}

	/**
	 * Validate OTP code and link Telegram account
	 */
	static async validateLinkOTP(
		otpCode: string,
		telegramChatId: string,
	): Promise<{ userId: string }> {
		const otp = await database.telegramOTP.findUnique({
			where: { code: otpCode },
			include: { user: true },
		});

		if (!otp) {
			throw new Error("Invalid OTP code");
		}

		if (otp.used) {
			throw new Error("OTP code already used");
		}

		if (otp.expiresAt < new Date()) {
			throw new Error("OTP code expired");
		}

		// Link account and mark OTP as used in transaction
		await database.$transaction(async (tx) => {
			await tx.user.update({
				where: { id: otp.userId },
				data: {
					telegramChatId,
					telegramLinkedAt: new Date(),
				},
			});

			await tx.telegramOTP.update({
				where: { id: otp.id },
				data: { used: true },
			});
		});

		return { userId: otp.userId };
	}

	/**
	 * Rate-limited message sending
	 * MVP: Uses simple delay
	 * TODO: Replace with proper queue system
	 */
	private static async rateLimit(): Promise<void> {
		const now = Date.now();
		const timeSinceLastMessage = now - TelegramService.lastMessageTime;

		if (timeSinceLastMessage < TelegramService.RATE_LIMIT_DELAY) {
			await new Promise((resolve) =>
				setTimeout(
					resolve,
					TelegramService.RATE_LIMIT_DELAY - timeSinceLastMessage,
				),
			);
		}

		TelegramService.lastMessageTime = Date.now();
	}

	/**
	 * Send message to Telegram chat
	 * Implements rate limiting (20 messages/second)
	 */
	static async sendMessage(
		chatId: string,
		text: string,
		options?: {
			parseMode?: "HTML" | "Markdown";
			replyMarkup?: {
				inline_keyboard: Array<
					Array<{ text: string; callback_data?: string; url?: string }>
				>;
			};
		},
	): Promise<void> {
		await TelegramService.rateLimit();

		const response = await fetch(`${TelegramService.BOT_API_URL}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: options?.parseMode,
				reply_markup: options?.replyMarkup,
			}),
		});

		const responseData = await response.json().catch(() => null);

		if (!response.ok) {
			const errorMessage = responseData?.description || response.statusText;
			throw new Error(
				`Telegram API error: ${errorMessage || response.statusText}`,
			);
		}
	}

	/**
	 * Send OTP to user's Telegram
	 */
	static async sendOTP(userId: string, otp: string): Promise<void> {
		const user = await database.user.findUnique({
			where: { id: userId },
			select: { telegramChatId: true },
		});

		if (!user?.telegramChatId) {
			throw new Error("Telegram account not linked");
		}

		await TelegramService.sendMessage(
			user.telegramChatId,
			`🔐 <b>Your Dukkani OTP</b>\n\nYour verification code is: <b>${otp}</b>\n\nThis code expires in 5 minutes.`,
			{ parseMode: "HTML" },
		);
	}

	/**
	 * Send order notification to shop owner
	 * Includes shop context for multi-shop support
	 */
	static async sendOrderNotification(
		shopId: string,
		order: {
			id: string;
			customerName: string;
			customerPhone: string;
			items: Array<{ name: string; quantity: number }>;
			total: string;
		},
	): Promise<void> {
		const shop = await database.store.findUnique({
			where: { id: shopId },
			include: {
				owner: {
					select: { telegramChatId: true },
				},
			},
		});

		if (!shop?.owner?.telegramChatId) {
			// Silently fail if not linked (fire-and-forget pattern)
			return;
		}

		const itemsText = order.items
			.map((item) => `  • ${item.name} (x${item.quantity})`)
			.join("\n");

		const message = `🛒 <b>New Order #${order.id}</b>

<b>Store:</b> ${shop.name}
<b>Customer:</b> ${order.customerName}
<b>Phone:</b> ${order.customerPhone}

<b>Items:</b>
${itemsText}

<b>Total:</b> ${order.total}

<a href="${apiEnv.NEXT_PUBLIC_DASHBOARD_URL}/orders/${order.id}">View Order →</a>`;

		await TelegramService.sendMessage(shop.owner.telegramChatId, message, {
			parseMode: "HTML",
			replyMarkup: {
				inline_keyboard: [
					[
						{
							text: "✅ Mark as Shipped",
							callback_data: `ship_${order.id}_${shopId}`,
						},
						{
							text: "📞 Contact Customer",
							url: `https://wa.me/${order.customerPhone}`,
						},
					],
				],
			},
		});
	}

	/**
	 * Answer callback query (for button interactions)
	 */
	static async answerCallbackQuery(
		callbackQueryId: string,
		text?: string,
		showAlert = false,
	): Promise<void> {
		await TelegramService.rateLimit();

		const response = await fetch(`${TelegramService.BOT_API_URL}/answerCallbackQuery`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
				text,
				show_alert: showAlert,
			}),
		});

		const responseData = await response.json().catch(() => null);

		if (!response.ok) {
			const errorMessage = responseData?.description || response.statusText;
			console.error("Telegram callback query answer failed:", {
				callbackQueryId,
				status: response.status,
				statusText: response.statusText,
				error: errorMessage,
			});
			throw new Error(
				`Telegram API error: ${errorMessage || response.statusText}`,
			);
		}
	}

	/**
	 * Clean up expired OTP codes (run via cron)
	 */
	static async cleanupExpiredOTPs(): Promise<number> {
		const result = await database.telegramOTP.deleteMany({
			where: {
				OR: [{ expiresAt: { lt: new Date() } }, { used: true }],
			},
		});
		return result.count;
	}

	/**
	 * Handle Telegram command
	 */
	static async handleCommand(
		command: string,
		args: string[],
		chatId: string,
	): Promise<void> {
		if (!command) {
			return;
		}

		const commandMap: Record<
			string,
			(args: string[], chatId: string) => Promise<void>
		> = {
			link: TelegramService.handleLinkCommand,
			start: TelegramService.handleStartCommand,
			help: TelegramService.handleHelpCommand,
		};

		const handler = commandMap[command.toLowerCase()];

		if (handler) {
			await handler(args, chatId);
		}
	}

	/**
	 * Handle /link command - Link account using OTP code
	 */
	private static async handleLinkCommand(
		args: string[],
		chatId: string,
	): Promise<void> {
		const otpCode = args[0]?.trim();

		if (!otpCode) {
			await TelegramService.sendMessage(
				chatId,
				"❌ <b>Invalid Command</b>\n\nUsage: /link OTP_CODE\n\nExample: /link 123456",
				{ parseMode: "HTML" },
			);
			return;
		}

		try {
			await TelegramService.validateLinkOTP(otpCode, chatId);
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
						: "Invalid or expired OTP code."),
				{ parseMode: "HTML" },
			);
		}
	}

	/**
	 * Handle /start command - Welcome message
	 */
	private static async handleStartCommand(
		_args: string[],
		chatId: string,
	): Promise<void> {
		await TelegramService.sendMessage(
			chatId,
			"👋 <b>Welcome to Dukkani Notifications Bot!</b>\n\nThis bot sends you real-time order notifications from your Dukkani stores.\n\n<b>Commands:</b>\n/link CODE - Link your account using OTP code\n/help - Show this help message\n\nTo link your account:\n1. Go to your Dukkani dashboard settings\n2. Generate an OTP code\n3. Send /link CODE to this bot",
			{ parseMode: "HTML" },
		);
	}

	/**
	 * Handle /help command - Show help message
	 */
	private static async handleHelpCommand(
		_args: string[],
		chatId: string,
	): Promise<void> {
		await TelegramService.sendMessage(
			chatId,
			"📖 <b>Dukkani Bot Commands</b>\n\n/link CODE - Link your Telegram account\n/help - Show this help message\n/start - Welcome message\n\n<b>Need help?</b>\nContact support through your Dukkani dashboard.",
			{ parseMode: "HTML" },
		);
	}

	/**
	 * Handle Telegram callback query (button clicks)
	 * Routes callbacks to appropriate handlers
	 */
	static async handleCallbackQuery(
		callbackData: string,
		callbackQueryId: string,
		chatId: string,
	): Promise<void> {
		const parts = callbackData.split("_");
		const action = parts[0]?.toLowerCase();

		if (!action) {
			// Invalid callback data - silently ignore
			return;
		}

		const callbackMap: Record<
			string,
			(data: string, callbackQueryId: string, chatId: string) => Promise<void>
		> = {
			ship: TelegramService.handleShipCallback,
		};

		const handler = callbackMap[action];
		if (handler) {
			await handler(callbackData, callbackQueryId, chatId);
		}
		// Unknown callbacks are silently ignored
	}

	/**
	 * Handle ship callback - Mark order as shipped
	 * Called when user clicks "Mark as Shipped" button
	 */
	private static async handleShipCallback(
		callbackData: string,
		callbackQueryId: string,
		chatId: string,
	): Promise<void> {
		const parts = callbackData.split("_");
		const orderId = parts[1];
		const shopId = parts[2];

		if (!orderId || !shopId) {
			await TelegramService.answerCallbackQuery(
				callbackQueryId,
				"❌ Invalid callback data",
				true,
			);
			return;
		}

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
			return;
		}

		// Verify user owns the shop before proceeding
		const store = await database.store.findFirst({
			where: {
				id: shopId,
				ownerId: user.id,
			},
			select: { id: true },
		});

		if (!store) {
			await TelegramService.answerCallbackQuery(
				callbackQueryId,
				"❌ You don't have access to this order",
				true,
			);
			return;
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
				error instanceof Error ? error.message : "❌ Failed to update order",
				true,
			);
		}
	}

	/**
	 * Process Telegram webhook update
	 * Main entry point for handling Telegram updates
	 */
	static async processWebhookUpdate(update: {
		message?: { text?: string; chat: { id: number } };
		callback_query?: {
			data?: string;
			id: string;
			message?: { chat: { id: number } };
		};
	}): Promise<void> {
		try {
			// Handle callback queries (button clicks) - priority over commands
			if (update.callback_query) {
				const { data, id: callbackQueryId, message } = update.callback_query;
				if (data && callbackQueryId && message) {
					const chatId = message.chat.id.toString();
					await TelegramService.handleCallbackQuery(
						data,
						callbackQueryId,
						chatId,
					);
				}
				return;
			}

			// Handle commands (text messages starting with /)
			if (update.message?.text?.startsWith("/")) {
				const text = update.message.text;
				const parts = text.slice(1).split(/\s+/);
				const command = parts[0];
				const args = parts.slice(1);
				const chatId = update.message.chat.id.toString();

				if (command) {
					await TelegramService.handleCommand(command, args, chatId);
				}
				return;
			}
		} catch (error) {
			if (update.message?.chat?.id) {
				try {
					await TelegramService.sendMessage(
						update.message.chat.id.toString(),
						"❌ An error occurred processing your request. Please try again later.",
						{ parseMode: "HTML" },
					);
				} catch (sendError) {
					// If we can't send error message, log it but don't throw
					// This prevents infinite error loops
					console.error("Failed to send error message to user:", sendError);
				}
			} else {
				// Log error when we can't send message to user
				console.error("Telegram webhook processing error:", error);
			}
		}
	}
}
