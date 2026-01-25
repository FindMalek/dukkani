import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
	productId: string;
	quantity: number;
}

interface CartStoreState {
	items: CartItem[];
	addItem: (productId: string, quantity?: number) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getItemQuantity: (productId: string) => number;
	getTotalItems: () => number;
}

export const useCartStore = create<CartStoreState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (productId, quantity = 1) => {
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.productId === productId,
					);
					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.productId === productId
									? { ...item, quantity: item.quantity + quantity }
									: item,
							),
						};
					}
					return {
						items: [...state.items, { productId, quantity }],
					};
				});
			},
			removeItem: (productId) => {
				set((state) => ({
					items: state.items.filter((item) => item.productId !== productId),
				}));
			},
			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(productId);
					return;
				}
				set((state) => ({
					items: state.items.map((item) =>
						item.productId === productId ? { ...item, quantity } : item,
					),
				}));
			},
			clearCart: () => set({ items: [] }),
			getItemQuantity: (productId) => {
				const item = get().items.find((item) => item.productId === productId);
				return item?.quantity ?? 0;
			},
			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},
		}),
		{
			name: "storefront-cart",
			skipHydration: true,
		},
	),
);
