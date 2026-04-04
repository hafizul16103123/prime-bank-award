import { StatCard } from "@/components/molecules";
import { CheckCircle2, PenLine, RefreshCw, XCircle } from "lucide-react";

export const RegistrationUnit = () => {
	return (
		<div>
			<div className="flex gap-4 mb-6">
				<StatCard title="Total Registrations" value="2,412" change="↑ 18% vs 2024" icon={PenLine} />
				<StatCard title="Pending Approvals" value="602" change="+180.1% from last month" icon={RefreshCw} />
				<StatCard title="Approved" value="1,517" change="+19% from last month" icon={CheckCircle2} />
				<StatCard title="Declined" value="1,517" change="+19% from last month" icon={XCircle} />
			</div>
		</div>
	);
};
