// apps/storefront/src/stores/cart.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	productId: string;
	variantId?: string;
	quantity: number;
}

interface CartStoreState {
	// Store carts per store slug: { "store-slug": [items] }
	carts: Record<string, CartItem[]>;

	// Current store slug (set when user navigates to a store)
	currentStoreSlug: string | null;

	// Actions
	setCurrentStore: (storeSlug: string) => void;
	addItem: (productId: string, quantity?: number, variantId?: string) => void;
	removeItem: (productId: string, variantId?: string) => void;
	updateQuantity: (
		productId: string,
		quantity: number,
		variantId?: string,
	) => void;
	clearCart: () => void;
	getItemQuantity: (productId: string, variantId?: string) => number;
	getTotalItems: () => number;
}

// Helper to get cart key for a store
function getCartKey(storeSlug: string | null): string {
	return storeSlug || "default";
}

// Cached server snapshot - empty cart on server
const serverSnapshot = {
	carts: {},
	currentStoreSlug: null,
};

export const useCartStore = create<CartStoreState>()(
	persist(
		(set, get) => ({
			carts: {},
			currentStoreSlug: null,

			setCurrentStore: (storeSlug: string) => {
				set({ currentStoreSlug: storeSlug });
			},

			addItem: (productId, quantity, variantId) => {
				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) {
						console.warn("No store selected. Cannot add item to cart.");
						return state;
					}

					const cartKey = getCartKey(storeSlug);
					const currentCart = state.carts[cartKey] || [];

					// Default quantity to 1 if not provided
					const itemQuantity = quantity ?? 1;

					// Create unique key for item (productId + variantId)
					const itemKey = variantId ? `${productId}-${variantId}` : productId;

					const existingItemIndex = currentCart.findIndex((item) => {
						const itemKeyToCheck = item.variantId
							? `${item.productId}-${item.variantId}`
							: item.productId;
						return itemKeyToCheck === itemKey;
					});

					if (existingItemIndex >= 0) {
						// Update existing item quantity
						const updatedCart = [...currentCart];
						updatedCart[existingItemIndex] = {
							...updatedCart[existingItemIndex],
							quantity: updatedCart[existingItemIndex].quantity + itemQuantity,
						};
						return {
							carts: {
								...state.carts,
								[cartKey]: updatedCart,
							},
						};
					}

					// Add new item - ensure quantity is always a number
					return {
						carts: {
							...state.carts,
							[cartKey]: [
								...currentCart,
								{ productId, variantId, quantity: itemQuantity },
							],
						},
					};
				});
			},

			removeItem: (productId, variantId) => {
				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) return state;

					const cartKey = getCartKey(storeSlug);
					const currentCart = state.carts[cartKey] || [];

					const itemKey = variantId ? `${productId}-${variantId}` : productId;

					const filteredCart = currentCart.filter((item) => {
						const itemKeyToCheck = item.variantId
							? `${item.productId}-${item.variantId}`
							: item.productId;
						return itemKeyToCheck !== itemKey;
					});

					return {
						carts: {
							...state.carts,
							[cartKey]: filteredCart,
						},
					};
				});
			},

			updateQuantity: (productId, quantity, variantId) => {
				if (quantity <= 0) {
					get().removeItem(productId, variantId);
					return;
				}

				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) return state;

					const cartKey = getCartKey(storeSlug);
					const currentCart = state.carts[cartKey] || [];

					const itemKey = variantId ? `${productId}-${variantId}` : productId;

					const updatedCart = currentCart.map((item) => {
						const itemKeyToCheck = item.variantId
							? `${item.productId}-${item.variantId}`
							: item.productId;

						if (itemKeyToCheck === itemKey) {
							return { ...item, quantity };
						}
						return item;
					});

					return {
						carts: {
							...state.carts,
							[cartKey]: updatedCart,
						},
					};
				});
			},

			clearCart: () => {
				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) return state;

					const cartKey = getCartKey(storeSlug);
					return {
						carts: {
							...state.carts,
							[cartKey]: [],
						},
					};
				});
			},

			getItemQuantity: (productId, variantId) => {
				const state = get();
				const storeSlug = state.currentStoreSlug;
				if (!storeSlug) return 0;

				const cartKey = getCartKey(storeSlug);
				const cart = state.carts[cartKey] || [];

				const itemKey = variantId ? `${productId}-${variantId}` : productId;

				const item = cart.find((item) => {
					const itemKeyToCheck = item.variantId
						? `${item.productId}-${item.variantId}`
						: item.productId;
					return itemKeyToCheck === itemKey;
				});

				return item?.quantity ?? 0;
			},

			getTotalItems: () => {
				const state = get();
				const storeSlug = state.currentStoreSlug;
				if (!storeSlug) return 0;

				const cartKey = getCartKey(storeSlug);
				const cart = state.carts[cartKey] || [];
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
