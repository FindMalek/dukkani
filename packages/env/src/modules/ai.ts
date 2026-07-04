import { z } from "zod";

/**
 * AI module - provider credentials for LLM-backed features (e.g. product
 * description generation). Structured so additional providers (e.g.
 * GEMINI_API_KEY) can be appended without restructuring.
 *
 * Optional at the env-schema level: `ProductService` (and this preset) load
 * at module scope, so a required var here would crash every app that merely
 * imports `@dukkani/common` — including ones that never call AI generation.
 * `ProductService.generateDescription` re-checks for the key at call time and
 * fails gracefully (`BadRequestError`) if it's missing.
 */
export const aiModule = {
  server: {
    GROQ_API_KEY: z.string().min(1).optional(),
  },
} as const;
