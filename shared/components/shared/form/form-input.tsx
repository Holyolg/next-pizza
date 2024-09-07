"use client";
import { cn } from "@/shared/lib/utils";
import { FC, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { ClearButton, RequiredSymbol } from "..";
import { Input } from "../..";
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

  const inputValue = watch(name);
  const errorText = errors[name]?.message as string;

  const inputRef = useRef(null);

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: false });
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).value = "";
    }
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
          <IMaskInput
            mask="+7 (000) 000-00-00"
            unmask={false}
            onAccept={(value: string) => setValue(name, value, { shouldValidate: true })}
            className={cn(
              "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            inputRef={inputRef}
            placeholder="Телефон"
          />
        ) : (
          <Input className="h-12 text-base" {...props} {...register(name)} />
        )}

        {inputValue && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
