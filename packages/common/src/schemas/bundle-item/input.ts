import { z } from "zod";

export const bundleItemInputSchema = z.object({
  childProductId: z.string().min(1),
  childVariantId: z.string().min(1).optional(),
  itemQty: z.number().int().min(1).default(1),
  sortOrder: z.number().int().min(0).default(0),
});

export type BundleItemInput = z.infer<typeof bundleItemInputSchema>;
