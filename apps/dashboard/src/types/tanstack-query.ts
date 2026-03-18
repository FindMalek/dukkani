import type { ORPCError } from "@orpc/server";

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: ORPCError<string, unknown>;
	}
}
