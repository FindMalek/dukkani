import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";
import { authEnv } from "./partials/auth";
import { dbEnv } from "./partials/db";
import { nodeEnv } from "./partials/node";
import { telegramEnv } from "./partials/telegram";
import { vercelEnv } from "./partials/vercel";

/**
 * Regex pattern to match wildcard origins like *.example.com
 * - Starts with "*."
 * - Followed by a valid domain name segment (letters, digits, hyphens).
 * - Allows multiple subdomain levels (e.g., *.sub.example.com).
 */
const WILDCARD_ORIGIN_PATTERN =
	/^\*\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const apiAppEnv = createEnv({
	extends: [authEnv, dbEnv, telegramEnv, vercelEnv, nodeEnv],
	server: {
		CORS_ORIGIN: z.url(),
		DASHBOARD_URL: z.url().optional(),
		ALLOWED_ORIGIN: z
			.literal("*")
			.or(z.url())
			.or(
				z.string().regex(WILDCARD_ORIGIN_PATTERN, {
					error: "ALLOWED_ORIGIN wildcard pattern must be like *.domain.com",
				}),
			),
	},
	experimental__runtimeEnv: process.env,
});
