import { FC, useState } from "react";
import { Title } from "../title";
import { cn } from "../../../lib/utils";
import { PizzaImage } from "../pizza-image";
import { Button } from "../../ui";
import { GroupVariants } from "../group-variants";
import {
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from "../../../constants/pizza";
import { Ingredient } from "@prisma/client";

type Props = {
	name: string;
	imageUrl: string;
	ingredients: Ingredient[];
	productItems?: any;
	onClickAdd?: VoidFunction;
	className?: string;
};
export const ChoosePizzaForm: FC<Props> = ({
	name,
	imageUrl,
	ingredients,
	productItems,
	onClickAdd,
	className,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);

	const textDetails = "30 см, традиционное тесто 30";
	const totalPrice = "350 руб.";

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} alt={name} />

			<div className="w-[490px] bg-[#f9f9f9] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400 mb-3">{textDetails}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={pizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="grid grid-cols-3 gap-3"></div>

				<Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					{totalPrice}
				</Button>
			</div>
		</div>
	);
};
