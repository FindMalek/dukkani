import type React from "react";

export const appConstants = {
  /** Storefront header height in px (matches StoreHeader). Used for spacer and sticky offsets. */
  STORE_HEADER_HEIGHT: "49px" satisfies React.CSSProperties["height"],
} as const;
