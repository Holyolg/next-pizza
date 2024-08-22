import { ingredients } from "./../../prisma/constants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param productItems - список вариантов пицц
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number общую стоимость
 */

export const calcTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	productItems: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		productItems.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredients) => selectedIngredients.has(ingredients.id))
		.reduce((acc, ingredients) => acc + ingredients.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
