import { ChooseProductForm } from "@/shared/components/shared/modals";
import { ChoosePizzaForm } from "@/shared/components/shared/modals/choose-pizza-form";
import { useCartStore } from "@/shared/store";
import { notFound } from "next/navigation";
import { toast } from "react-hot-toast";
import { prisma } from "../../../../prisma/prisma-client";
import { Container } from "../../../../shared/components/shared";

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							productItem: true,
						},
					},
				},
			},
			productItem: true,
		},
	});

	if (!product) {
		return notFound();
	}

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
		} catch (error) {
			toast.error(`Не удалось добавить ${product.name} в корзину`);
			console.error(error);
		}
	};

	return (
		<Container className="flex flex-col my-10">
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
		</Container>
	);
}
