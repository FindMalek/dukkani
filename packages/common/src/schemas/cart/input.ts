import { z } from "zod";

export const getCartItemsInputSchema = z.object({
	items: z
		.array(
			z.object({
				productId: z.string(),
				variantId: z.string().optional(),
				quantity: z.number().int().min(1),
			}),
		)
		.min(1)
		.max(50)
		.refine(
			(items) => {
				const keys = items.map(
					(item) => `${item.productId}-${item.variantId ?? ""}`,
				);
				return new Set(keys).size === keys.length;
			},
			{
				message: "Duplicate items in cart",
			},
		),
});

export type GetCartItemsInput = z.infer<typeof getCartItemsInputSchema>;
