"use client";

import { NuqsAdapter } from "nuqs/adapters/next";

interface NuqsProviderProps {
  children: React.ReactNode;
}

export default function NuqsProvider({ children }: NuqsProviderProps) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
