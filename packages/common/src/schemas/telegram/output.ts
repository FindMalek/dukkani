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

export type TelegramBotLinkOutput = z.infer<typeof telegramBotLinkOutputSchema>;
export type TelegramStatusOutput = z.infer<typeof telegramStatusOutputSchema>;
