"use client";
import { FC, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { ClearButton, RequiredSymbol } from "..";
import { Input } from "../..";
import { PhoneInput } from "../../ui/phone-input";
import { ErrorText } from "../error-text";
interface Props extends React.InputHTMLAttributes<HTMLElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const ref = useRef(null);
  const inputRef = useRef(null);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {name === "phone" ? (
          <PhoneInput
            className="h-12 text-base"
            {...props}
            {...register(name)}
            ref={inputRef}
            inputRef={inputRef}
            mask="+7 (000) 000-00-00"
          />
        ) : (
          <Input className="h-12 text-base" {...props} {...register(name)} />
        )}

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
