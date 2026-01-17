import type { DisconnectTelegramInput } from "@dukkani/common/schemas/telegram/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";

/**
 * Query hook for fetching Telegram connection status
 */
export function useTelegramStatusQuery() {
	return useQuery(orpc.telegram.getStatus.queryOptions());
}

/**
 * Query hook for fetching Telegram bot link and OTP
 */
export function useTelegramBotLinkQuery(enabled = true) {
	return useQuery({
		...orpc.telegram.getBotLink.queryOptions(),
		enabled,
	});
}

/**
 * Mutation hook for disconnecting Telegram
 */
export function useDisconnectTelegramMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: DisconnectTelegramInput) =>
			client.telegram.disconnect(input),
		onSuccess: () => {
			// Invalidate telegram status query
			queryClient.invalidateQueries({
				queryKey: queryKeys.telegram.status(),
			});
		},
	});
}
