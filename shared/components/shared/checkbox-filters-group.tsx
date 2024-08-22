"use client";

import { Input, Skeleton } from "../ui";
import { FC, useState } from "react";
import { useSet } from "react-use";
import { FilterCheckBox, FilterCheckboxProps } from "./filter-checkbox";

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	loading?: boolean;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selectedValues?: Set<string>;
	name?: string;
	className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = "Поиск...",
	className,
	loading,
	onClickCheckbox,
	defaultValue,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [set, { toggle }] = useSet(new Set<string>([]));

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	if (loading) {
		return (
			<div className={className}>
				<p className="'font-bold mb-3">{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className="h-6 mb-4" />)}
				<Skeleton className="h-6 mb-4 w-28" />
			</div>
		);
	}

	const list = showAll
		? items.filter((items) =>
				items.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		  )
		: (defaultItems || items).slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)}
			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<FilterCheckBox
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selectedValues?.has(item.value)}
						key={index}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
					<button
						onClick={() => setShowAll(!showAll)}
						className="text-primary mt-3">
						{showAll ? "Скрыть" : "+ Показать все"}
					</button>
				</div>
			)}
		</div>
	);
};
