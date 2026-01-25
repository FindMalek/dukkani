import { ORPCError } from "@orpc/server";
import { toast } from "sonner";

export function handleAPIError(error: unknown) {
	if (error instanceof ORPCError) {
		toast.error(error.message || "An error occurred");
	} else if (error instanceof Error) {
		toast.error(error.message);
	} else {
		toast.error("An unexpected error occurred");
	}
}
