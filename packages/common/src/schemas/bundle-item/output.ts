import { z } from "zod";

export const bundleItemOutputSchema = z.object({
  id: z.string(),
  childProductId: z.string(),
  childVariantId: z.string().nullable(),
  childProductName: z.string(),
  childVariantLabel: z.string().nullable(),
  imageUrls: z.array(z.string()),
  itemQty: z.number().int(),
  unitPrice: z.number(),
  sortOrder: z.number().int(),
});

export type BundleItemOutput = z.infer<typeof bundleItemOutputSchema>;
