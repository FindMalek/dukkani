import { z } from "zod";

export const cartItemOutputSchema = z.object({
	productId: z.string(),
	variantId: z.string().optional(),
	quantity: z.number().int(),
	productName: z.string(),
	productImage: z.string().optional(),
	productDescription: z.string().optional(),
	price: z.number(),
	stock: z.number(),
});

export type CartItemOutput = z.infer<typeof cartItemOutputSchema>;
