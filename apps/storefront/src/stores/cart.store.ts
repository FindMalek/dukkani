import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
	id: string;
	name: string;
	imageUrl: string | undefined;
	price: number;
	stock: number;
}

export interface CartItem {
	productId: string;
	quantity: number;
	product: CartProduct;
}

function isProductPublicOutput(
	p: ProductPublicOutput | CartProduct,
): p is ProductPublicOutput {
	return "imagesUrls" in p;
}

export function toCartProduct(
	p: ProductPublicOutput | CartProduct,
): CartProduct {
	if (isProductPublicOutput(p)) {
		return {
			id: p.id,
			name: p.name,
			imageUrl: p.imagesUrls?.[0],
			price: p.price,
			stock: p.stock,
		};
	}
	return p;
}

interface CartStoreState {
	carts: Record<string, CartItem[]>;
	currentStoreSlug: string | null;
	setCurrentStore: (slug: string | null) => void;
	addItem: (
		product: ProductPublicOutput | CartProduct,
		quantity: number,
	) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getItemQuantity: (productId: string) => number;
	getTotalItems: () => number;
	getItems: () => CartItem[];
}

export const useCartStore = create<CartStoreState>()(
	persist(
		(set, get) => ({
			carts: {},
			currentStoreSlug: null,

			setCurrentStore: (slug) => {
				set({ currentStoreSlug: slug });
				if (slug && !get().carts[slug]) {
					set((state) => ({
						carts: { ...state.carts, [slug]: [] },
					}));
				}
			},

			addItem: (product, quantity) => {
				const qty = quantity <= 0 ? 1 : quantity;
				const { currentStoreSlug, carts } = get();
				if (!currentStoreSlug) return;

				const cartProduct = toCartProduct(product);
				const currentCart = carts[currentStoreSlug] ?? [];
				const existingItem = currentCart.find(
					(item) => item.productId === cartProduct.id,
				);

				if (existingItem) {
					const newQuantity = existingItem.quantity + qty;
					set((state) => ({
						carts: {
							...state.carts,
							[currentStoreSlug]: (state.carts[currentStoreSlug] ?? []).map(
								(item) =>
									item.productId === cartProduct.id
										? {
												...item,
												quantity: newQuantity,
												product: cartProduct,
											}
										: item,
							),
						},
					}));
				} else {
					set((state) => ({
						carts: {
							...state.carts,
							[currentStoreSlug]: [
								...(state.carts[currentStoreSlug] ?? []),
								{
									productId: cartProduct.id,
									quantity: qty,
									product: cartProduct,
								},
							],
						},
					}));
				}
			},

			removeItem: (productId) => {
				const { currentStoreSlug } = get();
				if (!currentStoreSlug) return;

				set((state) => ({
					carts: {
						...state.carts,
						[currentStoreSlug]: (state.carts[currentStoreSlug] ?? []).filter(
							(item) => item.productId !== productId,
						),
					},
				}));
			},

			updateQuantity: (productId, quantity) => {
				const { currentStoreSlug } = get();
				if (!currentStoreSlug) return;

				if (quantity <= 0) {
					get().removeItem(productId);
					return;
				}

				set((state) => ({
					carts: {
						...state.carts,
						[currentStoreSlug]: (state.carts[currentStoreSlug] ?? []).map(
							(i) => (i.productId === productId ? { ...i, quantity } : i),
						),
					},
				}));
			},

			clearCart: () => {
				const { currentStoreSlug } = get();
				if (!currentStoreSlug) return;

				set((state) => ({
					carts: {
						...state.carts,
						[currentStoreSlug]: [],
					},
				}));
			},

			getItemQuantity: (productId) => {
				const { currentStoreSlug, carts } = get();
				if (!currentStoreSlug) return 0;
				const item = (carts[currentStoreSlug] ?? []).find(
					(i) => i.productId === productId,
				);
				return item?.quantity ?? 0;
			},

			getTotalItems: () => {
				const { currentStoreSlug, carts } = get();
				if (!currentStoreSlug) return 0;
				return (carts[currentStoreSlug] ?? []).reduce(
					(sum, item) => sum + item.quantity,
					0,
				);
			},

			getItems: () => {
				const { currentStoreSlug, carts } = get();
				if (!currentStoreSlug) return [];
				const items = carts[currentStoreSlug] ?? [];
				return items.filter(
					(item): item is CartItem => "product" in item && item.product != null,
				);
			},
		}),
		{
			name: "storefront-cart",
			skipHydration: true,
			partialize: (state) => ({ carts: state.carts }),
		},
	),
);

// TODO: this needs a refactor i dont like it
