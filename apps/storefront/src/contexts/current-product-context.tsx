"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { createContext, useContext } from "react";

interface CurrentProductContextValue {
	product: ProductPublicOutput | null;
}

const CurrentProductContext = createContext<CurrentProductContextValue | null>(
	null,
);

interface CurrentProductProviderProps {
	product: ProductPublicOutput;
	children: React.ReactNode;
}

export function CurrentProductProvider({
	product,
	children,
}: CurrentProductProviderProps) {
	return (
		<CurrentProductContext.Provider value={{ product }}>
			{children}
		</CurrentProductContext.Provider>
	);
}

/**
 * Returns the current product from context. Only use within the product detail page subtree
 * (inside CurrentProductProvider). Returns null if used outside provider.
 */
export function useCurrentProduct(): ProductPublicOutput | null {
	const ctx = useContext(CurrentProductContext);
	return ctx?.product ?? null;
}

//TODO : why is this even needed, and i think we might want it to put it in the layout folder instead and call it a provider
