import { z } from "zod";

/**
 * Kapso module - defines Kapso (managed WhatsApp Business API) configuration
 * Used by API app to send WhatsApp order notifications to merchants
 *
 * KAPSO_API_KEY is a project-level API key from app.kapso.ai (same key works
 * across Kapso's WhatsApp, Platform, and Workflows APIs).
 */
export const kapsoModule = {
  server: {
    KAPSO_API_KEY: z.string(),
  },
} as const;
