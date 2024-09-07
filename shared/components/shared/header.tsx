"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthModal, CartButton, ProfileButton, SearchInput } from ".";
import { cn } from "../../lib/utils";
import { Container } from "./container";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (searchParams.has("paid")) {
      router.push(pathname);
      setTimeout(() => {
        toast.success("Заказ успешно оплачен. Информация о заказе отправлена на почту");
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
          </div>
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">Вкуснее уже некуда</p>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
