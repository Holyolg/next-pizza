import { CartItemDTO } from "@/shared/services/dto/cart-dto";
import { FC } from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const OrderCanceledTemplate: FC<Props> = ({ orderId, items, totalAmount }) => (
  <div>
    <h1>
      Ваш заказ No{orderId} на сумму {totalAmount} отменен.
    </h1>
    <hr />
    <p>Список товаров:</p>
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ х {item.quantity} шт. ={" "}
          {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
