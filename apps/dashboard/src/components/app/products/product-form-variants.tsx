"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import {
  countVariantCombinations,
  MAX_VARIANT_COMBINATIONS,
  reconcileVariants,
  selectionKey,
} from "@dukkani/common/utils";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@dukkani/ui/components/drawer";
import { FieldSet } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { productFormOptions } from "@/shared/lib/product/form";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PendingRemoval =
  | {
      type: "value";
      optionIdx: number;
      valueIdx: number;
      affectedCount: number;
    }
  | {
      type: "option";
      optionIdx: number;
      affectedCount: number;
    };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toFormRow(
  row: ReturnType<typeof reconcileVariants>[number],
): ProductFormInput["variants"][number] {
  return {
    selections: row.selections,
    sku: row.sku,
    price: row.price !== undefined ? String(row.price) : undefined,
    stock: String(row.stock),
    imageRef: row.imageRef,
  };
}

function coerceVariantRows(
  rows: ProductFormInput["variants"],
): Parameters<typeof reconcileVariants>[0] {
  return rows.map((r) => ({
    selections: r.selections,
    sku: r.sku,
    price: (() => {
      const p = r.price;
      if (p === undefined || p === null || p === "") return undefined;
      const n = Number(p);
      return Number.isFinite(n) && n > 0 ? n : undefined;
    })(),
    stock: (() => {
      const n = Number.parseInt(String(r.stock), 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    })(),
    imageRef: r.imageRef,
  }));
}

/** Only reconcile against option values that are non-empty (avoid ghost combinations). */
function sanitizeOptsForReconcile(
  opts: ProductFormInput["variantOptions"],
): ProductFormInput["variantOptions"] {
  return opts
    .filter((o) => o.name.trim() && o.values.some((v) => v.value.trim()))
    .map((o) => ({
      name: o.name.trim(),
      values: o.values
        .filter((v) => v.value.trim())
        .map((v) => ({ value: v.value.trim() })),
    }));
}

function getVariantLabel(selections: Record<string, string>): string {
  return Object.values(selections).join(" / ") || "—";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PendingRemovalBanner({
  pending,
  onConfirm,
  onUndo,
}: {
  pending: PendingRemoval;
  onConfirm: () => void;
  onUndo: () => void;
}) {
  const t = useTranslations("products.create");
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
      <Icons.alertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-amber-900 text-sm dark:text-amber-200">
          {t("form.variants.pendingRemoval.title", {
            count: pending.affectedCount,
          })}
        </p>
        <p className="mt-0.5 text-amber-700 text-xs dark:text-amber-400">
          {t("form.variants.pendingRemoval.description")}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onUndo}
          className="text-amber-700 text-xs underline dark:text-amber-400"
        >
          {t("form.variants.pendingRemoval.undo")}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-amber-600 px-3 py-1 font-medium text-white text-xs"
        >
          {t("form.variants.pendingRemoval.confirm")}
        </button>
      </div>
    </div>
  );
}

