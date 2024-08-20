import { FC } from "react";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { PizzaImage } from "../pizza-image";
import { Button } from "@/components/ui";

type Props = {
	name: string;
	imageUrl: string;
	ingredients: any;
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
	const textDetails = "30 см, традиционное тесто 30";
	const totalPrice = "350 руб.";
	const size = 30;

	return (
		<div className={cn(className, "flex flex-1")}>
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<PizzaImage imageUrl={imageUrl} size={size} alt={name} />

				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetails}</p>
				<Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					{totalPrice}
				</Button>
			</div>
		</div>
	);
};
