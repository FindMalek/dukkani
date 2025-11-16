import { auth } from "@dukkani/auth";
import type { IncomingHttpHeaders } from "node:http";
import { headersToHeaders } from "./utils/headers";

export async function createContext(headers: IncomingHttpHeaders | Headers) {
	// Convert to Headers object if needed
	const headersObj = headersToHeaders(headers);

	const session = await auth.api.getSession({
		headers: headersObj,
	});
	return {
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
