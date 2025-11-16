import { z } from "zod";
import { whatsappMessageStatusSchema } from "./enums";

export const whatsappMessageInputSchema = z.object({
	orderId: z.string().min(1, "Order ID is required"),
	content: z.string().min(1, "Message content is required"),
	messageId: z.string().min(1, "Message ID is required"),
	status: whatsappMessageStatusSchema,
	sentAt: z.date(),
});

export const createWhatsAppMessageInputSchema = whatsappMessageInputSchema;

export const updateWhatsAppMessageInputSchema = whatsappMessageInputSchema.partial().extend({
	id: z.string().min(1, "WhatsApp Message ID is required"),
});

export const getWhatsAppMessageInputSchema = z.object({
	id: z.string().min(1, "WhatsApp Message ID is required"),
});

export const listWhatsAppMessagesInputSchema = z.object({
	orderId: z.string().optional(),
	status: whatsappMessageStatusSchema.optional(),
});

export type WhatsAppMessageInput = z.infer<typeof whatsappMessageInputSchema>;
export type CreateWhatsAppMessageInput = z.infer<typeof createWhatsAppMessageInputSchema>;
export type UpdateWhatsAppMessageInput = z.infer<typeof updateWhatsAppMessageInputSchema>;
export type GetWhatsAppMessageInput = z.infer<typeof getWhatsAppMessageInputSchema>;
export type ListWhatsAppMessagesInput = z.infer<typeof listWhatsAppMessagesInputSchema>;

