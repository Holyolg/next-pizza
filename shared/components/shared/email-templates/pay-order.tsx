import { FC } from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: FC<Props> = ({ orderId, paymentUrl, totalAmount }) => (
  <div>
    <h1>Заказ No{orderId}</h1>
    <p>
      Оплатите заказ на сумму <b>{totalAmount}</b> ₽. Перейдите
      <a href={paymentUrl}>по этой ссылке </a>
      для оплаты заказа
    </p>
  </div>
);
