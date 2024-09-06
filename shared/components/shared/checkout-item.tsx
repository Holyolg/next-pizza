import { Ingredient } from "@prisma/client";
import { X } from "lucide-react";
import { FC } from "react";
import { cn } from "../../lib/utils";
import * as CartItem from "../cart-item-details";
import { CartItemDetailsCountButton } from "../cart-item-details/cart-item-details-count-button";
import { CartItemProps } from "../cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  loading: boolean;
  ingredients?: Ingredient[];
  className?: string;
}

export const CheckoutItem: FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  loading,
  onClickCountButton,
  onClickRemoveButton,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetailsCountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemoveButton}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
