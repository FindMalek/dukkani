import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useTelegramStatus() {
	return useQuery(orpc.telegram.getStatus.queryOptions());
}

export function useCreateTelegramLink() {
	return useMutation(orpc.telegram.createLinkToken.mutationOptions());
}
