import { z } from "zod";
import { cartAddonSelectionSchema } from "../product-addon/input";

export const cartItemOutputSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().int(),
  addonSelections: z.array(cartAddonSelectionSchema).optional(),
  productName: z.string(),
  productImage: z.string().optional(),
  productDescription: z.string().optional(),
  /** Unit price including selected add-ons (server authority). */
  price: z.number(),
  stock: z.number(),
  /** Human-readable add-on lines for cart UI. */
  addonSummaryLines: z.array(z.string()).optional(),
});

export type CartItemOutput = z.infer<typeof cartItemOutputSchema>;
