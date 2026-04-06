"use client";

import { QueryTabOption, StatCard } from "@/components/molecules";
import { RegistrationLists } from "@/components/organisms";
import { useApiClient } from "@/libes/hooks";
import type { AdminStudentListItem, AdminStudentStatsData } from "@/libes/interface/registration";
import { updateURLSearchParams } from "@/utils/helpers/url.helpers";
import { CheckCircle2, PenLine, RefreshCw, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const RegistrationUnit = () => {
	const [stats, setStats] = useState<AdminStudentStatsData | null>(null);
	const [registrations, setRegistrations] = useState<AdminStudentListItem[]>([]);
	const { get } = useApiClient();
	const searchParams = useSearchParams();
	const query = Object.fromEntries(searchParams.entries());

	const { status } = query;

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

	const getStudentsList = async () => {
		if (status === "All") delete query?.status;
		let optionalParams: any = {};
		const params = updateURLSearchParams(query, optionalParams);
		try {
			const { data, status } = await get("API_URL", `admin/students?${params}`);
			if (status === 200) {
				setRegistrations(data?.data?.items);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getStudentsList();
	}, [status]);
	useEffect(() => {
		getStudentStats();
	}, []);

	return (
		<section>
			<div className="mb-6 flex flex-wrap gap-4">
				<StatCard title="Total Registrations" value={stats?.total?.toLocaleString() ?? "—"} icon={PenLine} />
				<StatCard title="Pending Approvals" value={stats?.Pending?.toLocaleString() ?? "—"} icon={RefreshCw} />
				<StatCard title="Approved" value={stats?.Approved?.toLocaleString() ?? "—"} icon={CheckCircle2} />
				<StatCard title="Declined" value={stats?.Declined?.toLocaleString() ?? "—"} icon={XCircle} />
			</div>

			<QueryTabOption
				filterKey="status"
				tabsOption={[
					{ label: "All", id: "All" },
					{ label: "Pending", id: "Pending" },
					{ label: "Approved", id: "Approved" },
					{ label: "Declined", id: "Declined" },
				]}
			/>

			<div className="rounded-lg border border-border bg-card  shadow-sm">
				<RegistrationLists data={registrations} updateData={getStudentsList} />
			</div>
		</section>
	);
};
