import { PizzaSize, PizzaType } from "../constants/pizza";
import { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	availableSizes: Variant[];
	selectedIngredients: Set<number>;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (productItems: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);
	const availableSizes = getAvailablePizzaSizes(productItems, type);
	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled
		);
		const availableSize = availableSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSizes.values) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		setSize,
		setType,
		addIngredient,
	};
};
