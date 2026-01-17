import { TelegramService } from "@dukkani/common/services";
import { apiAppEnv } from "@dukkani/env/apps/api";
import { logger } from "@dukkani/logger";
import { addSpanAttributes } from "@dukkani/tracing";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

type WebhookHandler = (req: NextRequest) => Promise<Response>;

const webhookHandlers: Record<string, WebhookHandler> = {
	telegram: async (req: NextRequest) => {
		try {
			addSpanAttributes({
				"webhook.provider": "telegram",
			});

			const telegramUpdate = await req.json();
			const secretToken = req.headers.get("x-telegram-bot-api-secret-token");

			if (secretToken !== apiAppEnv.TELEGRAM_WEBHOOK_SECRET) {
				return NextResponse.json({ ok: true }, { status: 200 });
			}

			addSpanAttributes({
				"telegram.update.type": telegramUpdate.callback_query
					? "callback_query"
					: telegramUpdate.message?.text?.startsWith("/")
						? "command"
						: "message",
			});

			await TelegramService.processWebhookUpdate(telegramUpdate);
			return NextResponse.json({ ok: true });
		} catch (error) {
			logger.error({ error, provider: "telegram" }, "Telegram webhook error");
			return NextResponse.json({ ok: true }, { status: 200 });
		}
	},
};

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ provider: string }> },
) {
	const { provider } = await params;

	const handler = webhookHandlers[provider];

	if (!handler) {
		return NextResponse.json(
			{ error: "Unknown webhook provider" },
			{ status: 404 },
		);
	}

	return handler(req);
}

export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}
