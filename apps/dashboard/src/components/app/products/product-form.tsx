"use client";

import {
  type ProductFormInput,
  productFormSchema,
} from "@dukkani/common/schemas/product/form";
import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardFooter } from "@dukkani/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import {
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useCategoriesQuery } from "@/hooks/api/use-categories";
import { useProductsController } from "@/hooks/controllers/use-products-controller";
import { compressImagesForUpload } from "@/lib/compress-images";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";
import { CategoryDrawer } from "./category-drawer";

export interface ProductFormHandle {
  submit: (published: boolean) => void;
}

export const ProductForm = forwardRef<ProductFormHandle, { storeId: string }>(
  ({ storeId }, ref) => {
    const router = useRouter();
    const t = useTranslations("products.create");
    const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

    const { createProductMutationOptions } = useProductsController();
    const { data: categories } = useCategoriesQuery({
      storeId,
    });

    const createProductMutation = useMutation(createProductMutationOptions);
    const form = useAppForm({
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
      onSubmit: async ({ value }) => {
        const imageUrls = await (async () => {
          if (value.imageFiles.length === 0) {
            return [];
          }

          try {
            const res = await client.product.uploadImages({
              storeId,
              files: value.imageFiles,
            });
            return res.files.map((file) => file.url);
          } catch (error) {
            handleAPIError(error);
            return null;
          }
        })();

        if (imageUrls === null) {
          return;
        }

        const cleanedFormData = productFormSchema.parse(value);
        const cleanedData = {
          ...cleanedFormData,
          imageUrls,
          storeId,
        };
        await handleCreateProduct(cleanedData);
      },
      validators: {
        onChange: productFormSchema,
        onBlur: productFormSchema,
      },
    });
    const handleCreateProduct = useCallback(
      async (input: CreateProductInput) => {
        await createProductMutation.mutateAsync(input, {
          onSuccess: () => {
            router.push(RoutePaths.PRODUCTS.INDEX.url);
            form.reset();
          },
          onError: (error) => {
            handleAPIError(error);
          },
        });
      },
      [createProductMutation, form, router],
    );

    const handleOpenCategoryDrawer = useCallback(() => {
      setIsCategoryDrawerOpen(true);
    }, []);

    const categoriesOptions = useMemo(() => {
      if (!categories?.length) return [];
      return [
        {
          id: "categories",
          options: categories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        },
      ];
    }, [categories]);

    const handleCategoryCreated = useCallback(
      (categoryId: string) => {
        form.setFieldValue("categoryId", categoryId);
      },
      [form],
    );

    const handleAddNewVariantOption = useCallback(() => {
      if (
        form.state.values.variantOptions?.some((option) => option.name === "")
      ) {
        return;
      }
      form.setFieldValue("variantOptions", (prev) => [
        ...(prev ?? []),
        { name: "", values: [] },
      ]);
    }, [form]);

    useImperativeHandle(ref, () => ({
      submit: (published: boolean) => {
        form.setFieldValue("published", published);
        form.handleSubmit();
      },
    }));

    return (
      <>
        <Form
          onSubmit={form.handleSubmit}
          className="flex flex-col gap-4 px-2 pb-24"
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>{t("sections.essentials")}</FieldLegend>
              <FieldGroup>
                <form.AppForm>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextInput
                        label={t("form.name.label")}
                        placeholder={t("form.name.placeholder")}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="description">
                    {(field) => (
                      <field.TextAreaInput
                        label={t("form.description.label")}
                        placeholder={t("form.description.placeholder")}
                      />
                    )}
                  </form.AppField>
                  <div className="flex items-start justify-between gap-4">
                    <form.AppField name="price">
                      {(field) => (
                        <field.PriceInput label={t("form.price.label")} />
                      )}
                    </form.AppField>
                    <form.AppField name="stock">
                      {(field) => (
                        <field.NumberInput label={t("form.stock.label")} />
                      )}
                    </form.AppField>
                  </div>
                  <form.AppField name="categoryId">
                    {(field) => (
                      <field.SelectInput
                        label={t("form.category.label")}
                        placeholder={t("form.category.uncategorized")}
                        options={categoriesOptions}
                        onNewOptionClick={handleOpenCategoryDrawer}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="imageFiles" mode="array">
                    {(imageUrlsField) => (
                      <imageUrlsField.ImagesInput
                        label={t("form.photos")}
                        optimizeFiles={compressImagesForUpload}
                      />
                    )}
                  </form.AppField>
                  <form.AppField
                    name="hasVariants"
                    listeners={{
                      onChange: ({ value }) => {
                        if (value) {
                          form.setFieldValue("variantOptions", [
                            { name: "", values: [] },
                          ]);
                        } else {
                          form.setFieldValue("variantOptions", []);
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <field.SwitchInput
                        label={t("form.options.label")}
                        description={t("form.options.description")}
                      />
                    )}
                  </form.AppField>
                  <form.Subscribe
                    selector={(state) => state.values.hasVariants}
                  >
                    {(hasVariants) => (
                      <Collapsible open={hasVariants}>
                        <CollapsibleContent>
                          <FieldSet className="mx-6">
                            <Card className="mb-4">
                              <CardContent>
                                <form.AppField
                                  name="variantOptions"
                                  mode="array"
                                >
                                  {(variantOptionsField) => (
                                    <variantOptionsField.ArrayInput
                                      label={t("form.variants.options.title")}
                                      srOnlyLabel
                                    >
                                      {variantOptionsField.state.value?.map(
                                        (variantOption, variantOptionIndex) => (
                                          <form.AppField
                                            name={`variantOptions[${variantOptionIndex}].name`}
                                            key={`variantOption-${variantOption.name}-${variantOptionIndex}`}
                                          >
                                            {(field) => (
                                              <FieldGroup>
                                                <field.TextInput
                                                  label={t(
                                                    "form.variants.options.optionName",
                                                  )}
                                                  srOnlyLabel
                                                  rightToField={
                                                    <Button
                                                      type="button"
                                                      variant="secondary"
                                                      size="icon"
                                                      onClick={() =>
                                                        variantOptionsField.removeValue(
                                                          variantOptionIndex,
                                                        )
                                                      }
                                                      aria-label={t(
                                                        "form.variants.options.remove",
                                                      )}
                                                    >
                                                      <Icons.trash className="h-4 w-4" />
                                                    </Button>
                                                  }
                                                />
                                                <form.AppField
                                                  name={`variantOptions[${variantOptionIndex}].values`}
                                                  mode="array"
                                                >
                                                  {(
                                                    variantOptionsValuesField,
                                                  ) => (
                                                    <variantOptionsValuesField.ArrayInput
                                                      label={t(
                                                        "form.variants.options.values",
                                                      )}
                                                      srOnlyLabel
                                                    >
                                                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                                        {(
                                                          variantOptionsValuesField
                                                            .state.value ?? []
                                                        ).map(
                                                          (
                                                            _value,
                                                            valueIndex,
                                                          ) => (
                                                            <form.AppField
                                                              name={`variantOptions[${variantOptionIndex}].values[${valueIndex}].value`}
                                                              key={`variantOption-${variantOption.name}-${valueIndex}`}
                                                            >
                                                              {(field) => (
                                                                <field.PillInput
                                                                  label={t(
                                                                    "form.variants.options.value",
                                                                  )}
                                                                  onDelete={() =>
                                                                    variantOptionsValuesField.removeValue(
                                                                      valueIndex,
                                                                    )
                                                                  }
                                                                />
                                                              )}
                                                            </form.AppField>
                                                          ),
                                                        )}
                                                        <Button
                                                          type="button"
                                                          className="rounded-full"
                                                          variant={"outline"}
                                                          aria-label={t(
                                                            "form.variants.options.addValue",
                                                          )}
                                                          onClick={() => {
                                                            if (
                                                              variantOptionsValuesField.state.value?.some(
                                                                (value) =>
                                                                  value.value ===
                                                                  "",
                                                              )
                                                            ) {
                                                              return;
                                                            }
                                                            variantOptionsValuesField.pushValue(
                                                              { value: "" },
                                                            );
                                                          }}
                                                        >
                                                          <Icons.plus />
                                                        </Button>
                                                      </div>
                                                    </variantOptionsValuesField.ArrayInput>
                                                  )}
                                                </form.AppField>
                                                <FieldSeparator />
                                              </FieldGroup>
                                            )}
                                          </form.AppField>
                                        ),
                                      )}
                                    </variantOptionsField.ArrayInput>
                                  )}
                                </form.AppField>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={handleAddNewVariantOption}
                                  aria-label={t(
                                    "form.variants.options.addAnother",
                                  )}
                                >
                                  <Icons.plus />
                                </Button>
                              </CardFooter>
                            </Card>
                          </FieldSet>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </form.Subscribe>
                  <form.Subscribe>
                    {(formState) => (
                      <form.AppField name="published">
                        {(field) => (
                          <div className="flex w-full items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex-1"
                              disabled={
                                formState.isSubmitting || !formState.canSubmit
                              }
                              onClick={() => {
                                field.handleChange(false);
                                form.handleSubmit();
                              }}
                            >
                              {t("form.saveDraft")}
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1"
                              disabled={
                                formState.isSubmitting || !formState.canSubmit
                              }
                              onClick={() => field.handleChange(true)}
                            >
                              {t("form.savePublish")}
                            </Button>
                          </div>
                        )}
                      </form.AppField>
                    )}
                  </form.Subscribe>
                </form.AppForm>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </Form>
        <CategoryDrawer
          onCategoryCreated={handleCategoryCreated}
          open={isCategoryDrawerOpen}
          onOpenChange={setIsCategoryDrawerOpen}
        />
      </>
    );
  },
);

ProductForm.displayName = "ProductForm";
