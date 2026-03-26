import { isStoreSelectorEnabled } from "@dukkani/env";
import { getApiUrl } from "@dukkani/env/get-api-url";
import { storefrontRouter } from "@dukkani/orpc";
import { RPCHandler } from "@orpc/server/fetch";
import type { NextRequest } from "next/server";
import { env } from "@/env";

const STORE_SLUG_COOKIE = "storefront_store_slug";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const rpcHandler = new RPCHandler(storefrontRouter, {});

async function createStorefrontContext() {
  return {
    apiUrl: getApiUrl(env.NEXT_PUBLIC_API_URL),
  };
}

export async function POST(req: NextRequest) {
  if (!isStoreSelectorEnabled(process.env)) {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(req.url);
  const pathname = url.pathname;

  // Clone to read body for cookie (handler needs the original body)
  const reqClone = req.clone();
  const body = await reqClone.json().catch(() => null);

  const rpcResult = await rpcHandler.handle(req, {
    prefix: "/api/storefront",
    context: await createStorefrontContext(),
  });

  if (!rpcResult.response) {
    return new Response("Not found", { status: 404 });
  }

  let response = rpcResult.response;

  // If selectStore succeeded, add Set-Cookie for the store slug
  if (pathname.endsWith("/selectStore") && response.ok) {
    const slug = body?.json?.slug;
    if (typeof slug === "string" && slug.trim()) {
      const cookieValue = slug.trim().toLowerCase();
      const isSecure = url.protocol === "https:";
      const setCookie = `${STORE_SLUG_COOKIE}=${cookieValue}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers),
      });
      response.headers.append("Set-Cookie", setCookie);
    }
  }

  return response;
}
