import { z } from "zod";

/**
 * AI module - provider credentials for LLM-backed features (e.g. product
 * description generation). Structured so additional providers (e.g.
 * GEMINI_API_KEY) can be appended without restructuring.
 */
export const aiModule = {
  server: {
    GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  },
} as const;
