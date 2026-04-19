import z from "zod";

export const productVariantOptionValueSchema = z.object({
  value: z.string().trim().nonempty("Variant value is required"),
});

export const productVariantOptionRowSchema = z.object({
  name: z.string().trim().nonempty("Variant option name is required"),
  values: z
    .array(productVariantOptionValueSchema)
    .refine(
      (values) => {
        return (
          new Set(values.map((v) => v.value.toLowerCase())).size ===
          values.length
        );
      },
      {
        message: "Duplicate variant values are not allowed",
      },
    )
    .nonempty("At least one variant value is required"),
});

export type ProductVariantOptionFormRow = z.input<
  typeof productVariantOptionRowSchema
>;

export const productSchema = z.strictObject({
  name: z.string().trim().nonempty("Product name is required"),
  description: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  published: z.boolean(),
  storeId: z.string().min(1, "Store ID is required"),
  categoryId: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val)),
  hasVariants: z.boolean(),
  variantOptions: z.array(productVariantOptionRowSchema).refine(
    (options) => {
      return (
        new Set(options.map((o) => o.name.toLowerCase())).size ===
        options.length
      );
    },
    {
      message: "Duplicate variant options are not allowed",
    },
  ),
});

/** Lines passed to bulk product stock updates (variant vs base product). */
export const productStockUpdateLineSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1),
});

export type ProductStockUpdateLine = z.infer<
  typeof productStockUpdateLineSchema
>;
