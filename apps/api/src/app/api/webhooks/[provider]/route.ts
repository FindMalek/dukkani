import { TelegramService } from "@dukkani/common/services";
import { apiEnv } from "@dukkani/env";
import { telegramLogger } from "@dukkani/logger";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

type WebhookHandler = (req: NextRequest) => Promise<Response>;

const webhookHandlers: Record<string, WebhookHandler> = {
	telegram: async (req: NextRequest) => {
		try {
			const telegramUpdate = await req.json();
			const secretToken = req.headers.get("x-telegram-bot-api-secret-token");

			if (secretToken !== apiEnv.TELEGRAM_WEBHOOK_SECRET) {
				telegramLogger.warn("Invalid webhook secret token");
				return NextResponse.json({ ok: true }, { status: 200 });
			}

			await TelegramService.processWebhookUpdate(telegramUpdate);
			return NextResponse.json({ ok: true });
		} catch (error) {
			telegramLogger.error(
				{
					error: error instanceof Error ? error.message : String(error),
					stack: error instanceof Error ? error.stack : undefined,
				},
				"Telegram webhook error",
			);
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
		telegramLogger.warn({ provider }, "Unknown webhook provider");
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
