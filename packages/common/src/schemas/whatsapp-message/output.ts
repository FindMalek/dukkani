import { z } from "zod";
import { orderSimpleOutputSchema } from "../order/output";
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

export const whatsappMessageIncludeOutputSchema =
	whatsappMessageSimpleOutputSchema.extend({
		order: orderSimpleOutputSchema.optional(),
	});

export type WhatsAppMessageSimpleOutput = z.infer<
	typeof whatsappMessageSimpleOutputSchema
>;
export type WhatsAppMessageIncludeOutput = z.infer<
	typeof whatsappMessageIncludeOutputSchema
>;
