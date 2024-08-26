"use client";
import { FC } from "react";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent } from "../../ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "./choose-product-form";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { useCartStore } from "@/shared/store";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.productItem[0];
	const isPizzaForm = Boolean(product.productItem[0].pizzaType);

	const addCartItem = useCartStore((state) => state.addCartItem);
	const onAddProduct = (productItemId: number, ingredients: number[]) => {
		addCartItem({
			productItemId: firstItem.id,
		});
	};

	const onAddPizza = () => {
		addCartItem({
			productItemId: firstItem.id,
		});
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden",
					className
				)}>
				{isPizzaForm ? (
					<ChoosePizzaForm
						name={product.name}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						productItems={product.productItem}
					/>
				) : (
					<ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
				)}
			</DialogContent>
		</Dialog>
	);
};
