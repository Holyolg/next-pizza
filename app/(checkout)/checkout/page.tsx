"use client";
import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/";
import { Textarea } from "@/shared/components/shared/textarea";
import { Input } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CheckoutPage() {
  const { loading, totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

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

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map(item => (
                <CheckoutItem
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemoveButton={() => onClickRemoveButton(item.id)}
                  disabled={item.disabled}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Персональная информация">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <FormInput name={"phone"} className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="adress" className="text-base" placeholder="Адрес доставки" />
              <Textarea className="text-base" placeholder="Коментарий к заказу" rows={5} />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
        </div>
      </div>
    </Container>
  );
}
