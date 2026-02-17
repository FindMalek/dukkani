import { z } from "zod";
import { productLineItemSchema } from "../product/input";

export const getCartItemsInputSchema = z.object({
	items: z
		.array(productLineItemSchema)
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
