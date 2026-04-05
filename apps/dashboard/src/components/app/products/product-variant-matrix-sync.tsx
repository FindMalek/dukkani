"use client";

import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import {
  type FormVariantRow,
  reconcileVariants,
  selectionKey,
  variantOptionsStructureFingerprint,
} from "@dukkani/common/utils";
import { useStore } from "@tanstack/react-form";
import { useEffect } from "react";
import type {
  ProductFormApi,
  ProductFormSnapshot,
} from "@/types/product-form.types";

function coerceVariantRowsForReconcile(
  rows: ProductFormInput["variants"],
): FormVariantRow[] {
  return rows.map((r) => ({
    selections: r.selections,
    sku: r.sku,
    price: (() => {
      const p = r.price;
      if (p === undefined || p === null || p === "") return undefined;
      if (typeof p === "number")
        return Number.isFinite(p) && p > 0 ? p : undefined;
      const n = Number(p);
      return Number.isFinite(n) && n > 0 ? n : undefined;
    })(),
    stock: (() => {
      if (typeof r.stock === "number")
        return Number.isFinite(r.stock) && r.stock >= 0 ? r.stock : 0;
      const n = Number.parseInt(String(r.stock), 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    })(),
  }));
}

function variantRowsToFormInput(
  rows: FormVariantRow[],
): ProductFormInput["variants"] {
  return rows.map((r) => ({
    selections: r.selections,
    sku: r.sku,
    price:
      r.price !== undefined && r.price !== null ? String(r.price) : undefined,
    stock: String(r.stock),
  }));
}

function variantRowsFingerprint(rows: FormVariantRow[]): string {
  return JSON.stringify(
    rows.map((r) => ({
      k: selectionKey(r.selections),
      sku: r.sku ?? "",
      price: r.price ?? null,
      stock: r.stock,
    })),
  );
}

export function ProductVariantMatrixSync({ form }: { form: ProductFormApi }) {
  const store = form.store as Parameters<typeof useStore>[0];
  const hasVariants = useStore(
    store,
    (s: ProductFormSnapshot) => s.values.hasVariants,
  );
  const variantOptions = useStore(
    store,
    (s: ProductFormSnapshot) => s.values.variantOptions,
  );
  const stock = useStore(store, (s: ProductFormSnapshot) => s.values.stock);

  const optionStructureFingerprint = variantOptionsStructureFingerprint(
    variantOptions ?? [],
  );

  useEffect(() => {
    if (!hasVariants) return;

    const defaults = {
      stock: (() => {
        const n = Number.parseInt(String(stock), 10);
        return Number.isFinite(n) && n >= 0 ? n : 0;
      })(),
    };

    const opts = form.getFieldValue("variantOptions") ?? [];
    const current = coerceVariantRowsForReconcile(
      form.getFieldValue("variants") ?? [],
    );
    const next = reconcileVariants(current, opts, defaults);

    if (variantRowsFingerprint(current) !== variantRowsFingerprint(next)) {
      form.setFieldValue("variants", variantRowsToFormInput(next));
    }
    void optionStructureFingerprint;
  }, [hasVariants, optionStructureFingerprint, stock, form]);

  return null;
}
