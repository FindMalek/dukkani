import { auth } from "@dukkani/auth";
import type { IncomingHttpHeaders } from "node:http";

export async function createContext(headers: IncomingHttpHeaders | Headers) {
	// Convert Headers to plain object if needed
	const headersObj =
		headers instanceof Headers
			? Object.fromEntries(headers.entries())
			: headers;

	const session = await auth.api.getSession({
		headers: headersObj,
	});
	return {
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
