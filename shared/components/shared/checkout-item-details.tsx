import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
	title?: React.ReactNode;
	value?: number;
	className?: string;
}

export const CheckoutItemDetails: FC<Props> = ({ className, title, value }) => {
	return (
		<div className={cn("flex my-4", className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				{title}
				<div className="flex-1 border-b border-dashed border-b-neutral-200 -top-1 mx-2" />
			</span>
			<span className="text-lg font-bold">{value} ₽</span>
		</div>
	);
};
