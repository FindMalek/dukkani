import { ProductAddonSelectionType } from "@dukkani/db/prisma/generated/enums";
import { z } from "zod";

export { ProductAddonSelectionType };

export const cartAddonSelectionSchema = z.object({
  addonOptionId: z.string().min(1),
  quantity: z.number().int().min(1).optional().default(1),
});

export const productAddonOptionInputSchema = z.object({
  name: z.string().min(1),
  sortOrder: z.number().int().min(0).optional().default(0),
  priceDelta: z.number().min(0),
  stock: z.number().int().min(0).optional().default(0),
});

export const productAddonGroupInputSchema = z.object({
  name: z.string().min(1),
  sortOrder: z.number().int().min(0).optional().default(0),
  selectionType: z.nativeEnum(ProductAddonSelectionType),
  required: z.boolean().optional().default(false),
  options: z
    .array(productAddonOptionInputSchema)
    .min(1, "At least one option per add-on group"),
});

export type CartAddonSelection = z.infer<typeof cartAddonSelectionSchema>;
export type ProductAddonOptionInput = z.infer<
  typeof productAddonOptionInputSchema
>;
export type ProductAddonGroupInput = z.infer<
  typeof productAddonGroupInputSchema
>;
