import { z } from "zod";

export const telegramBotLinkOutputSchema = z.object({
	botLink: z.string(),
	otpCode: z.string(),
	instructions: z.string(),
});

export const telegramStatusOutputSchema = z.object({
	linked: z.boolean(),
	linkedAt: z.date().nullable(),
});

export const successOutputSchema = z.object({
	success: z.boolean(),
});

export type TelegramBotLinkOutput = z.infer<typeof telegramBotLinkOutputSchema>;
export type TelegramStatusOutput = z.infer<typeof telegramStatusOutputSchema>;
export type SuccessOutput = z.infer<typeof successOutputSchema>;
