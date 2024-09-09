"use client";
import { useFilters, useQueryFilters } from "@/shared/hooks";
import { cn } from "../../lib/utils";
import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";

type Props = {
	className?: string;
};

type Sort = "desc" | "asc";

export const SortPopup: React.FC<Props> = ({ className }) => {
	const [open, setOpen] = useState<Sort>("desc");
	const filters = useFilters();

	useQueryFilters(filters);

	const handleSort = () => {
		filters.setSort(open);
		setOpen(open === "desc" ? "asc" : "desc");
	};

	return (
		<button
			onClick={() => handleSort()}
			className={cn(
				"inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
				className
			)}>
			<ArrowUpDown size={16} />
			<b>Популярное:</b>
			<b className="text-primary">{open === "desc" ? "повыше" : "пониже"}</b>
		</button>
	);
};
