"use client";

import { StatCard } from "@/components/molecules";
import { RegistrationFilter, RegistrationLists } from "@/components/organisms";
import { CheckCircle2, PenLine, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";

export const RegistrationUnit = () => {
	const [activeTab, setActiveTab] = useState("All");
	return (
		<section>
			<div className="mb-6 flex gap-4">
				<StatCard title="Total Registrations" value="2,412" change="↑ 18% vs 2024" icon={PenLine} />
				<StatCard title="Pending Approvals" value="602" change="+180.1% from last month" icon={RefreshCw} />
				<StatCard title="Approved" value="1,517" change="+19% from last month" icon={CheckCircle2} />
				<StatCard title="Declined" value="1,517" change="+19% from last month" icon={XCircle} />
			</div>

			<RegistrationFilter
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={["All", "Pending", "Approved", "Declined"]}
			/>

			<div className="rounded-lg border border-border bg-card  shadow-sm">
				<RegistrationLists />
			</div>
		</section>
	);
};