function ImagePickerGrid({
  images,
  selectedRef,
  onSelect,
}: {
  images: ProductFormInput["images"];
  selectedRef: string | undefined;
  onSelect: (ref: string | undefined) => void;
}) {
  const t = useTranslations("products.create");
  return (
    <div className="grid grid-cols-4 gap-2">
      <button
        type="button"
        onClick={() => onSelect(undefined)}
        className={cn(
          "flex aspect-square items-center justify-center rounded-lg border-2 bg-muted",
          !selectedRef ? "border-primary" : "border-border",
        )}
      >
        <Icons.imageOff className="h-5 w-5 text-muted-foreground" />
        <span className="sr-only">
          {t("form.variants.imagePicker.noImage")}
        </span>
      </button>
      {images.map((img) => {
        const ref = img.kind === "remote" ? img.url : img.clientId;
        const src =
          img.kind === "remote" ? img.url : URL.createObjectURL(img.file);
        const isSelected = selectedRef === ref;
        return (
          <button
            key={ref}
            type="button"
            onClick={() => onSelect(ref)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2",
              isSelected ? "border-primary" : "border-border",
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Icons.check className="h-5 w-5 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function VariantThumbnail({
  imageRef,
  images,
  onClick,
}: {
  imageRef: string | undefined;
  images: ProductFormInput["images"];
  onClick: () => void;
}) {
  const img = imageRef
    ? images.find((i) =>
        i.kind === "remote" ? i.url === imageRef : i.clientId === imageRef,
      )
    : undefined;

  const src = img
    ? img.kind === "remote"
      ? img.url
      : URL.createObjectURL(img.file)
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted"
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <Icons.image className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const ProductFormVariants = withForm({
  ...productFormOptions,
  props: {},
  render: function Render({ form }) {
    const t = useTranslations("products.create");
    const formatPrice = useFormatPriceForActiveStore();

    const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(
      null,
    );
    const [imagePickerVariantIdx, setImagePickerVariantIdx] = useState<
      number | null
    >(null);
    const [editSheetVariantIdx, setEditSheetVariantIdx] = useState<
      number | null
    >(null);

    // ------------------------------------------------------------------
    // Reconciliation
    // ------------------------------------------------------------------

    const doReconcile = useCallback(
      (newOpts: ProductFormInput["variantOptions"]) => {
        const sanitized = sanitizeOptsForReconcile(newOpts);
        if (sanitized.length === 0) {
          form.setFieldValue("variants", []);
          return;
        }
        const current = coerceVariantRows(form.getFieldValue("variants") ?? []);
        const stock = Math.max(
          0,
          Number.parseInt(String(form.getFieldValue("stock")), 10) || 0,
        );
        const next = reconcileVariants(current, sanitized, { stock });
        form.setFieldValue("variants", next.map(toFormRow));
      },
      [form],
    );

    // ------------------------------------------------------------------
    // Option / value handlers
    // ------------------------------------------------------------------

    const handleAddOption = useCallback(() => {
      const opts = form.getFieldValue("variantOptions") ?? [];
      if (opts.some((o) => o.name === "")) return;
      if (opts.length >= 3) return;
      const newOpts = [...opts, { name: "", values: [] }];
      form.setFieldValue("variantOptions", newOpts);
    }, [form]);

    const handleAddValue = useCallback(
      (optionIdx: number) => {
        const opts = form.getFieldValue("variantOptions") ?? [];
        const values = opts[optionIdx]?.values ?? [];
        if (values.some((v) => v.value === "")) return;
        const newValues = [...values, { value: "" }];
        const newOpts = opts.map((o, i) =>
          i === optionIdx ? { ...o, values: newValues } : o,
        );
        form.setFieldValue("variantOptions", newOpts);
        doReconcile(newOpts);
      },
      [form, doReconcile],
    );

    const handleRemoveValue = useCallback(
      (optionIdx: number, valueIdx: number) => {
        const opts = form.getFieldValue("variantOptions") ?? [];
        const variants = form.getFieldValue("variants") ?? [];
        const optionName = opts[optionIdx]?.name ?? "";
        const valueBeingRemoved = opts[optionIdx]?.values?.[valueIdx]?.value;

        const affected = variants.filter(
          (v) => v.selections[optionName] === valueBeingRemoved,
        );
        const hasData = affected.some(
          (v) =>
            (v.price !== undefined && v.price !== "") ||
            (v.sku !== undefined && v.sku !== "") ||
            Number.parseInt(String(v.stock), 10) > 0,
        );

        if (affected.length > 0 && hasData) {
          setPendingRemoval({
            type: "value",
            optionIdx,
            valueIdx,
            affectedCount: affected.length,
          });
          return;
        }

        const newValues = (opts[optionIdx]?.values ?? []).filter(
          (_, i) => i !== valueIdx,
        );
        const newOpts = opts.map((o, i) =>
          i === optionIdx ? { ...o, values: newValues } : o,
        );
        form.setFieldValue("variantOptions", newOpts);
        doReconcile(newOpts);
      },
      [form, doReconcile],
    );

    const handleRemoveOption = useCallback(
      (optionIdx: number) => {
        const opts = form.getFieldValue("variantOptions") ?? [];
        const variants = form.getFieldValue("variants") ?? [];
        const optionName = opts[optionIdx]?.name ?? "";

        const affected = variants.filter((v) => optionName in v.selections);
        const hasData = affected.some(
          (v) =>
            (v.price !== undefined && v.price !== "") ||
            (v.sku !== undefined && v.sku !== "") ||
            Number.parseInt(String(v.stock), 10) > 0,
        );

        if (affected.length > 0 && hasData) {
          setPendingRemoval({
            type: "option",
            optionIdx,
            affectedCount: affected.length,
          });
          return;
        }

        const newOpts = opts.filter((_, i) => i !== optionIdx);
        form.setFieldValue("variantOptions", newOpts);
        if (newOpts.length === 0) {
          form.setFieldValue("variants", []);
        } else {
          doReconcile(newOpts);
        }
      },
      [form, doReconcile],
    );

    const handleConfirmPendingRemoval = useCallback(() => {
      if (!pendingRemoval) return;
      const opts = form.getFieldValue("variantOptions") ?? [];

      if (pendingRemoval.type === "value") {
        const { optionIdx, valueIdx } = pendingRemoval;
        const newValues = (opts[optionIdx]?.values ?? []).filter(
          (_, i) => i !== valueIdx,
        );
        const newOpts = opts.map((o, i) =>
          i === optionIdx ? { ...o, values: newValues } : o,
        );
        form.setFieldValue("variantOptions", newOpts);
        doReconcile(newOpts);
      } else {
        const { optionIdx } = pendingRemoval;
        const newOpts = opts.filter((_, i) => i !== optionIdx);
        form.setFieldValue("variantOptions", newOpts);
        if (newOpts.length === 0) {
          form.setFieldValue("variants", []);
        } else {
          doReconcile(newOpts);
        }
      }

      setPendingRemoval(null);
    }, [pendingRemoval, form, doReconcile]);

    const handleUndoPendingRemoval = useCallback(() => {
      setPendingRemoval(null);
    }, []);

    // ------------------------------------------------------------------
    // Derived state
    // ------------------------------------------------------------------

    const comboCount = useMemo(
      () => countVariantCombinations(form.state.values.variantOptions ?? []),
      [form.state.values.variantOptions],
    );

    const optionOrderLabel = useMemo(() => {
      const names = (form.state.values.variantOptions ?? [])
        .map((o) => o.name.trim())
        .filter(Boolean);
      if (names.length === 0) return "";
      const [first, ...rest] = names;
      return rest.length > 0 ? `${first}, then ${rest.join(", then ")}` : first;
    }, [form.state.values.variantOptions]);

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------

    return (
      <>
        <form.AppField
          name="hasVariants"
          listeners={{
            onChange: ({ value }) => {
              if (value) {
                form.setFieldValue("variantOptions", [
                  { name: "", values: [] },
                ]);
                form.setFieldValue("variants", []);
              } else {
                form.setFieldValue("variantOptions", []);
                form.setFieldValue("variants", []);
                setPendingRemoval(null);
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

        <form.Subscribe selector={(s) => s.values.hasVariants}>
          {(hasVariants) => (
            <Collapsible open={hasVariants}>
              <CollapsibleContent>
                <FieldSet className="mx-6 gap-4">
                  {/* ── Pending removal warning banner ── */}
                  {pendingRemoval && (
                    <PendingRemovalBanner
                      pending={pendingRemoval}
                      onConfirm={handleConfirmPendingRemoval}
                      onUndo={handleUndoPendingRemoval}
                    />
                  )}

                  {/* ── Option cards ── */}
                  <form.Subscribe
                    selector={(s) => s.values.variantOptions ?? []}
                  >
                    {(variantOptions) => (
                      <div className="flex flex-col gap-3">
                        {variantOptions.map((opt, optIdx) => (
                          <div
                            key={`opt-${optIdx}`}
                            className="rounded-xl border bg-card p-4"
                          >
                            {/* Option name row */}
                            <div className="mb-3 flex items-center justify-between">
                              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                                {t("form.variants.options.optionName")}
                              </p>
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(optIdx)}
                                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                                aria-label={t("form.variants.options.remove")}
                              >
                                <Icons.trash className="h-4 w-4" />
                              </button>
                            </div>

                            <form.AppField
                              name={`variantOptions[${optIdx}].name`}
                            >
                              {(field) => (
                                <field.TextInput
                                  label={t("form.variants.options.optionName")}
                                  srOnlyLabel
                                  placeholder={t(
                                    "form.variants.options.optionNamePlaceholder",
                                  )}
                                  onBlur={() => {
                                    // Trigger reconcile when name is committed
                                    const opts =
                                      form.getFieldValue("variantOptions") ??
                                      [];
                                    doReconcile(opts);
                                  }}
                                />
                              )}
                            </form.AppField>

                            {/* Value chips */}
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {opt.values.map((val, valIdx) => (
                                <form.AppField
                                  key={`opt-${optIdx}-val-${valIdx}`}
                                  name={`variantOptions[${optIdx}].values[${valIdx}].value`}
                                >
                                  {(field) => (
                                    <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 dark:bg-emerald-900/40">
                                      <input
                                        value={field.state.value ?? ""}
                                        onChange={(e) => {
                                          field.handleChange(e.target.value);
                                        }}
                                        onBlur={() => {
                                          field.handleBlur();
                                          const opts =
                                            form.getFieldValue(
                                              "variantOptions",
                                            ) ?? [];
                                          doReconcile(opts);
                                        }}
                                        className="w-14 min-w-0 bg-transparent text-emerald-900 text-sm focus:outline-none dark:text-emerald-100"
                                        placeholder={t(
                                          "form.variants.options.value",
                                        )}
                                        aria-label={t(
                                          "form.variants.options.value",
                                        )}
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveValue(optIdx, valIdx)
                                        }
                                        className="ml-0.5 text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-400"
                                        aria-label={"Remove value"}
                                      >
                                        <Icons.x className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </form.AppField>
                              ))}

                              <button
                                type="button"
                                onClick={() => handleAddValue(optIdx)}
                                className="flex items-center gap-1 rounded-full border border-muted-foreground/40 border-dashed px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-foreground hover:text-foreground"
                              >
                                <Icons.plus className="h-3 w-3" />
                                {t("form.variants.options.addValue")}
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add another option */}
                        <button
                          type="button"
                          onClick={handleAddOption}
                          disabled={variantOptions.length >= 3}
                          className="flex items-center gap-2 py-1 text-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Icons.plusCircle className="h-4 w-4" />
                          {t("form.variants.options.addAnother")}
                          {variantOptions.length >= 3 && (
                            <span className="text-muted-foreground text-xs">
                              — {t("form.variants.options.maxOptions")}
                            </span>
                          )}
                        </button>

                        {comboCount > MAX_VARIANT_COMBINATIONS && (
                          <p className="text-destructive text-xs">
                            {t("form.variants.matrix.tooMany", {
                              max: MAX_VARIANT_COMBINATIONS,
                            })}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Subscribe>

                  {/* ── Variant list ── */}
                  <form.Subscribe
                    selector={(s) => ({
                      variants: s.values.variants ?? [],
                      images: s.values.images ?? [],
                      options: s.values.variantOptions ?? [],
                    })}
                  >
                    {({ variants, images, options }) =>
                      variants.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {/* Option order pill + count badge */}
                          <div className="flex items-center justify-between px-0.5">
                            {optionOrderLabel ? (
                              <p className="text-muted-foreground text-xs">
                                <span className="font-medium text-foreground">
                                  {t("form.variants.optionOrder.label")}:
                                </span>{" "}
                                {optionOrderLabel}
                              </p>
                            ) : null}
                            <Badge variant="secondary" className="ml-auto">
                              {t("form.variants.matrix.variantCount", {
                                count: variants.length,
                              })}
                            </Badge>
                          </div>

                          {/* Variant rows */}
                          {variants.map((variant, idx) => {
                            const label = getVariantLabel(
                              variant.selections ?? {},
                            );
                            const stock = Number.parseInt(
                              String(variant.stock),
                              10,
                            );
                            const inStock = stock > 0;
                            const priceNum = variant.price
                              ? Number.parseFloat(String(variant.price))
                              : undefined;

                            return (
                              <div
                                key={`${idx}-${selectionKey(variant.selections ?? {})}`}
                                className="flex items-center gap-3 rounded-xl border bg-card p-3"
                              >
                                {/* Image thumbnail */}
                                <VariantThumbnail
                                  imageRef={variant.imageRef}
                                  images={images}
                                  onClick={() => setImagePickerVariantIdx(idx)}
                                />

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-medium text-sm">
                                    {label}
                                  </p>
                                  <div className="mt-0.5 flex items-center gap-2">
                                    <span
                                      className={cn(
                                        "inline-block h-2 w-2 rounded-full",
                                        inStock
                                          ? "bg-emerald-500"
                                          : "bg-muted-foreground/40",
                                      )}
                                    />
                                    <span
                                      className={cn(
                                        "text-xs",
                                        inStock
                                          ? "text-emerald-600 dark:text-emerald-400"
                                          : "text-muted-foreground",
                                      )}
                                    >
                                      {inStock
                                        ? t("form.variants.matrix.inStock", {
                                            count: stock,
                                          })
                                        : t("form.variants.matrix.outOfStock")}
                                    </span>
                                    {variant.sku ? (
                                      <span className="text-muted-foreground text-xs">
                                        SKU {variant.sku}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>

                                {/* Price */}
                                {priceNum !== undefined ? (
                                  <p className="shrink-0 text-right text-sm">
                                    {formatPrice(priceNum)}
                                  </p>
                                ) : null}

                                {/* Edit chevron */}
                                <button
                                  type="button"
                                  onClick={() => setEditSheetVariantIdx(idx)}
                                  className="shrink-0 text-muted-foreground"
                                  aria-label={t("form.variants.list.edit")}
                                >
                                  <Icons.chevronRight className="h-4 w-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : null
                    }
                  </form.Subscribe>
                </FieldSet>
              </CollapsibleContent>
            </Collapsible>
          )}
        </form.Subscribe>

        {/* ── Image picker sheet ── */}
        <Drawer
          open={imagePickerVariantIdx !== null}
          onOpenChange={(open) => {
            if (!open) setImagePickerVariantIdx(null);
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("form.variants.imagePicker.title")}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-8">
              {imagePickerVariantIdx !== null && (
                <form.Subscribe
                  selector={(s) => ({
                    images: s.values.images ?? [],
                    imageRef:
                      s.values.variants?.[imagePickerVariantIdx]?.imageRef,
                  })}
                >
                  {({ images, imageRef }) => (
                    <ImagePickerGrid
                      images={images}
                      selectedRef={imageRef}
                      onSelect={(ref) => {
                        form.setFieldValue(
                          `variants[${imagePickerVariantIdx}].imageRef`,
                          ref,
                        );
                        setImagePickerVariantIdx(null);
                      }}
                    />
                  )}
                </form.Subscribe>
              )}
            </div>
          </DrawerContent>
        </Drawer>

        {/* ── Edit variant sheet ── */}
        <Drawer
          open={editSheetVariantIdx !== null}
          onOpenChange={(open) => {
            if (!open) setEditSheetVariantIdx(null);
          }}
        >
          <DrawerContent>
            {editSheetVariantIdx !== null && (
              <>
                <DrawerHeader>
                  <form.Subscribe
                    selector={(s) =>
                      s.values.variants?.[editSheetVariantIdx]?.selections ?? {}
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
                    <form.AppField
                      name={`variants[${editSheetVariantIdx}].price`}
                    >
                      {(field) => (
                        <field.TextInput
                          label={t("form.price.label")}
                          inputMode="decimal"
                          placeholder={t(
                            "form.variants.matrix.pricePlaceholder",
                          )}
                        />
                      )}
                    </form.AppField>
                    <form.AppField
                      name={`variants[${editSheetVariantIdx}].stock`}
                    >
                      {(field) => (
                        <field.TextInput
                          label={t("form.stock.label")}
                          inputMode="numeric"
                        />
                      )}
                    </form.AppField>
                  </div>
                  <form.AppField name={`variants[${editSheetVariantIdx}].sku`}>
                    {(field) => (
                      <field.TextInput
                        label={t("form.variants.edit.sku")}
                        placeholder={t("form.variants.edit.skuPlaceholder")}
                      />
                    )}
                  </form.AppField>

                  {/* Inline image picker */}
                  <div>
                    <p className="mb-3 font-medium text-sm">
                      {t("form.variants.editSheet.image")}
                    </p>
                    <form.Subscribe
                      selector={(s) => ({
                        images: s.values.images ?? [],
                        imageRef:
                          s.values.variants?.[editSheetVariantIdx]?.imageRef,
                      })}
                    >
                      {({ images, imageRef }) => (
                        <ImagePickerGrid
                          images={images}
                          selectedRef={imageRef}
                          onSelect={(ref) => {
                            form.setFieldValue(
                              `variants[${editSheetVariantIdx}].imageRef`,
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
  },
});

export function ProductFormVariantsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-full max-w-md" />
        </div>
        <Skeleton className="h-6 w-10 shrink-0 rounded-full" />
      </div>
    </div>
  );
}
