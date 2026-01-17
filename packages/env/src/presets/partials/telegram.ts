import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const telegramEnv = createEnv({
	server: {
		TELEGRAM_API_TOKEN: z.string(),
		TELEGRAM_BOT_NAME: z.string().optional(),
		TELEGRAM_WEBHOOK_SECRET: z.string().optional(),
	},
	runtimeEnvStrict: {
		TELEGRAM_API_TOKEN: process.env.TELEGRAM_API_TOKEN,
		TELEGRAM_BOT_NAME: process.env.TELEGRAM_BOT_NAME,
		TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
	},
  emptyStringAsUndefined: true,
});
