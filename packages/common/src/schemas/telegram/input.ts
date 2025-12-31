import { z } from "zod";

export const sendOTPInputSchema = z.object({
	otp: z.string().min(4).max(8),
});

export const disconnectTelegramInputSchema = z.object({
	storeName: z.string().min(1, "Store name is required"),
});

export type SendOTPInput = z.infer<typeof sendOTPInputSchema>;
export type DisconnectTelegramInput = z.infer<
	typeof disconnectTelegramInputSchema
>;
