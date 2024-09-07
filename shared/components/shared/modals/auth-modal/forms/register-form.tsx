import { registerUser } from "@/app/api/actions";
import { Button } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormInput, Title } from "../../..";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";

interface Props {
  onClose?: VoidFunction;
  onClickRegisterLogin?: VoidFunction;
}

export const RegisterForm: FC<Props> = ({ onClose, onClickRegisterLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      toast.success("Регистрация успешна. Код для подтверждения выслан на почту", { icon: "✅" });

      onClose?.();
    } catch (error) {
      console.error("Error [REGISTER]", error);
      toast.error("Неверный E-mail или пароль", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Title text="Регистрация аккаунта" size="md" className="font-bold text-center" />
        <div className="flex items-center">
          <p className="text-gray-400 text-center">Заполните данные для регистрации</p>
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Повторите пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
