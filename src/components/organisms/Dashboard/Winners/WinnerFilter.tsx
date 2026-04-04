import { formatStatus } from "@/utils/helpers/format.helpers";

export const WinnerFilter = ({
	tabs,
	activeTab,
	setActiveTab,
}: {
	tabs: (string | { label: string; count: number })[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
}) => {
	return (
		<div className="inline-flex w-fit max-w-full flex-wrap items-center gap-1 rounded-md bg-tartiary/50 p-2 mb-4">
			{tabs.map((tab) => {
				const label = typeof tab === "string" ? tab : tab.label;
				const count = typeof tab === "object" ? tab.count : null;
				return (
					<button
						key={label}
						onClick={() => setActiveTab(label)}
						className={`px-4 py-2 text-sm rounded-md transition-colors ${
							activeTab === label
								? "bg-card border border-border font-medium text-foreground shadow-sm"
								: "text-muted-foreground hover:bg-muted"
						}`}
					>
						{formatStatus(label)}
						{count !== null && (
							<span className="ml-1.5 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded-full">
								{count}
							</span>
						)}
					</button>
				);
			})}

			<span className="bg-tartiary p-1 text-[#71717A] rounded-full text-sm">10</span>
		</div>
	);
};
