"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { createOrder } from "@/app/api/actions";
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from "@/shared/components";
import { TCheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
	const { loading, totalAmount, items, updateItemQuantity, removeCartItem } =
		useCart();
	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);

	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(" ");

			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", data.email);
		}
		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit = async (data: TCheckoutFormValues) => {
		try {
			setSubmitting(true);
			const url = await createOrder(data);
			toast.success("Заказ успешно оформлен. Переходим на оплату...", {
				icon: "✅",
			});
			if (url) {
				location.href = url;
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			toast.error("Не удалось создать заказ", { icon: "❌" });
		}
	};
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
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				size="lg"
				className="font-extrabold mb-8"></Title>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								onClickRemoveButton={onClickRemoveButton}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? "opacity-50 pointer-events-none" : ""}
							/>

							<CheckoutAddressForm
								className={loading ? "opacity-50 pointer-events-none" : ""}
							/>
						</div>

						<div className="w-[450px]">
							<CheckoutSidebar
								loading={loading || submitting}
								totalAmount={totalAmount}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
