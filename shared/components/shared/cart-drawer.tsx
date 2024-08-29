"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { Title } from ".";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";

type Props = {
	className?: string;
};

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [redirecting, setRedirecting] = useState(false);

	const { totalAmount, updateItemQuantity, removeCartItem, items } = useCart();

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	const onClickRemoveButton = (id: number) => {
		removeCartItem(id);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-gray-50">
				<div
					className={cn(
						"flex flex-col h-full",
						!totalAmount && "justify-center"
					)}
				>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзине
								<span className="font-bold">
									{items.length > 1 && items.length === 0
										? ` ${items.length} товаров`
										: ` ${items.length} товар`}
								</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!totalAmount && (
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image
								src="/assets/images/empty-cart.png"
								alt="Пустая корзина"
								width={250}
								height={250}
							/>
							<Title
								size="sm"
								text="Корзина пустая"
								className="text-center font-bold my-2"
							/>
							<p className="text-center text-neutral-500 mb-5">
								Добавьте хотя бы кофе, чтобы совершить товар
							</p>

							<SheetClose>
								<Button className="w-56 h-12 text-base" size="lg">
									<ArrowLeft className="w-5 mr-2" /> Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className="-mx-6 mt-5 overflow-auto flex-1">
								{items.map(item => (
									<div className="mb-2" key={item.id}>
										<CartDrawerItem
											id={item.id}
											imageUrl={item.imageUrl}
											details={getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize
											)}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={type =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemoveButton={() => onClickRemoveButton(item.id)}
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
									<Link href="/checkout">
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type="submit"
											className="w-full h-12 text-base"
										>
											Оформить заказ <ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
