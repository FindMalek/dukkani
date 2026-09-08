"use client";

import { rankItem } from "@tanstack/match-sorter-utils";
import type * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Icons } from "../icons";
import {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
} from "../responsive-popover";
import { BaseField, type CommonFieldProps } from "./base-field";

export interface ComboboxOption {
  value: string;
  label: string;
  /** Extra text (e.g. an Arabic name, a postal code) folded into fuzzy matching but not shown as the label. */
  keywords?: string[];
}

interface ComboboxFieldProps extends CommonFieldProps {
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  /** Shown instead of the search list — use for a disabled "pick the parent level first" state. */
  disabledReason?: string;
  /**
   * Fired after the field's own value updates — for side effects only (e.g.
   * clearing a dependent cascading field). Not needed to persist the
   * selection itself; the field already owns that.
   */
  onValueChange?: (value: string | undefined) => void;
}

/**
 * A searchable single-select combobox form field: `ResponsivePopover`
 * (popover on desktop, bottom sheet on mobile) wrapping a `Command` list,
 * fuzzy-filtered client-side with `@tanstack/match-sorter-utils`.
 */
export function ComboboxField({
  label,
  description,
  labelFirst,
  orientation,
  rightToField,
  options,
  placeholder = "",
  searchPlaceholder,
  emptyMessage = "No results found.",
  disabled = false,
  disabledReason,
  onValueChange,
}: ComboboxFieldProps) {
  const field = useFieldContext<string | undefined>();
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((option) => option.value === field.state.value),
    [options, field.state.value],
  );

  const filter = useCallback((value: string, search: string) => {
    const item = options.find((option) => option.value === value);
    if (!item) return 0;
    const ranked = rankItem(
      [item.label, ...(item.keywords ?? [])].join(" "),
      search,
    );
    return ranked.passed ? Math.max(ranked.rank, 0.01) : 0;
  }, [options]);

  const handleSelect = useCallback(
    (value: string) => {
      const nextValue = value === field.state.value ? undefined : value;
      field.handleChange(nextValue);
      onValueChange?.(nextValue);
      setOpen(false);
    },
    [field, onValueChange],
  );

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <BaseField
      label={label}
      description={description}
      labelFirst={labelFirst}
      orientation={orientation}
      rightToField={rightToField}
    >
      <ResponsivePopover open={open && !disabled} onOpenChange={setOpen}>
        <ResponsivePopoverTrigger asChild>
          <Button
            id={field.name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid}
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              !selected && "text-muted-foreground",
            )}
          >
            <span className="truncate">
              {selected?.label ?? (disabled ? disabledReason : placeholder)}
            </span>
            <Icons.chevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </ResponsivePopoverTrigger>
        <ResponsivePopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <Command filter={filter}>
            <CommandInput placeholder={searchPlaceholder ?? placeholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    <Icons.check
                      className={cn(
                        "size-4",
                        option.value === field.state.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </ResponsivePopoverContent>
      </ResponsivePopover>
    </BaseField>
  );
}

export type { CommonFieldProps };
