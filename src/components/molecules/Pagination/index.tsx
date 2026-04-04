"use client";

import { formatNumber } from "@/utils/helpers/format.helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, FC } from "react";
import { Items } from "./Items";

export const Pagination: FC<PaginProps> = ({
	currentPage = 1,
	totalPages = 1,
	totalCount = 0,
	className,
	style,
	customClickHandler,
	...rest
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const handlePage = (number: number) => {
		if (String(number) === "1") {
			params.delete("page");
		} else {
			params.set("page", String(number));
		}
		router.replace(`?${params.toString()}`);
	};

	const itemsPerPage = 20;
	const startIndex = (currentPage - 1) * itemsPerPage + 1;
	const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

	return (
		<div className="pt-7 flex items-center justify-between">
			{totalPages > 1 && <Items current={currentPage} total={totalPages} onClick={handlePage} />}
			{totalCount > 0 && (
				<span className="font-normal ml-3 text-sm">
					{startIndex}-{endIndex} of {formatNumber(totalCount)}
				</span>
			)}
		</div>
	);
};

export interface PaginProps {
	currentPage?: number;
	totalPages?: number;
	totalCount?: number;
	className?: string;
	style?: CSSProperties;
	customClickHandler?: (page: number) => void;
}
