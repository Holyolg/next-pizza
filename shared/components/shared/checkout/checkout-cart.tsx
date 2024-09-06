import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import React from "react";
import { Skeleton } from "../..";
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
  const skeletonItems = (
    <>
      {...Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            className="flex items-center gap-5 flex-1
      "
            key={index}>
            <Skeleton className="size-[60px] rounded-full" />
            <Skeleton className="h-6 w-[60%]" />
            <Skeleton className="h-6 w-10 " />
            <Skeleton className="size-8  rounded-lg" />
            <Skeleton className="h-6 w-10 " />
            <Skeleton className="size-8  rounded-lg" />
            <Skeleton className="size-4 " />
          </div>
        ))}
    </>
  );

  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5 min-h-[50px]">
        {items.map(item => (
          <CheckoutItem
            loading={loading}
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
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
