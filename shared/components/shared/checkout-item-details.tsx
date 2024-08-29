import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Skeleton } from "../ui";

interface Props {
	title?: React.ReactNode;
	value?: number;
	loading: boolean;
	className?: string;
}

export const CheckoutItemDetails: FC<Props> = ({
	className,
	title,
	value,
	loading,
}) => {
	return (
		<div className={cn("flex my-4", className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				{title}
				<div className="flex-1 border-b border-dashed border-b-neutral-200 -top-1 mx-2" />
			</span>

			{loading ? (
				<Skeleton className="h-[28px] w-20 rounded-sm" />
			) : (
				<span className="text-lg font-bold">{value} ₽</span>
			)}
		</div>
	);
};
