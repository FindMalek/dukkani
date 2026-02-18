"use client";

import {
	DirectionProvider as RadixDirectionProvider,
	useDirection,
} from "@radix-ui/react-direction";

interface DirectionProviderProps {
	children: React.ReactNode;
	direction?: "ltr" | "rtl";
}

export function DirectionProvider({
	children,
	direction = "ltr",
}: DirectionProviderProps) {
	return (
		<RadixDirectionProvider dir={direction}>{children}</RadixDirectionProvider>
	);
}

export { useDirection };

export function useIsRtl(): boolean {
	return useDirection() === "rtl";
}
