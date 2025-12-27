import { z } from "zod";

export const createLinkTokenInputSchema = z.object({
	expiresInMinutes: z.number().int().min(1).max(60).optional().default(10),
});

export const sendOTPInputSchema = z.object({
	otp: z.string().min(4).max(8),
});

const telegramUserSchema = z.object({
	id: z.number(),
	is_bot: z.boolean().optional(),
	first_name: z.string(),
	last_name: z.string().optional(),
	username: z.string().optional(),
	language_code: z.string().optional(),
});

const telegramChatTypeSchema = z.enum([
	"private",
	"group",
	"supergroup",
	"channel",
]);

const telegramChatSchema = z.object({
	id: z.number(),
	type: telegramChatTypeSchema,
	title: z.string().optional(),
	username: z.string().optional(),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
});

const telegramMessageSchema = z.object({
	message_id: z.number(),
	from: telegramUserSchema.optional(),
	date: z.number(),
	chat: telegramChatSchema,
	forward_from: telegramUserSchema.optional(),
	forward_from_chat: telegramChatSchema.optional(),
	text: z.string().optional(),
});

const telegramCallbackQuerySchema = z.object({
	id: z.string(),
	from: telegramUserSchema,
	message: telegramMessageSchema.optional(),
	data: z.string().optional(),
});

export const telegramUpdateSchema = z.object({
	update_id: z.number(),
	message: telegramMessageSchema.optional(),
	edited_message: telegramMessageSchema.optional(),
	callback_query: telegramCallbackQuerySchema.optional(),
});

export type CreateLinkTokenInput = z.infer<typeof createLinkTokenInputSchema>;
export type SendOTPInput = z.infer<typeof sendOTPInputSchema>;
export type TelegramUpdate = z.infer<typeof telegramUpdateSchema>;

export const sendTestMessageInputSchema = z.object({
	message: z.string().min(1),
	parseMode: z.enum(["HTML", "Markdown"]).optional(),
});

export const sendTestOrderNotificationInputSchema = z.object({
	storeId: z.string().min(1),
});

export type SendTestMessageInput = z.infer<typeof sendTestMessageInputSchema>;
export type SendTestOrderNotificationInput = z.infer<
	typeof sendTestOrderNotificationInputSchema
>;
