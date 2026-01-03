import { logger } from "@dukkani/logger";
import { toast } from "sonner";

export interface APIError {
	code?: string;
	message?: string;
	status?: number;
}

/**
 * Handle API errors with user-friendly toast messages
 */
export function handleAPIError(
	error: any,
	fallbackMessage = "An error occurred. Please try again.",
) {
	logger.error({ error }, "API Error");

	// Rate limiting errors
	if (error?.code === "TOO_MANY_REQUESTS") {
		const retryAfter = error?.message?.match(/try again in (\d+) second/)?.[1];
		toast.error(
			retryAfter
				? `Too many requests. Please wait ${retryAfter} second${retryAfter !== "1" ? "s" : ""} before trying again.`
				: "Too many requests. Please wait a moment before trying again.",
		);
		return;
	}

	// Network errors
	if (
		error?.message?.includes("network") ||
		error?.message?.includes("fetch") ||
		error?.message?.includes("Failed to fetch")
	) {
		toast.error("Network error. Please check your connection and try again.");
		return;
	}

	// Validation errors
	if (
		error?.message?.includes("validation") ||
		error?.code === "BAD_REQUEST" ||
		error?.status === 400
	) {
		toast.error("Please check your input and try again.");
		return;
	}

	// Authentication errors
	if (error?.code === "UNAUTHORIZED" || error?.status === 401) {
		toast.error("Authentication failed. Please try again.");
		return;
	}

	// Server errors
	if (error?.code === "INTERNAL_SERVER_ERROR" || error?.status >= 500) {
		toast.error("Server error. Please try again later.");
		return;
	}

	// Fallback
	toast.error(fallbackMessage);
}
