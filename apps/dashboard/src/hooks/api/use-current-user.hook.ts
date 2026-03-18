import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

/**
 * Current authenticated user (includes onboardingStep). Use when session is known.
 */
export function useCurrentUserQuery(enabled: boolean) {
	return useQuery({
		...orpc.account.getCurrentUser.queryOptions(),
		enabled,
	});
}
