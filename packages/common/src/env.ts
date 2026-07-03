import { commonEnv } from "@dukkani/env/presets";

/**
 * Common package environment
 * Uses commonEnv preset which includes AI provider credentials (Groq)
 * used by shared business logic such as ProductService's description generation.
 */
export const env = commonEnv;
