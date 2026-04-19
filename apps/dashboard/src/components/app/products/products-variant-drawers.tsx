"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { useTranslations } from "next-intl";
import type { ProductFormVariantsField } from "@/hooks/use-product-form-variants-field";
import type { ProductFormApi } from "@/shared/lib/product/form";
import { getVariantLabel } from "@/shared/lib/product/variants-form.util";
import { ImagePickerGrid } from "./products-variant-image-picker-grid";

type ProductsVariantDrawersProps = {
  form: ProductFormApi;
  v: ProductFormVariantsField;
};

export function ProductsVariantDrawers({
  form,
  v,
}: ProductsVariantDrawersProps) {
  const t = useTranslations("products.create");
  const imagePickerIdx = v.imagePickerVariantIdx;
  const editSheetIdx = v.editSheetVariantIdx;

  return (
    <>
      <Drawer
        open={imagePickerIdx !== null}
        onOpenChange={(open) => {
          if (!open) v.setImagePickerVariantIdx(null);
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("form.variants.imagePicker.title")}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            {imagePickerIdx !== null && (
              <form.Subscribe
                selector={(s) => ({
                  images: s.values.images ?? [],
                  imageRef: s.values.variants?.[imagePickerIdx]?.imageRef,
                })}
              >
                {({ images, imageRef }) => (
                  <ImagePickerGrid
                    images={images}
                    selectedRef={imageRef}
                    onSelect={(ref) => {
                      form.setFieldValue(
                        `variants[${imagePickerIdx}].imageRef`,
                        ref,
                      );
                      v.setImagePickerVariantIdx(null);
                    }}
                  />
                )}
              </form.Subscribe>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={editSheetIdx !== null}
        onOpenChange={(open) => {
          if (!open) v.setEditSheetVariantIdx(null);
        }}
      >
        <DrawerContent>
          {editSheetIdx !== null && (
            <>
              <DrawerHeader>
                <form.Subscribe
                  selector={(s) =>
                    s.values.variants?.[editSheetIdx]?.selections ?? {}
                  }
                >
                  {(selections) => (
                    <DrawerTitle>
                      {t("form.variants.editSheet.title", {
                        label: getVariantLabel(selections),
                      })}
                    </DrawerTitle>
                  )}
                </form.Subscribe>
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4 pb-8">
                <div className="grid grid-cols-2 gap-4">
                  <form.AppField name={`variants[${editSheetIdx}].price`}>
                    {(field) => (
                      <field.TextInput
                        label={t("form.price.label")}
                        inputMode="decimal"
                        placeholder={t("form.variants.matrix.pricePlaceholder")}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name={`variants[${editSheetIdx}].stock`}>
                    {(field) => (
                      <field.TextInput
                        label={t("form.stock.label")}
                        inputMode="numeric"
                      />
                    )}
                  </form.AppField>
                </div>
                <form.AppField name={`variants[${editSheetIdx}].sku`}>
                  {(field) => (
                    <field.TextInput
                      label={t("form.variants.edit.sku")}
                      placeholder={t("form.variants.edit.skuPlaceholder")}
                    />
                  )}
                </form.AppField>

                <div>
                  <p className="mb-3 font-medium text-sm">
                    {t("form.variants.editSheet.image")}
                  </p>
                  <form.Subscribe
                    selector={(s) => ({
                      images: s.values.images ?? [],
                      imageRef: s.values.variants?.[editSheetIdx]?.imageRef,
                    })}
                  >
                    {({ images, imageRef }) => (
                      <ImagePickerGrid
                        images={images}
                        selectedRef={imageRef}
                        onSelect={(ref) => {
                          form.setFieldValue(
                            `variants[${editSheetIdx}].imageRef`,
                            ref,
                          );
                        }}
                      />
                    )}
                  </form.Subscribe>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
