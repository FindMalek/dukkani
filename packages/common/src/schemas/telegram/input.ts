import { z } from "zod";

export const sendOTPInputSchema = z.object({
	otp: z.string().min(4).max(8),
});

export type SendOTPInput = z.infer<typeof sendOTPInputSchema>;
