import { toast } from "sonner";
import { handleAPIError } from "@/lib/error";

/**
 * Hook to copy text to clipboard
 * @returns Function to copy text to clipboard
 */
export function useCopyClipboard(): (
	text: string,
	successMessage?: string,
) => Promise<void> {
	const copy = async (
		text: string,
		successMessage = "Copied to clipboard!",
	) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(successMessage);
		} catch {
			handleAPIError(new Error("Failed to copy"));
		}
	};

	return copy;
}
