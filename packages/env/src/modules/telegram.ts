import { z } from "zod";

/**
 * Telegram module - defines Telegram Bot API configuration
 * Used by API app for Telegram webhooks and messaging
 */
export const telegramModule = {
	server: {
		TELEGRAM_BOT_NAME: z.string(),
		TELEGRAM_API_TOKEN: z.string(),
		TELEGRAM_WEBHOOK_SECRET: z.string(),
	},
} as const;
