"use client";

import { Input } from "@dukkani/ui/components/input";
import { cn } from "@dukkani/ui/lib/utils";
import { useState } from "react";

interface CountryCode {
	code: string;
	flag: string;
	dialCode: string;
}

const COUNTRIES: CountryCode[] = [
	{ code: "TN", flag: "🇹🇳", dialCode: "+216" },
	{ code: "DZ", flag: "🇩🇿", dialCode: "+213" },
	{ code: "MA", flag: "🇲🇦", dialCode: "+212" },
	{ code: "EG", flag: "🇪🇬", dialCode: "+20" },
	{ code: "FR", flag: "🇫🇷", dialCode: "+33" },
];

interface PhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	error?: boolean;
	disabled?: boolean;
}

export function PhoneInput({
	value,
	onChange,
	onBlur,
	error,
	disabled,
}: PhoneInputProps) {
	const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
		COUNTRIES[0],
	);
	const [isOpen, setIsOpen] = useState(false);

	// Parse current value to extract country code and number
	const currentDialCode = value.startsWith("+")
		? COUNTRIES.find((c) => value.startsWith(c.dialCode))?.dialCode ||
			selectedCountry.dialCode
		: selectedCountry.dialCode;

	const phoneNumber = value.startsWith("+")
		? value.replace(currentDialCode, "").trim()
		: value;

	const handleCountrySelect = (country: CountryCode) => {
		setSelectedCountry(country);
		// Update value with new country code
		const newValue = phoneNumber
			? `${country.dialCode}${phoneNumber}`
			: country.dialCode;
		onChange(newValue);
		setIsOpen(false);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const num = e.target.value.replace(/\D/g, ""); // Only digits
		const fullNumber = `${currentDialCode}${num}`;
		onChange(fullNumber);
	};

	const displayValue = phoneNumber || "";

	return (
		<div className="flex gap-2">
			{/* Country Code Selector */}
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					disabled={disabled}
					className={cn(
						"flex h-9 min-w-[80px] items-center justify-center gap-1.5 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive ring-destructive/20",
					)}
				>
					<span>{selectedCountry.flag}</span>
					<span>{selectedCountry.dialCode}</span>
				</button>

				{isOpen && (
					<>
						<div
							className="fixed inset-0 z-10"
							onClick={() => setIsOpen(false)}
						/>
						<div className="absolute top-full z-20 mt-1 max-h-48 w-48 overflow-auto rounded-md border bg-popover shadow-lg">
							{COUNTRIES.map((country) => (
								<button
									key={country.code}
									type="button"
									onClick={() => handleCountrySelect(country)}
									className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
								>
									<span>{country.flag}</span>
									<span>{country.dialCode}</span>
									<span className="text-muted-foreground text-xs">
										{country.code}
									</span>
								</button>
							))}
						</div>
					</>
				)}
			</div>

			{/* Phone Number Input */}
			<Input
				type="tel"
				value={displayValue}
				onChange={handlePhoneChange}
				onBlur={onBlur}
				placeholder="55 123 456"
				disabled={disabled}
				aria-invalid={error}
				className="flex-1"
			/>
		</div>
	);
}
