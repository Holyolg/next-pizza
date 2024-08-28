"use client";
import {
	CheckoutItemDetails,
	Container,
	Title,
	WhiteBlock,
} from "@/shared/components/shared";
import { Textarea } from "@/shared/components/shared/textarea";
import { Button, Input } from "@/shared/components/ui";
import { useCartStore } from "@/shared/store";
import { ArrowRight, DiamondPercent, Package, Truck } from "lucide-react";

export default function Checkout() {
	const [totalAmount] = useCartStore((state) => [state.totalAmount]);

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				size="lg"
				className="font-extrabold mb-8"></Title>

			<div className="flex gap-10">
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина"></WhiteBlock>
					<WhiteBlock title="2. Персональная информация">
						<div className="grid grid-cols-2 gap-5">
							<Input name="firstName" className="text-base" placeholder="Имя" />
							<Input
								name="lastName"
								className="text-base"
								placeholder="Фамилия"
							/>
							<Input name="email" className="text-base" placeholder="E-mail" />
							<Input name="phone" className="text-base" placeholder="Телефон" />
						</div>
					</WhiteBlock>
					<WhiteBlock title="3. Адрес доставки">
						<div className="flex flex-col gap-5">
							<Input
								name="adress"
								className="text-base"
								placeholder="Адрес доставки"
							/>
							<Textarea
								className="text-base"
								placeholder="Коментарий к заказу"
								rows={5}
							/>
						</div>
					</WhiteBlock>
				</div>
				<div className="w-[450px]">
					<WhiteBlock className="p-6 sticky top-4">
						<div className="flex flex-col gap-1">
							<span className="text-xl">Итого</span>
							<span className="text-3xl font-extrabold">{totalAmount} ₽</span>

							<CheckoutItemDetails
								title={
									<div className="flex items-center">
										<Package className="mr-2" size={24} />
										Стоимость товаров
									</div>
								}
								value={0}
							/>
							<CheckoutItemDetails
								title={
									<div className="flex items-center">
										<DiamondPercent className="mr-2" size={24} />
										Сервисный сбор
									</div>
								}
								value={totalAmount}
							/>
							<CheckoutItemDetails
								title={
									<div className="flex items-center">
										<Truck className="mr-2" size={24} />
										Доставка
									</div>
								}
								value={0}
							/>

							<Button
								type="submit"
								className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
								Перейти к оплате <ArrowRight className="w-5 ml-2" />
							</Button>
						</div>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
