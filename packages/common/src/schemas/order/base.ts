import { z } from "zod";
import { productLineItemSchema } from "../product/input";

export const orderItemAddonSnapshotSchema = z.object({
  addonOptionId: z.string().min(1),
  groupName: z.string().min(1),
  optionName: z.string().min(1),
  priceDelta: z.number(),
  quantity: z.number().int().min(1),
});

/**
 * Cart line plus server-resolved pricing from the published product version.
 * Extends {@link productLineItemSchema} (including duplicate add-on option refinement).
 */
export const pricedProductLineItemSchema = productLineItemSchema.extend({
  price: z.number().nonnegative(),
  productVersionId: z.string().min(1),
  productNameAtCheckout: z.string().min(1),
  addonSnapshots: z.array(orderItemAddonSnapshotSchema),
});

export type OrderItemAddonSnapshot = z.infer<
  typeof orderItemAddonSnapshotSchema
>;
export type PricedProductLineItem = z.infer<typeof pricedProductLineItemSchema>;
