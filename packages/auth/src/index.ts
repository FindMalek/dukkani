import prisma from "@dukkani/db";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "./env";

export const auth = betterAuth<BetterAuthOptions>({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	trustedOrigins: [env.NEXT_PUBLIC_CORS_ORIGIN],
	emailAndPassword: {
		enabled: true,
	},
	plugins: [nextCookies()],
});
