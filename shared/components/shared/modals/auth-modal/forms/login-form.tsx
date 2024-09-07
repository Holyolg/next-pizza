import { Button } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormInput, Title } from "../../..";
import { TFormLoginValues, formLoginSchema } from "./schemas";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }
      toast.success("Вы вошли в аккаунт", { icon: "✅" });

      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Не удалось войти в аккаунт", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Title text="Вход в аккаунт" size="md" className="font-bold text-center" />
        <div className="flex justify-between items-center">
          <Mail width={50} height={50} className="mr-2 text-gray-400" strokeWidth={1} />
          <div>
            <p className="text-gray-400">Введите почту, чтобы войти в аккаунт</p>
          </div>
        </div>

        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
