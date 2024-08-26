import { Api } from "./../services/api-client";
import { create } from "zustand";
import { getCartDetails } from "../lib/get-cart-details";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];

	fetchCartItems: () => Promise<void>;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: any) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.getCart();
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	removeCartItem: async (id: number) => {},

	addCartItem: async (values: any) => {},
}));
