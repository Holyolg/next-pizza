import { Container } from "./container";
import { Button } from "../ui/index";
import { cn } from "../../lib/utils";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CartButton, SearchInput } from ".";

interface Props {
	className?: string;
	hasSearch?: boolean;
	hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
	className,
	hasSearch = true,
	hasCart = true,
}) => {
	return (
		<header className={cn("border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="logo" width={35} height={35} />
					</div>
					<div>
						<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
						<p className="text-sm text-gray-400 leading-3">
							Вкуснее уже некуда
						</p>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
