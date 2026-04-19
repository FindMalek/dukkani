import * as z from "zod";

/**
 * One SKU row in the dashboard product form (selections keyed by option name).
 * Empty `price` means inherit the product version base price (no per-variant override).
 */
export const productVariantFormRowSchema = z.strictObject({
  selections: z.record(z.string(), z.string()),
  sku: z.string().optional(),
  price: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : val,
    z.coerce.number().positive().optional(),
  ),
  stock: z.coerce.number<string>().int().min(0, "Stock cannot be negative"),
  imageRef: z.string().optional(),
});

export type ProductVariantFormRowInput = z.input<
  typeof productVariantFormRowSchema
>;

export type ProductVariantFormRow = z.infer<typeof productVariantFormRowSchema>;
