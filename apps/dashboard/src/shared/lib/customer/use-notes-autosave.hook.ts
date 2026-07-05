import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { handleAPIError } from "@/shared/api/error-handler";
import { appMutations } from "@/shared/api/mutations";

const AUTOSAVE_DELAY_MS = 600;
const SAVED_INDICATOR_MS = 2000;

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
  const [isSaved, setIsSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutation = useMutation(appMutations.customer.updateNotes());

  useEffect(() => {
    setValue(initialNotes ?? "");
  }, [initialNotes]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (savedIndicatorRef.current) clearTimeout(savedIndicatorRef.current);
    };
  }, []);

  const onChange = (next: string) => {
    setValue(next);
    setIsSaved(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      mutation.mutate(
        { id: customerId, notes: next || null },
        {
          onSuccess: () => {
            setIsSaved(true);
            if (savedIndicatorRef.current)
              clearTimeout(savedIndicatorRef.current);
            savedIndicatorRef.current = setTimeout(
              () => setIsSaved(false),
              SAVED_INDICATOR_MS,
            );
          },
          onError: (error) => handleAPIError(error),
        },
      );
    }, AUTOSAVE_DELAY_MS);
  };

  return { value, onChange, isSaving: mutation.isPending, isSaved };
}
