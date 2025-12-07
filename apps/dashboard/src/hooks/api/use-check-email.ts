import { useMutation } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

export function useCheckEmailExists() {
	return useMutation(orpc.auth.checkEmailExists.mutationOptions());
}
