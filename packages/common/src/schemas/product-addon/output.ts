import { ProductAddonSelectionType } from "@dukkani/db/prisma/generated/enums";
import { z } from "zod";

export const productAddonOptionPublicSchema = z.object({
  id: z.string(),
  name: z.string(),
  sortOrder: z.number(),
  priceDelta: z.number(),
  stock: z.number(),
});

export const productAddonGroupPublicSchema = z.object({
  id: z.string(),
  name: z.string(),
  sortOrder: z.number(),
  selectionType: z.nativeEnum(ProductAddonSelectionType),
  required: z.boolean(),
  options: z.array(productAddonOptionPublicSchema),
});

export type ProductAddonOptionPublic = z.infer<
  typeof productAddonOptionPublicSchema
>;
export type ProductAddonGroupPublic = z.infer<
  typeof productAddonGroupPublicSchema
>;
