import { z } from "zod";

/**
 * Client module - shared NEXT_PUBLIC_* vars used by all Next.js apps
 * Extracted to avoid duplication across presets
 */
export const clientModule = {
  client: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(["development", "production", "local"])
      .default("local")
      .transform((val) => {
        // Map Vercel's preview environment to development
        if (process.env.VERCEL_ENV === "preview") return "development";
        return val;
      }),
    // Distinct from NEXT_PUBLIC_NODE_ENV, which collapses preview into
    // "development" — some client-only behavior (e.g. demo-account login
    // prefill) needs to detect preview specifically, not local dev too.
    // Not auto-populated by Vercel; must be set explicitly (see each app's
    // vercel.json `env` block, e.g. `"NEXT_PUBLIC_VERCEL_ENV": "$VERCEL_ENV"`).
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(["production", "preview", "development"])
      .optional(),
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_ALLOWED_ORIGIN: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          if (val === "*") return true;
          try {
            new URL(val);
            return true;
          } catch {
            // Not a URL, check if it's a wildcard pattern
          }
          if (val.includes("*")) {
            const dnsLabel =
              /^(\*|[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
            const labels = val.split(".");
            if (labels.length < 2) return false;
            for (const label of labels) {
              if (!dnsLabel.test(label)) return false;
            }
            if (val.startsWith("*") && !val.startsWith("*.")) {
              return false;
            }
            return true;
          }
          return false;
        },
        {
          message:
            "NEXT_PUBLIC_ALLOWED_ORIGIN must be '*', a valid URL, or a wildcard pattern like *.domain.com",
        },
      ),
  },
} as const;
