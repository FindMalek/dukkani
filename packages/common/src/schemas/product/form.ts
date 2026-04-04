import * as z from "zod";
import { productSchema } from "./base";

export const productImageRemoteSchema = z.strictObject({
  kind: z.literal("remote"),
  url: z.url(),
});

export const productImageLocalSchema = z.strictObject({
  kind: z.literal("local"),
  file: z.file(),
  clientId: z.string().min(1, "Client ID is required"),
});

export const productImageAttachmentSchema = z.discriminatedUnion("kind", [
  productImageRemoteSchema,
  productImageLocalSchema,
]);

export type ProductImageAttachment = z.infer<
  typeof productImageAttachmentSchema
>;

export const productFormSchema = productSchema
  .omit({
    storeId: true,
  })
  .extend({
    price: z.coerce.number<string>().positive("Price must be positive"),
    stock: z.coerce.number<string>().min(0, "Stock cannot be negative"),
    images: z
      .array(productImageAttachmentSchema)
      .max(10, "Maximum 10 images allowed"),
  })
  .transform(({ images, ...form }) => form);

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.infer<typeof productFormSchema>;
