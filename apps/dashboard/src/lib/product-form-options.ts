import {
  type ProductFormInput,
  productFormSchema,
} from "@dukkani/common/schemas/product/form";
import { formOptions } from "@tanstack/react-form";

export const productFormOptions = formOptions({
  defaultValues: {
    name: "",
    description: "",
    price: "",
    stock: "1",
    published: false,
    categoryId: "",
    hasVariants: false,
    imageFiles: [],
    variantOptions: [],
  } as ProductFormInput,
  validators: {
    onChange: productFormSchema,
    onBlur: productFormSchema,
  },
});
