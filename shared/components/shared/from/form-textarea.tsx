import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ClearButton, RequiredSymbol } from "..";
import { ErrorText } from "../error-text";
import { Textarea } from "../textarea";

interface Props extends React.InputHTMLAttributes<HTMLElement> {
  name: string;
  label?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<Props> = ({ className, name, label, rows, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const text = watch(name);
  const errorText = errors[name]?.message as string;

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
        <Textarea className="h-12 text-base" {...props} {...register(name)} rows={rows} />

        {Boolean(text) && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
