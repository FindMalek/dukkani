import type { CheckEmailExistsInput } from "@dukkani/common/schemas/user/input";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/orpc";

export function useCheckEmailExists() {
	return useMutation({
		mutationFn: (input: CheckEmailExistsInput) =>
			client.account.checkEmailExists(input),
	});
}
