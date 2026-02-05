import { create } from "zustand";
import { persist } from "zustand/middleware";
import { areItemsEqual } from "@/lib/cart-utils";

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

	// Cart drawer state
	isCartDrawerOpen: boolean;
	setCartDrawerOpen: (open: boolean) => void;

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
	clearCartBySlug: (storeSlug: string) => void;
	getItemQuantity: (productId: string, variantId?: string) => number;
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
			addItem: (productId, quantity, variantId) => {
				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) {
						console.warn("No store selected. Cannot add item to cart.");
						return state;
					}

					const currentCart = state.carts[storeSlug] || [];
					const itemQuantity = quantity ?? 1;
					const newItem: CartItem = {
						productId,
						variantId,
						quantity: itemQuantity,
					};

					// Find existing item by key
					const existingItemIndex = currentCart.findIndex((item) =>
						areItemsEqual(item, newItem),
					);

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
								[storeSlug]: updatedCart,
							},
						};
					}

					// Add new item
					return {
						carts: {
							...state.carts,
							[storeSlug]: [...currentCart, newItem],
						},
					};
				});
			},

			/**
			 * Remove item from cart
			 */
			removeItem: (productId, variantId) => {
				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) return state;

					const currentCart = state.carts[storeSlug] || [];
					const itemToRemove: CartItem = { productId, variantId, quantity: 0 };

					// Filter out the item to remove
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

			/**
			 * Update quantity of an item in cart
			 * If quantity <= 0, removes the item instead
			 */
			updateQuantity: (productId, quantity, variantId) => {
				if (quantity <= 0) {
					get().removeItem(productId, variantId);
					return;
				}

				set((state) => {
					const storeSlug = state.currentStoreSlug;
					if (!storeSlug) return state;

					const currentCart = state.carts[storeSlug] || [];
					const itemToUpdate: CartItem = { productId, variantId, quantity: 0 };

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
			clearCartBySlug: (storeSlug: string) => {
				set((state) => {
					return {
						carts: {
							...state.carts,
							[storeSlug]: [],
						},
					};
				});
			},

			/**
			 * Get quantity of a specific item in cart
			 */
			getItemQuantity: (productId, variantId) => {
				const state = get();
				const storeSlug = state.currentStoreSlug;
				if (!storeSlug) return 0;

				const cart = state.carts[storeSlug] || [];
				const itemToFind: CartItem = { productId, variantId, quantity: 0 };

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
