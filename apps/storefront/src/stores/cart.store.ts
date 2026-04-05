import { create } from "zustand";
import { persist } from "zustand/middleware";
import { areItemsEqual, normalizeAddonSelections } from "@/lib/cart-utils";

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  addonSelections?: Array<{ addonOptionId: string; quantity: number }>;
}

interface CartStoreState {
  // Store carts per store slug: { "store-slug": [items] }
  carts: Record<string, CartItem[]>;

  // Current store slug (set when user navigates to a store)
  currentStoreSlug: string | null;

  // Cart drawer state
  isCartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Actions
  setCurrentStore: (storeSlug: string) => void;
  addItem: (
    productId: string,
    quantity?: number,
    variantId?: string,
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>,
  ) => void;
  removeItem: (
    productId: string,
    variantId?: string,
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>,
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>,
  ) => void;
  clearCart: () => void;
  getItemQuantity: (
    productId: string,
    variantId?: string,
    addonSelections?: Array<{ addonOptionId: string; quantity?: number }>,
  ) => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      carts: {},
      currentStoreSlug: null,
      isCartDrawerOpen: false,

      setCurrentStore: (storeSlug: string) => {
        set({ currentStoreSlug: storeSlug });
      },

      setCartDrawerOpen: (open: boolean) => {
        set({ isCartDrawerOpen: open });
      },

      /**
       * Add item to cart or update quantity if item already exists
       */
      addItem: (productId, quantity, variantId, addonSelections) => {
        set((state) => {
          const storeSlug = state.currentStoreSlug;
          if (!storeSlug) {
            console.warn("No store selected. Cannot add item to cart.");
            return state;
          }

          const currentCart = state.carts[storeSlug] || [];
          const itemQuantity = quantity ?? 1;
          const normalizedAddons = addonSelections?.length
            ? normalizeAddonSelections(addonSelections)
            : undefined;
          const newItem: CartItem = {
            productId,
            variantId,
            quantity: itemQuantity,
            ...(normalizedAddons?.length
              ? { addonSelections: normalizedAddons }
              : {}),
          };

          const existingItemIndex = currentCart.findIndex((item) =>
            areItemsEqual(item, newItem),
          );

          if (existingItemIndex >= 0) {
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + itemQuantity,
            };
            return {
              carts: {
                ...state.carts,
                [storeSlug]: updatedCart,
              },
            };
          }

          return {
            carts: {
              ...state.carts,
              [storeSlug]: [...currentCart, newItem],
            },
          };
        });
      },

      removeItem: (productId, variantId, addonSelections) => {
        set((state) => {
          const storeSlug = state.currentStoreSlug;
          if (!storeSlug) return state;

          const currentCart = state.carts[storeSlug] || [];
          const normalizedAddons = addonSelections?.length
            ? normalizeAddonSelections(addonSelections)
            : undefined;
          const itemToRemove: CartItem = {
            productId,
            variantId,
            quantity: 0,
            ...(normalizedAddons?.length
              ? { addonSelections: normalizedAddons }
              : {}),
          };

          const filteredCart = currentCart.filter(
            (item) => !areItemsEqual(item, itemToRemove),
          );

          return {
            carts: {
              ...state.carts,
              [storeSlug]: filteredCart,
            },
          };
        });
      },

      updateQuantity: (productId, quantity, variantId, addonSelections) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId, addonSelections);
          return;
        }

        set((state) => {
          const storeSlug = state.currentStoreSlug;
          if (!storeSlug) return state;

          const currentCart = state.carts[storeSlug] || [];
          const normalizedAddons = addonSelections?.length
            ? normalizeAddonSelections(addonSelections)
            : undefined;
          const itemToUpdate: CartItem = {
            productId,
            variantId,
            quantity: 0,
            ...(normalizedAddons?.length
              ? { addonSelections: normalizedAddons }
              : {}),
          };

          const updatedCart = currentCart.map((item) =>
            areItemsEqual(item, itemToUpdate) ? { ...item, quantity } : item,
          );

          return {
            carts: {
              ...state.carts,
              [storeSlug]: updatedCart,
            },
          };
        });
      },

      clearCart: () => {
        set((state) => {
          const storeSlug = state.currentStoreSlug;
          if (!storeSlug) return state;

          return {
            carts: {
              ...state.carts,
              [storeSlug]: [],
            },
          };
        });
      },

      getItemQuantity: (productId, variantId, addonSelections) => {
        const state = get();
        const storeSlug = state.currentStoreSlug;
        if (!storeSlug) return 0;

        const cart = state.carts[storeSlug] || [];
        const normalizedAddons = addonSelections?.length
          ? normalizeAddonSelections(addonSelections)
          : undefined;
        const itemToFind: CartItem = {
          productId,
          variantId,
          quantity: 0,
          ...(normalizedAddons?.length
            ? { addonSelections: normalizedAddons }
            : {}),
        };

        const item = cart.find((item) => areItemsEqual(item, itemToFind));
        return item?.quantity ?? 0;
      },

      getTotalItems: () => {
        const state = get();
        const storeSlug = state.currentStoreSlug;
        if (!storeSlug) return 0;

        const cart = state.carts[storeSlug] || [];
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "storefront-cart",
      skipHydration: true,
      partialize: (state) => ({
        carts: state.carts,
        currentStoreSlug: state.currentStoreSlug,
      }),
    },
  ),
);
