import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { NextResponse } from "next/server";
import { client } from "@/lib/orpc";

const STORE_SLUG_COOKIE = "storefront_store_slug";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function GET(request: Request) {
	if (process.env.VERCEL_ENV !== "preview") {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug")?.trim().toLowerCase();
	const redirect = searchParams.get("redirect") || "/en";

	if (!slug || isReservedStoreSlug(slug)) {
		return NextResponse.redirect(new URL(redirect, request.url));
	}

	try {
		await client.store.getBySlugPublic({ slug });
	} catch {
		return NextResponse.redirect(new URL(redirect, request.url));
	}

	const response = NextResponse.redirect(new URL(redirect, request.url));
	response.cookies.set(STORE_SLUG_COOKIE, slug, {
		path: "/",
		maxAge: COOKIE_MAX_AGE,
		sameSite: "lax",
		secure: true,
	});

	return response;
}
