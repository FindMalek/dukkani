"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import type { Locale } from "@/lib/i18n";

// This will be populated by the server component
const cachedDict: Record<string, any> | null = null;

export function useDictionary(locale: Locale) {
	const params = useParams();
	const lang = (params?.lang as Locale) || locale;

	// In a real implementation, you'd fetch this from an API route
	// For now, we'll need to pass dict as props from server components
	return useMemo(() => {
		// This is a placeholder - actual implementation would fetch from API
		return cachedDict || {};
	}, [lang]);
}
