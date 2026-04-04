"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type TabOption = {
	id: string;
	label: string;
};

interface PropsType {
	tabsOption: TabOption[];
	filterKey: string;
}

export const QueryTabOption: FC<PropsType> = ({ tabsOption, filterKey }) => {
	const [activeTab, setActiveTab] = useState("all");

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const current = searchParams.get(filterKey);
		if (current) {
			setActiveTab(current);
		}
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (activeTab === "all") {
			params.delete(filterKey);
		} else {
			params.set(filterKey, activeTab);
		}

		router.push(`?${params.toString()}`);
	}, [activeTab]);

	return (
		<div className="flex flex-row">
			{tabsOption.map((tab, i) => (
				<button
					key={i}
					onClick={() => setActiveTab(tab?.id)}
					className={`
						px-5 py-3 text-sm bg-default rounded-full  text-nowrap
						${activeTab === tab.id ? "bg-gray-50 text-gray-800 font-medium" : "bg-white text-gray-600 hover:bg-gray-50"}
					`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};
