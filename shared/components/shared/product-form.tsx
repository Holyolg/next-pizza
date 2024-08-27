"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { FC } from "react";
import toast from "react-hot-toast";
import { ChooseProductForm } from "./modals";
import { ChoosePizzaForm } from "./modals/choose-pizza-form";

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
	className?: string;
}
export const ProductForm: FC<Props> = ({
	className,
	product,
	onSubmit: _onSubmit,
}) => {
	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	]);

	const firstItem = product.productItem[0];
	const isPizzaForm = Boolean(product.productItem[0].pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients,
			});

			toast.success(`${product.name} добавлен в корзину`);

			_onSubmit?.();
		} catch (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
			console.error(error);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				name={product.name}
				imageUrl={product.imageUrl}
				ingredients={product.ingredients}
				productItems={product.productItem}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm
			name={product.name}
			imageUrl={product.imageUrl}
			price={firstItem.price}
			onSubmit={onSubmit}
			loading={loading}
		/>
	);
};
