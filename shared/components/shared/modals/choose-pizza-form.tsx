import { FC } from "react";
import { Title } from "../title";
import { cn } from "../../../lib/utils";
import { PizzaImage } from "../pizza-image";
import { Button } from "../../ui";
import { GroupVariants } from "../group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "../../../constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { Ingredients } from "../ingredients";
import { usePizzaOptions } from "../../../hooks";
import { getPizzaDetails } from "../../../lib/get-pizza-details";

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
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(productItems);

	const { totalPrice, textDetails } = getPizzaDetails(
		type,
		size,
		productItems,
		ingredients,
		selectedIngredients
	);

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
						items={availableSizes}
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
