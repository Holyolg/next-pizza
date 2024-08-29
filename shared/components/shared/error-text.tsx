import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
	text: string;
	className?: string;
}

export const ErrorText: FC<Props> = ({ text, className }) => {
	return <p className={cn("text-red-400 text-sm", className)}>{text}</p>;
};
