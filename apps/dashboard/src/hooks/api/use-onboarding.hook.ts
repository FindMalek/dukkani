import type { OnboardingCompleteInput } from "@dukkani/common/schemas/onboarding/input";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

/**
 * Query hook for fetching onboarding completion data
 */
export function useOnboardingCompleteQuery(input?: OnboardingCompleteInput) {
	return useQuery(
		orpc.onboarding.complete.queryOptions({
			input,
		}),
	);
}
