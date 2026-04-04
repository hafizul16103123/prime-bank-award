import Image from "next/image";
import { FC } from "react";
import { Item } from "./Item";
import { paginationRanges } from "./ranges";

export const Items: FC<PropsType> = ({ current, total, onClick }) => (
	<ul className="p-0 m-0 flex items-center gap-1">
		{current > 1 && (
			<Item
				className=" !text-primary bg-transparent  text-sm font-normal !p-0 flex items-center  !py-2 !px-3"
				onClick={() => onClick(current - 1)}
			>
				<Image src="/images/icons/arrow_right.png" width={16} height={16} alt="" className="rotate-180" />
				Previous
			</Item>
		)}

		{[...paginationRanges(current, total)].map((i) => (
			<Item
				key={i}
				isDots={!!(i === "...")}
				className={`${
					i === current ? "text-white bg-black" : "bg-transparent !text-black border border-lightGray"
				} !py-2 !px-3 !text-sm`}
				onClick={() => onClick(Number(i))}
			>
				{i}
			</Item>
		))}

		{current < total && (
			<Item
				className="!text-primary bg-transparent  text-sm font-normal !p-0 flex items-center  !py-2 !px-3"
				onClick={() => onClick(current + 1)}
			>
				Next
				<Image src="/images/icons/arrow_right.png" width={16} height={16} alt="" />
			</Item>
		)}
	</ul>
);

interface PropsType {
	current: number;
	total: number;
	onClick: (page: number) => void;
}
