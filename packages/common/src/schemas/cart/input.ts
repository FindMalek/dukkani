import { z } from "zod";
import { type ProductLineItem, productLineItemSchema } from "../product/input";

function cartLineIdentity(item: ProductLineItem): string {
  const adds = (item.addonSelections ?? [])
    .slice()
    .sort((a, b) => a.addonOptionId.localeCompare(b.addonOptionId))
    .map((a) => `${a.addonOptionId}:${a.quantity}`)
    .join("|");
  return `${item.productId}\0${item.variantId ?? ""}\0${adds}`;
}

export const getCartItemsInputSchema = z.object({
  items: z
    .array(productLineItemSchema)
    .min(1)
    .max(50)
    .refine(
      (items) => {
        const keys = items.map(cartLineIdentity);
        return new Set(keys).size === keys.length;
      },
      {
        message: "Duplicate items in cart",
      },
    ),
});

export type GetCartItemsInput = z.infer<typeof getCartItemsInputSchema>;
