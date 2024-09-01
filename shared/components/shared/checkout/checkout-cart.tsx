import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import React from "react";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
  onClickRemoveButton: (id: number) => void;
  loading: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  onClickRemoveButton,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {items.map(item => (
          <CheckoutItem
            key={item.id}
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
            disabled={item.disabled}
            onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
            onClickRemoveButton={() => onClickRemoveButton(item.id)}
            loading={loading}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
