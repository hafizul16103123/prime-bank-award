"use client";

import { StatCard } from "@/components/molecules";
import { WinnerFilter, WinnerLists } from "@/components/organisms/Dashboard/Winners";
import { CheckCircle2, PenLine, RefreshCw } from "lucide-react";
import { useState } from "react";

export const WinnersUnit = () => {
	const [activeTab, setActiveTab] = useState("All");
	return (
		<section>
			<div className="mb-6 flex gap-4">
				<StatCard title="Total Approved" value="2,412" change="↑ 18% vs 2024" icon={PenLine} />
				<StatCard title="Yet to Award" value="602" change="+180.1% from last month" icon={RefreshCw} />
				<StatCard title="Awarded" value="1,517" change="+19% from last month" icon={CheckCircle2} />
			</div>

			<WinnerFilter activeTab={activeTab} setActiveTab={setActiveTab} tabs={["All", "Yet_to_Award", "Awarded"]} />

			<div className="rounded-lg border border-border bg-card  shadow-sm">
				<WinnerLists />
			</div>
		</section>
	);
};
