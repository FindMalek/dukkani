import { DIFF_MAX_CHARS } from "./constants.js";

export function truncateDiff(text: string | undefined | null): string {
	if (!text || typeof text !== "string") return "";
	let s = text.replace(/[^\x20-\x7E\n\r\t]/g, "");
	if (s.length > DIFF_MAX_CHARS) {
		s = s.slice(-DIFF_MAX_CHARS);
		s = "(diff truncated from start)\n" + s;
	}
	return s;
}
