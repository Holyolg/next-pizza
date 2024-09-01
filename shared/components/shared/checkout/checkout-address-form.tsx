import { FC } from "react";
import { FormTextarea, WhiteBlock } from "..";
import { Input } from "../../ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input name="adress" className="text-base" placeholder="Адрес доставки" />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарии к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
