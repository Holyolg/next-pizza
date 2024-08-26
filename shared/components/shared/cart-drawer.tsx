"use client";

import React, { FC, useEffect } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store/index";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

type Props = {
	className?: string;
};

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [totalAmount, fetchCartItems, items, updateItemQuantity] = useCartStore(
		(state) => [
			state.totalAmount,
			state.fetchCartItems,
			state.items,
			state.updateItemQuantity,
		]
	);

	useEffect(() => {
		fetchCartItems();
	}, []);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-gray-50">
				<SheetHeader>
					<SheetTitle>
						В корзине
						<span className="font-bold">
							{items.length > 1
								? ` ${items.length} товаров`
								: ` ${items.length} товар`}
						</span>
					</SheetTitle>
				</SheetHeader>

				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<div className="mb-2" key={item.id}>
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								details={
									item.pizzaSize && item.pizzaType
										? getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize
										  )
										: ""
								}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								onClickCountButton={(type) =>
									onClickCountButton(item.id, item.quantity, type)
								}
							/>
						</div>
					))}
				</div>

				<SheetFooter>
					<div className="w-full mb-4">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
							</span>

							<span className="font-bold text-lg">{totalAmount}₽</span>
						</div>
						<Link href="/cart">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ <ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
