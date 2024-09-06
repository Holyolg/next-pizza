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

export default function CheckoutPage() {
  const { loading, totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

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

  const onSubmit = (data: TCheckoutFormValues) => {
    createOrder(data);
    console.log(data);
  };
  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onClickRemoveButton = (id: number) => {
    removeCartItem(id);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8"></Title>

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

              <CheckoutPersonalForm className={loading ? "opacity-50 pointer-events-none" : ""} />

              <CheckoutAddressForm className={loading ? "opacity-50 pointer-events-none" : ""} />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
