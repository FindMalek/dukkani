import { randomBytes } from "node:crypto";
import { database } from "@dukkani/db";
import { apiEnv } from "@dukkani/env";

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

		if (!response.ok) {
			const error = await response
				.json()
				.catch(() => ({ description: response.statusText }));
			throw new Error(
				`Telegram API error: ${error.description || response.statusText}`,
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

		await fetch(`${TelegramService.BOT_API_URL}/answerCallbackQuery`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
				text,
				show_alert: showAlert,
			}),
		});
	}
}
