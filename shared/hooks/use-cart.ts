import { useEffect } from "react";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart-dto";
import { useCartStore } from "../store";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	addCartItem: (values: CreateCartItemValues) => void;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
};

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state);

	useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};
