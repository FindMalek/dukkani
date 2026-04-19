"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import {
  countVariantCombinations,
  reconcileVariants,
} from "@dukkani/common/utils";
import { useCallback, useMemo, useState } from "react";
import { productVariantFormConstants } from "@/shared/config/constants";
import type { ProductFormApi } from "@/shared/lib/product/form";
import { useFormatPriceForActiveStore } from "@/shared/lib/store/format-price.hook";
import {
  coerceVariantRows,
  sanitizeOptsForReconcile,
  toFormRow,
} from "./variants-form.util";

export type PendingRemoval =
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

export function useProductFormVariantsField(form: ProductFormApi) {
  const formatPrice = useFormatPriceForActiveStore();

  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(
    null,
  );
  const [imagePickerVariantIdx, setImagePickerVariantIdx] = useState<
    number | null
  >(null);
  const [editSheetVariantIdx, setEditSheetVariantIdx] = useState<number | null>(
    null,
  );

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

  const handleAddOption = useCallback(() => {
    const opts = form.getFieldValue("variantOptions") ?? [];
    if (opts.some((o) => o.name === "")) return;
    if (opts.length >= productVariantFormConstants.MAX_OPTIONS) return;
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

  const hasVariantsListeners = useMemo(
    () => ({
      onChange: ({ value }: { value: boolean }) => {
        if (value) {
          form.setFieldValue("variantOptions", [{ name: "", values: [] }]);
          form.setFieldValue("variants", []);
        } else {
          form.setFieldValue("variantOptions", []);
          form.setFieldValue("variants", []);
          setPendingRemoval(null);
        }
      },
    }),
    [form],
  );

  return {
    pendingRemoval,
    hasVariantsListeners,
    doReconcile,
    handleAddOption,
    handleAddValue,
    handleRemoveValue,
    handleRemoveOption,
    handleConfirmPendingRemoval,
    handleUndoPendingRemoval,
    comboCount,
    optionOrderLabel,
    formatPrice,
    imagePickerVariantIdx,
    setImagePickerVariantIdx,
    editSheetVariantIdx,
    setEditSheetVariantIdx,
  };
}

export type ProductFormVariantsField = ReturnType<
  typeof useProductFormVariantsField
>;
