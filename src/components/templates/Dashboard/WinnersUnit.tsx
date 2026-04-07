"use client";

import { QueryTabOption, StatCard } from "@/components/molecules";
import { WinnerLists } from "@/components/organisms/Dashboard/Winners";
import { useApiClient } from "@/libes/hooks";
import { AdminStudentStatsData, IRegistrationLists } from "@/libes/interface/registration";
import { updateURLSearchParams } from "@/utils/helpers/url.helpers";
import { CheckCircle2, PenLine, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const WinnersUnit = () => {
	const [stats, setStats] = useState<AdminStudentStatsData | null>(null);
	const [registrations, setRegistrations] = useState<IRegistrationLists | null>(null);

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
				setRegistrations(data?.data);
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
			<div className="mb-6 flex gap-4">
				<StatCard title="Total Approved" value="2,412" change="↑ 18% vs 2024" icon={PenLine} />
				<StatCard title="Yet to Award" value="602" change="+180.1% from last month" icon={RefreshCw} />
				<StatCard title="Awarded" value="1,517" change="+19% from last month" icon={CheckCircle2} />
			</div>

			<QueryTabOption
				filterKey="status"
				tabsOption={[
					{ label: "All", id: "All" },
					{ label: "Yet to Award", id: "Approved" },
					{ label: "Awarded", id: "Awarded" },
				]}
			/>

			<div className="rounded-lg border border-border bg-card  shadow-sm">
				<WinnerLists data={registrations as IRegistrationLists} updateData={getStudentsList} />
			</div>
		</section>
	);
};
