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
	const [activeTab, setActiveTab] = useState(tabsOption[0]?.id);

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
		<div className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-md bg-tartiary/50 p-2 mb-4">
			{tabsOption.map((tab, i) => (
				<button
					key={i}
					onClick={() => setActiveTab(tab?.id)}
					className={`px-4 py-2 text-sm rounded-md transition-colors ${
						activeTab === tab?.id
							? "bg-card border border-border font-medium text-foreground shadow-sm"
							: "text-muted-foreground hover:bg-muted"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};
