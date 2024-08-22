import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	productItems: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${size} см, ${mapPizzaType[type]} тесто, ингредиенты (${selectedIngredients.size})`;

	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		productItems,
		ingredients,
		selectedIngredients
	);

	return { textDetails, totalPrice };
};
