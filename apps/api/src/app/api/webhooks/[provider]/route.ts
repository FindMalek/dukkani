import { apiEnv } from "@dukkani/env";
import { createContext } from "@dukkani/orpc/context";
import { appRouter } from "@dukkani/orpc/routers/index";
import { RPCHandler } from "@orpc/server/fetch";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

const rpcHandler = new RPCHandler(appRouter);

type WebhookHandler = (req: NextRequest) => Promise<Response>;

const webhookHandlers: Record<string, WebhookHandler> = {
	telegram: async (req: NextRequest) => {
		try {
			const telegramUpdate = await req.json();

			const secretToken = req.headers.get("x-telegram-bot-api-secret-token");
			if (secretToken !== apiEnv.TELEGRAM_WEBHOOK_SECRET) {
				console.error("Invalid webhook secret token");
				return NextResponse.json({ ok: true }, { status: 200 });
			}

			const syntheticRequest = new Request(
				new URL("/api/telegram.webhook", req.url),
				{
					method: "POST",
					headers: req.headers,
					body: JSON.stringify(telegramUpdate),
				},
			);

			// Call oRPC procedure via RPCHandler
			const result = await rpcHandler.handle(syntheticRequest, {
				prefix: "/api",
				context: await createContext(req.headers),
			});

			if (result.response) {
				return result.response;
			}

			return NextResponse.json({ ok: true });
		} catch (error) {
			console.error("Telegram webhook error:", error);
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
