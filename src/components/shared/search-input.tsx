"use client";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "../../../services/api-client";

type Props = {
	className?: string;
};

export const SearchInput: FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [focused, setFocused] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.log(error);
			}
		},
		250,
		[searchQuery]
	);

	const onClickItem = () => {
		setFocused(false);
		setSearchQuery("");
		setProducts([]);
	};

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
			)}

			<div
				className={cn(
					"flex rounded-2xl flex-1 justify-between relative h-11 z-30",
					className
				)}
				ref={ref}
			>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full bg-gray-100 pl-11 "
					type="text"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				<div
					className={cn(
						"absolute w-full bg-white rounded-2xl py-2 top-1/4 shadow-md transition-all duration-200 invisible opacity-0 z-30",
						focused && "visible opacity-100 top-12"
					)}
				>
					{products.map(product => (
						<Link
							onClick={onClickItem}
							key={product.id}
							href={`product/${product.id}`}
							className="px-3 py-2 hover:bg-primary/10 w-full flex items-center gap-3"
						>
							<img
								className="rounded-sm"
								src={product.imageUrl}
								width={32}
								height={32}
								alt={product.name}
							/>
							<span>{product.name}</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};
