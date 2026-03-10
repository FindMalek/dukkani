import { LOG_CONTEXT_LINES, LOG_MAX_CHARS } from "./constants.js";

export function sanitizeLogs(text: string | undefined | null): string {
	if (!text || typeof text !== "string") return "";
	let s = text
		.replace(/\*\*\*/g, "[REDACTED]")
		.replace(/\$\{\{\s*secrets\.\w+\s*\}\}/g, "[REDACTED]")
		.replace(
			/(Bearer|api[_-]?key|token|password|secret)\s*[:=]\s*['"]?[^\s'"]+/gi,
			"$1: [REDACTED]",
		)
		.replace(/https?:\/\/[^:]+:[^@]+@/g, "https://[REDACTED]@")
		.replace(/[^\x20-\x7E\n\r\t]/g, "");
	const errorIdx = s.search(/\b(Error|FAIL|failed|FATAL)\b/i);
	if (errorIdx >= 0) {
		const start = Math.max(0, errorIdx - LOG_CONTEXT_LINES * 80);
		s = s.slice(start);
	}
	if (s.length > LOG_MAX_CHARS) {
		s = s.slice(-LOG_MAX_CHARS);
	}
	return s;
}
