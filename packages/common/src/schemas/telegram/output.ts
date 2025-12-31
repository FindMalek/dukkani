import { z } from "zod";
import { storeMinimalOutputSchema } from "../store/output";

export const telegramBotLinkOutputSchema = z.object({
	botLink: z.string(),
	otpCode: z.string(),
	instructions: z.string(),
});

export const telegramStatusOutputSchema = z.object({
	linked: z.boolean(),
	linkedAt: z.date().nullable(),
	telegramUserName: z.string().nullable(),
	userName: z.string().nullable(),
	userEmail: z.string().nullable(),
	stores: z.array(
		storeMinimalOutputSchema
	),
});

export type TelegramBotLinkOutput = z.infer<typeof telegramBotLinkOutputSchema>;
export type TelegramStatusOutput = z.infer<typeof telegramStatusOutputSchema>;