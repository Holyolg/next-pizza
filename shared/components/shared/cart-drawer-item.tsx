import { FC } from "react";
import { cn } from "../../lib/utils";
import * as CartItem from "../cart-item-details";
import { CartItemProps } from "../cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
	className?: string;
}

export const CartDrawerItem: FC<Props> = ({
	id,
	imageUrl,
	name,
	price,
	quantity,
	className,
}) => {
	return (
		<div className={cn("flex bg-white p-5 gap-6", className)}>
			<CartItem.Image src={imageUrl} />

			<div className="flex-1">
				<CartItem.Info name={name} price={price}></CartItem.Info>
			</div>
		</div>
	);
};
