import { z } from "zod";

export const sendOTPInputSchema = z.object({
	otp: z.string().min(4).max(8),
});

export type SendOTPInput = z.infer<typeof sendOTPInputSchema>;

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
