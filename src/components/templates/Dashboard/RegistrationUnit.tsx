"use client";

import { StatCard } from "@/components/molecules";
import { RegistrationFilter, RegistrationLists } from "@/components/organisms";
import { useApiClient } from "@/libes/hooks";
import { AdminStudentStatsData } from "@/libes/interface/registration";
import { CheckCircle2, PenLine, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const RegistrationUnit = () => {
	const [activeTab, setActiveTab] = useState("All");
	const [stats, setStats] = useState<AdminStudentStatsData | null>(null);
	const { get } = useApiClient();

	const getStudentStats = async () => {
		try {
			const { data, status } = await get("API_URL", "admin/student-stats");
			if (status === 200) {
				setStats(data?.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getStudentStats();
	}, []);

	return (
		<section>
			<div className="mb-6 flex flex-wrap gap-4">
				<StatCard title="Total Registrations" value={stats?.total.toLocaleString()} icon={PenLine} />
				<StatCard title="Pending Approvals" value={stats?.Pending.toLocaleString()} icon={RefreshCw} />
				<StatCard title="Approved" value={stats?.Approved.toLocaleString()} icon={CheckCircle2} />
				<StatCard title="Declined" value={stats?.Declined.toLocaleString()} icon={XCircle} />
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
