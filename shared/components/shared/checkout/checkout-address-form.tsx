import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddressInput, FormTextarea, WhiteBlock } from "..";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error && <ErrorText text={fieldState.error.message} />}
            </>
          )}
          name="address"
          control={control}
        />
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
