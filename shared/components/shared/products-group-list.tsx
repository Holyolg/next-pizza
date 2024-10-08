"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { cn } from "../../lib/utils";
import { useCategoryStore } from "../../store/category";
import { ProductCard } from "./product-card";
import { Title } from "./title";

type Props = {
	title: string;
	products: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
};

export const ProductsGroupList: FC<Props> = ({
	title,
	products,
	className,
	listClassName,
	categoryId,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-8" />

			<div className={cn("grid grid-cols-3 gap-[80px]", listClassName)}>
				{products.map((product: any) => {
					return (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							price={product.productItem[0].price}
							ingredients={product.ingredients}
						/>
					);
				})}
			</div>
		</div>
	);
};
