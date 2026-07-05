import { useState } from "react";

/**
 * Bulk-selection state for the Customers list. Kept as local component
 * state (not URL/zustand) since selection never needs to survive a
 * navigation or be shareable via link.
 */
export function useSelectionMode() {
  const [active, setActive] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const enter = (initialId?: string) => {
    setActive(true);
    if (initialId) {
      setSelectedIds(new Set([initialId]));
    }
  };

  const exit = () => {
    setActive(false);
    setSelectedIds(new Set());
  };

  return {
    active,
    selectedIds,
    count: selectedIds.size,
    toggle,
    enter,
    exit,
  };
}
