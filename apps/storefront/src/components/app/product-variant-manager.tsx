"use client";

import type { store } from "@dukkani/common/schemas";
import type { ProductAddonGroupPublic } from "@dukkani/common/schemas/product-addon/output";
import type {
  VariantOptionOutput,
  VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Label } from "@dukkani/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { VariantSelector } from "@/components/shared/variant-selector";
import { useProductVariantSelection } from "@/shared/lib/product/variant-selector.hook";
import { useCartStore } from "@/shared/lib/cart/store";
import { AddToCartFooter } from "./add-to-cart-footer";

function isSingleSelection(
  t: ProductAddonGroupPublic["selectionType"],
): boolean {
  return String(t) === "SINGLE";
}

interface ProductVariantManagerProps {
  productId: string;
  storeCurrency: store.SupportedCurrencyInfer;
  productStock: number;
  productPrice: number;
  hasVariants: boolean;
  variantOptions?: VariantOptionOutput[];
  variants?: VariantOutput[];
  addonGroups?: ProductAddonGroupPublic[];
  variant?: "fixed" | "inline";
  onAddToCart?: () => void;
}

export function ProductVariantManager({
  productId,
  storeCurrency,
  productStock,
  productPrice,
  hasVariants,
  variantOptions,
  variants,
  addonGroups = [],
  variant = "fixed",
  onAddToCart,
}: ProductVariantManagerProps) {
  const t = useTranslations("storefront.store.product.addons");
  const { selectedVariantId, setSelectedVariantId, stock, price } =
    useProductVariantSelection({
      hasVariants,
      variants,
      productStock,
      productPrice,
    });

  const [addonChoiceByGroup, setAddonChoiceByGroup] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    setAddonChoiceByGroup({});
  }, [selectedVariantId, productId]);

  const toggleAddon = useCallback(
    (group: ProductAddonGroupPublic, optionId: string) => {
      setAddonChoiceByGroup((prev) => {
        const cur = prev[group.id] ?? [];
        if (isSingleSelection(group.selectionType)) {
          const next = cur[0] === optionId ? [] : [optionId];
          return { ...prev, [group.id]: next };
        }
        const has = cur.includes(optionId);
        const next = has
          ? cur.filter((id) => id !== optionId)
          : [...cur, optionId];
        return { ...prev, [group.id]: next };
      });
    },
    [],
  );

  const setSingleAddon = useCallback((groupId: string, optionId: string) => {
    setAddonChoiceByGroup((prev) => ({
      ...prev,
      [groupId]: optionId ? [optionId] : [],
    }));
  }, []);

  const addonSelections = useMemo(() => {
    const out: Array<{ addonOptionId: string; quantity: number }> = [];
    for (const g of addonGroups) {
      for (const id of addonChoiceByGroup[g.id] ?? []) {
        out.push({ addonOptionId: id, quantity: 1 });
      }
    }
    return out;
  }, [addonGroups, addonChoiceByGroup]);

  const addonPriceDelta = useMemo(() => {
    let sum = 0;
    for (const g of addonGroups) {
      for (const id of addonChoiceByGroup[g.id] ?? []) {
        const opt = g.options.find((o) => o.id === id);
        if (opt) sum += opt.priceDelta;
      }
    }
    return sum;
  }, [addonGroups, addonChoiceByGroup]);

  const displayPrice = price + addonPriceDelta;

  const addItem = useCartStore((state) => state.addItem);

  const handleFooterAdd = useCallback(
    ({ quantity }: { quantity: number }): boolean | void => {
      for (const g of addonGroups) {
        if (g.required && (addonChoiceByGroup[g.id]?.length ?? 0) === 0) {
          toast.error(t("requiredGroup", { name: g.name }));
          return false;
        }
      }
      addItem(
        productId,
        quantity,
        selectedVariantId,
        addonSelections.length ? addonSelections : undefined,
      );
      onAddToCart?.();
    },
    [
      addonChoiceByGroup,
      addonGroups,
      addonSelections,
      addItem,
      onAddToCart,
      productId,
      selectedVariantId,
      t,
    ],
  );

  return (
    <>
      <VariantSelector
        variantOptions={variantOptions}
        variants={variants}
        selectedVariantId={selectedVariantId}
        onVariantSelect={setSelectedVariantId}
      />

      {addonGroups.length > 0 && (
        <div className="space-y-4 border-border border-t pt-4">
          <p className="font-medium text-foreground text-sm">{t("title")}</p>
          {addonGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium text-foreground text-sm">
                  {group.name}
                </span>
                {group.required && (
                  <span className="text-destructive text-xs">
                    {t("required")}
                  </span>
                )}
              </div>
              {isSingleSelection(group.selectionType) ? (
                <RadioGroup
                  value={addonChoiceByGroup[group.id]?.[0] ?? ""}
                  onValueChange={(v) => setSingleAddon(group.id, v)}
                  className="gap-2"
                >
                  {group.options.map((opt) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <RadioGroupItem value={opt.id} id={`addon-${opt.id}`} />
                      <Label
                        htmlFor={`addon-${opt.id}`}
                        className="font-normal text-sm"
                      >
                        {opt.name}
                        {opt.priceDelta > 0 ? ` (+${opt.priceDelta})` : null}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {group.options.map((opt) => {
                    const checked = (
                      addonChoiceByGroup[group.id] ?? []
                    ).includes(opt.id);
                    return (
                      <div key={opt.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`addon-cb-${opt.id}`}
                          checked={checked}
                          onCheckedChange={() => toggleAddon(group, opt.id)}
                        />
                        <Label
                          htmlFor={`addon-cb-${opt.id}`}
                          className="font-normal text-sm"
                        >
                          {opt.name}
                          {opt.priceDelta > 0 ? ` (+${opt.priceDelta})` : null}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <AddToCartFooter
        productId={productId}
        stock={stock}
        price={displayPrice}
        selectedVariantId={selectedVariantId}
        variant={variant}
        onAddToCart={handleFooterAdd}
        currency={storeCurrency}
      />
    </>
  );
}
