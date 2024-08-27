"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ProductForm } from "..";
import { ProductWithRelations } from "../../../../@types/prisma";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent } from "../../ui/dialog";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden",
					className
				)}
			>
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
