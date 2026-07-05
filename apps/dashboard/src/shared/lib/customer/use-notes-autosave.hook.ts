import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { appMutations } from "@/shared/api/mutations";

const AUTOSAVE_DELAY_MS = 600;

/**
 * Debounced autosave for the customer detail Notes field. Saves
 * AUTOSAVE_DELAY_MS after the last keystroke, not on blur, so merchants
 * don't need a separate save action.
 */
export function useNotesAutosave(
  customerId: string,
  initialNotes: string | null,
) {
  const [value, setValue] = useState(initialNotes ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutation = useMutation(appMutations.customer.updateNotes());

  useEffect(() => {
    setValue(initialNotes ?? "");
  }, [initialNotes]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onChange = (next: string) => {
    setValue(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      mutation.mutate({ id: customerId, notes: next || null });
    }, AUTOSAVE_DELAY_MS);
  };

  return { value, onChange, isSaving: mutation.isPending };
}
