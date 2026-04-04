"use client";

import { useEffect, useRef, useState } from "react";

export type ObjectUrlPreviewItem = {
  id: string;
  file: File;
};

/**
 * Stable `blob:` URLs for local `File` previews. Creates/revokes object URLs by stable `id`.
 */
export function useObjectUrlPreviews(
  items: ObjectUrlPreviewItem[],
): Record<string, string> {
  const [previewById, setPreviewById] = useState<Record<string, string>>({});
  const previewsRef = useRef(previewById);
  previewsRef.current = previewById;

  useEffect(() => {
    const ids = new Set(items.map((item) => item.id));

    setPreviewById((prev) => {
      const next: Record<string, string> = {};
      for (const item of items) {
        next[item.id] = prev[item.id] ?? URL.createObjectURL(item.file);
      }
      for (const id of Object.keys(prev)) {
        if (!ids.has(id)) {
          URL.revokeObjectURL(prev[id]!);
        }
      }
      return next;
    });
  }, [items]);

  useEffect(
    () => () => {
      for (const url of Object.values(previewsRef.current)) {
        URL.revokeObjectURL(url);
      }
    },
    [],
  );

  return previewById;
}
