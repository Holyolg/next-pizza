import { ArrowRight, DiamondPercent, Package, Truck } from "lucide-react";
import { FC } from "react";
import { CheckoutItemDetails, WhiteBlock } from ".";
import { Button, Skeleton } from "../ui";

interface Props {
  totalAmount: number;
  loading: boolean;
  className?: string;
}

const DELIVERY_PRICE = 250;
const TAXES = 15;

export const CheckoutSidebar: FC<Props> = ({ className, totalAmount, loading }) => {
  const taxesPrice = (totalAmount * TAXES) / 100;
  const totalPrice = taxesPrice + totalAmount + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого</span>
        {loading ? (
          <Skeleton className="h-11 w-36 rounded-sm" />
        ) : (
          <span className="h-11 text-3xl font-extrabold">{totalPrice} ₽</span>
        )}
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package className="mr-2" size={24} />
              Стоимость товаров:
            </div>
          }
          value={totalAmount}
          loading={loading}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <DiamondPercent className="mr-2" size={24} />
              Сервисный сбор:
            </div>
          }
          value={taxesPrice}
          loading={loading}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck className="mr-2" size={24} />
              Доставка:
            </div>
          }
          value={DELIVERY_PRICE}
          loading={loading}
        />

        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
          Перейти к оплате <ArrowRight className="w-5 ml-2" />
        </Button>
      </div>
    </WhiteBlock>
  );
};
