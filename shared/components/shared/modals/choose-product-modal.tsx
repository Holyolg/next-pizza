"use client";
import { useCartStore } from "@/shared/store";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { ProductWithRelations } from "../../../../@types/prisma";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent } from "../../ui/dialog";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.productItem[0];
	const isPizzaForm = Boolean(product.productItem[0].pizzaType);

	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	]);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients,
			});

			toast.success(`${product.name} добавлен в корзину`);
			router.back();
		} catch (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
			console.error(error);
		}
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden",
					className
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						name={product.name}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						productItems={product.productItem}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						name={product.name}
						imageUrl={product.imageUrl}
						price={firstItem.price}
						onSubmit={onSubmit}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
