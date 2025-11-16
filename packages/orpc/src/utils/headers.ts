/**
 * Type guard to check if an object is Headers-like
 */
function isHeadersLike(
	headers: unknown,
): headers is
	| Headers
	| { forEach(callback: (value: string, key: string) => void): void } {
	return (
		headers instanceof Headers ||
		(typeof headers === "object" &&
			headers !== null &&
			"forEach" in headers &&
			typeof (headers as { forEach?: unknown }).forEach === "function")
	);
}

/**
 * Converts various header formats to a plain object
 */
export function headersToObject(
	headers:
		| Headers
		| { forEach(callback: (value: string, key: string) => void): void }
		| Record<string, string | string[] | undefined>,
): Record<string, string> {
	// Handle Headers-like objects (including Next.js ReadonlyHeaders)
	if (isHeadersLike(headers)) {
		const result: Record<string, string> = {};
		headers.forEach((value: string, key: string) => {
			result[key] = value;
		});
		return result;
	}

	// Handle plain objects
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(headers)) {
		if (value) {
			result[key] = Array.isArray(value) ? value.join(", ") : String(value);
		}
	}
	return result;
}

/**
 * Converts various header formats to a Headers instance
 */
export function headersToHeaders(
	headers: Headers | Record<string, string | string[] | undefined>,
): Headers {
	if (headers instanceof Headers) {
		return headers;
	}

	// Convert plain object to Headers
	const headersObj = new Headers();
	for (const [key, value] of Object.entries(headers)) {
		if (value) {
			const headerValue = Array.isArray(value)
				? value.join(", ")
				: String(value);
			headersObj.set(key, headerValue);
		}
	}
	return headersObj;
}
