import { z } from "zod";

export const createAddressInputSchema = z.object({
	street: z.string().min(1, "Street address is required"),
	city: z.string().min(1, "City is required"),
	postalCode: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	isDefault: z.boolean().default(false),
	customerId: z.string().min(1, "Customer ID is required"),
});

export type CreateAddressInput = z.infer<typeof createAddressInputSchema>;
