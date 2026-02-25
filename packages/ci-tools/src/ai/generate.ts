import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { ciToolsEnv } from "@dukkani/env/presets/ci-tools";

const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const MAX_RETRIES = 2;
const TIMEOUT_MS = 30_000;

export interface GenerateAnalysisOptions {
	apiKey?: string;
	model?: string;
}

export async function generateAnalysis(
	prompt: string,
	options: GenerateAnalysisOptions = {},
): Promise<string> {
	const apiKey = options.apiKey ?? ciToolsEnv.GROQ_API_KEY;
	if (!apiKey) {
		throw new Error("GROQ_API_KEY (or options.apiKey) is required");
	}

	const modelId = options.model ?? DEFAULT_MODEL;
	// Groq provider reads GROQ_API_KEY from env; we set it for this call if passed
	if (apiKey) {
		process.env.GROQ_API_KEY = apiKey;
	}

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		try {
			const { text } = await generateText({
				model: groq(modelId),
				prompt,
				maxTokens: 1024,
				temperature: 0.3,
				abortSignal: AbortSignal.timeout(TIMEOUT_MS),
			});

			return text?.trim() ?? "Unable to generate analysis.";
		} catch (e) {
			const status =
				e &&
				typeof e === "object" &&
				"status" in e &&
				typeof (e as { status: unknown }).status === "number"
					? (e as { status: number }).status
					: undefined;
			const isRetryable =
				status === 429 || (typeof status === "number" && status >= 500);
			if (attempt < MAX_RETRIES && isRetryable) {
				await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
				continue;
			}
			throw e;
		}
	}

	return "Automated analysis unavailable.";
}
