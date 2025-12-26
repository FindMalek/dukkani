import { z } from "zod";

export const createLinkTokenInputSchema = z.object({
	expiresInMinutes: z.number().int().min(1).max(60).optional().default(10),
});

export const sendOTPInputSchema = z.object({
	otp: z.string().min(4).max(8),
});

export type CreateLinkTokenInput = z.infer<typeof createLinkTokenInputSchema>;
export type SendOTPInput = z.infer<typeof sendOTPInputSchema>;

export const handleWebhookInputSchema = z.object({
	update: z.any(),
	secretToken: z.string().optional(),
});

export type HandleWebhookInput = z.infer<typeof handleWebhookInputSchema>;
