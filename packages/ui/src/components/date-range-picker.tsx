"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Field, FieldLabel } from "./field";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DateRangeValue {
	from: Date | null;
	to: Date | null;
}

interface DateRangePickerProps {
	value: DateRangeValue;
	onChange: (range: DateRangeValue) => void;
	placeholder?: string;
	label?: string;
	className?: string;
	/** Use 1 month in narrow contexts (e.g. drawer) */
	numberOfMonths?: 1 | 2;
	id?: string;
}

function toDateRange(value: DateRangeValue): DateRange | undefined {
	if (!value.from && !value.to) return undefined;
	return {
		from: value.from ?? undefined,
		to: value.to ?? undefined,
	};
}

function fromDateRange(range: DateRange | undefined): DateRangeValue {
	if (!range) return { from: null, to: null };
	return {
		from: range.from ?? null,
		to: range.to ?? null,
	};
}

export function DateRangePicker({
	value,
	onChange,
	placeholder = "Pick a date range",
	label,
	className,
	numberOfMonths = 2,
	id,
}: DateRangePickerProps) {
	const [open, setOpen] = React.useState(false);
	const dateRange = toDateRange(value);

	const handleSelect = React.useCallback(
		(range: DateRange | undefined) => {
			onChange(fromDateRange(range));
		},
		[onChange],
	);

	const displayText = React.useMemo(() => {
		if (value.from) {
			if (value.to) {
				return `${format(value.from, "LLL dd, y")} - ${format(value.to, "LLL dd, y")}`;
			}
			return format(value.from, "LLL dd, y");
		}
		return null;
	}, [value.from, value.to]);

	return (
		<Field className={cn("w-full", className)}>
			{label && (
				<FieldLabel htmlFor={id} className="mb-2 block">
					{label}
				</FieldLabel>
			)}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id={id}
						variant="outline"
						data-empty={!displayText}
						className={cn(
							"w-full justify-start px-2.5 text-left font-normal data-[empty=true]:text-muted-foreground",
						)}
					>
						<CalendarIcon className="me-2 size-4" />
						{displayText ?? <span>{placeholder}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="range"
						defaultMonth={value.from ?? value.to ?? new Date()}
						selected={dateRange}
						onSelect={handleSelect}
						numberOfMonths={numberOfMonths}
					/>
				</PopoverContent>
			</Popover>
		</Field>
	);
}
