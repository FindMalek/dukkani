import type { IncomingHttpHeaders } from "node:http";
import { auth } from "@dukkani/core";
import { headersToHeaders, headersToObject } from "./utils/headers";

export async function createContext(headers: IncomingHttpHeaders | Headers) {
	const headersObj = headersToHeaders(headers);
	const headersPlain = headersToObject(headers);

	const session = await auth.api.getSession({
		headers: headersObj,
	});
	return {
		session,
		headers: headersPlain,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
