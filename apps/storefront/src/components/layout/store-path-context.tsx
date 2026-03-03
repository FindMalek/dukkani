"use client";

import { createContext, useContext } from "react";

const StorePathContext = createContext<string>("");

export function StorePathProvider({
	children,
	pathPrefix,
}: {
	children: React.ReactNode;
	pathPrefix: string;
}) {
	return (
		<StorePathContext.Provider value={pathPrefix}>
			{children}
		</StorePathContext.Provider>
	);
}

export function useStorePathPrefix(): string {
	return useContext(StorePathContext);
}
