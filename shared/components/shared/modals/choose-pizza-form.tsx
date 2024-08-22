import { FC, useEffect, useState } from "react";
import { Title } from "../title";
import { cn } from "../../../lib/utils";
import { PizzaImage } from "../pizza-image";
import { Button } from "../../ui";
import { GroupVariants, Variant } from "../group-variants";
import {
	mapPizzaSize,
	mapPizzaType,
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from "../../../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { Ingredients } from "../ingredients";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "../../../lib/calc-total-pizza-price";

type Props = {
	name: string;
	imageUrl: string;
	ingredients: Ingredient[];
	productItems: ProductItem[];
	onClickAddCart?: VoidFunction;
	className?: string;
};
export const ChoosePizzaForm: FC<Props> = ({
	name,
	imageUrl,
	ingredients,
	productItems,
	onClickAddCart,
	className,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const textDetails = `${size} см, ${mapPizzaType[type]} тесто, ингредиенты (${selectedIngredients.size})`;

	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		productItems,
		ingredients,
		selectedIngredients
	);

	const filteredPizzasByType = productItems.filter(
		(item) => item.pizzaType === type
	);

	const availablePizzaSizes = pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			(pizza) => Number(pizza.size) === Number(item.value)
		),
	}));

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes?.find(
			(item) => Number(item.value) === size && !item.disabled
		);
		const availableSizes = availablePizzaSizes?.find((item) => !item.disabled);

		if (!isAvailableSize && availableSizes) {
			setSize(Number(availableSizes.value) as PizzaSize);
		}
	}, [type]);

	const handleClickAdd = () => {
		onClickAddCart?.();
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} alt={name} />

			<div className="w-[490px] bg-[#f9f9f9] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400 mb-3">{textDetails}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={availablePizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 flex py-5 justify-center rounded-md h-[420px] overflow-auto scrollbar">
					<div className="grid grid-cols-3 gap-5">
						{ingredients.map((ingredient) => (
							<Ingredients
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={String(ingredient.price)}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
					onClick={handleClickAdd}>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
