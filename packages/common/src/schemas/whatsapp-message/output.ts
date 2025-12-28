import { z } from "zod";
import { whatsappMessageStatusSchema } from "./enums";

export const whatsappMessageSimpleOutputSchema = z.object({
	id: z.string(),
	orderId: z.string(),
	content: z.string(),
	messageId: z.string(),
	status: whatsappMessageStatusSchema,
	sentAt: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type WhatsAppMessageSimpleOutput = z.infer<
	typeof whatsappMessageSimpleOutputSchema
>;
