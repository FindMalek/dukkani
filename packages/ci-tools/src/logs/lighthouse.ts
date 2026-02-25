/** Parsed Lighthouse CI data from raw job logs (before sanitization). */
export interface LighthouseParseResult {
	reportUrls: string[];
	assertionSummary: string;
}

const LH_REPORT_URL_RE =
	/https:\/\/storage\.googleapis\.com\/lighthouse-infrastructure\.appspot\.com\/reports\/[^\s)]+\.report\.html/g;

export function parseLighthouseFromLogs(
	rawLogs: string,
): LighthouseParseResult {
	const reportUrls = [...(rawLogs.match(LH_REPORT_URL_RE) ?? [])];
	const seen = new Set<string>();
	const uniqueUrls = reportUrls.filter((u) => {
		if (seen.has(u)) return false;
		seen.add(u);
		return true;
	});

	const lines = rawLogs.split(/\r?\n/);
	const assertionLines: string[] = [];
	for (const line of lines) {
		const t = line.trim();
		if (
			(t.includes("categories.") &&
				t.includes("failure") &&
				t.includes("assertion")) ||
			t.startsWith("expected:") ||
			t.startsWith("found:") ||
			t.startsWith("all values:") ||
			/^\d+\s+result\(s\)\s+for\s+http/.test(t)
		) {
			assertionLines.push(t);
		}
	}
	const assertionSummary =
		assertionLines.length > 0 ? assertionLines.join("\n") : "";

	return { reportUrls: uniqueUrls, assertionSummary };
}
