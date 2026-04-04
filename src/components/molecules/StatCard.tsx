import { LucideIcon } from "lucide-react";

interface StatCardProps {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
}

export const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
	return (
		<div className="bg-white border border-tartiary rounded-xl p-5 flex-1 max-w-[281px]">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm text-muted-foreground">{title}</span>
				<Icon className="w-4 h-4 text-muted-foreground" />
			</div>
			<p className="text-2xl font-semibold text-foreground">{value}</p>
			<p className="text-xs text-primary/80 mt-1">{change}</p>
		</div>
	);
};
