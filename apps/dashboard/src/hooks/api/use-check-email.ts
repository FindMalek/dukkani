import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { orpc } from "@/lib/orpc";

const checkEmailExistsInputSchema = z.object({
	email: z.email("Please enter a valid email address"),
});

export type CheckEmailExistsInput = z.infer<typeof checkEmailExistsInputSchema>;

export function useCheckEmailExists() {
	return useMutation(orpc.auth.checkEmailExists.mutationOptions());
}
