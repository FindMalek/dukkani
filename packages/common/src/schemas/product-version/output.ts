import { z } from "zod";
import { imageSimpleOutputSchema } from "../image/output";
import { productAddonGroupPublicSchema } from "../product-addon/output";
import {
  variantOptionOutputSchema,
  variantOutputSchema,
} from "../variant/output";

/** Merchandising slice for a ProductVersion (detail include), without product shell ids. */
export const productVersionDetailOutputSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number().int(),
  hasVariants: z.boolean(),
  images: z.array(imageSimpleOutputSchema),
  variantOptions: z.array(variantOptionOutputSchema),
  variants: z.array(variantOutputSchema),
  addonGroups: z.array(productAddonGroupPublicSchema),
});

export type ProductVersionDetailOutput = z.infer<
  typeof productVersionDetailOutputSchema
>;
