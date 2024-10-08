import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

type PriceProps = {
	priceFrom?: number;
	priceTo?: number;
};

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
	sort?: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
	sort?: string;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
	setSort: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get("ingredients")?.split(","))
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
		)
	);

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.get("pizzaTypes")
				? searchParams.get("pizzaTypes")?.split(",")
				: []
		)
	);

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({ ...prev, [name]: value }));
	};

	const [sort, setSort] = useState(searchParams.get("sort")) || undefined;

	return useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			sort,
			setPrices: updatePrice,
			setPizzaTypes: togglePizzaTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
			setSort,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices, sort]
	);
};
