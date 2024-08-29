import { FC } from "react";
import { ClearButton, RequiredSymbol } from "..";
import { Input } from "../../ui";
import { ErrorText } from "../error-text";

interface Props extends React.InputHTMLAttributes<HTMLElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<Props> = ({ className, name, label, required, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-base" {...props} />

        <ClearButton />
      </div>

      <ErrorText text="Поле обязательно для заполнения" className="mt-2" />
    </div>
  );
};
