import { z } from "zod";

export const addressSimpleOutputSchema = z.object({
	id: z.string(),
	street: z.string(),
	city: z.string(),
	postalCode: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	isDefault: z.boolean(),
	customerId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type AddressSimpleOutput = z.infer<typeof addressSimpleOutputSchema>;
