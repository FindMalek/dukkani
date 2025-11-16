import { auth } from "@dukkani/auth";
import type { IncomingHttpHeaders } from "node:http";

export async function createContext(headers: IncomingHttpHeaders | Headers) {
	// Convert to Headers object if needed
	const headersObj =
		headers instanceof Headers
			? headers
			: new Headers(
					Object.entries(headers).reduce(
						(acc, [key, value]) => {
							if (value) {
								acc[key] = Array.isArray(value) ? value.join(", ") : value;
							}
							return acc;
						},
						{} as Record<string, string>,
					),
				);

	const session = await auth.api.getSession({
		headers: headersObj,
	});
	return {
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
