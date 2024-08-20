"use client";
import { FC } from "react";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Title } from "../title";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "./choose-product-form";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType);

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					className
				)}>
				{isPizzaForm ? (
					<ChoosePizzaForm
						name={product.name}
						imageUrl={product.imageUrl}
						ingredients={[]}
					/>
				) : (
					<ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
				)}
			</DialogContent>
		</Dialog>
	);
};
