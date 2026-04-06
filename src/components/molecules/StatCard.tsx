import { LucideIcon } from "lucide-react";

interface StatCardProps {
	title?: string;
	value?: string;
	change?: string;
	icon: LucideIcon;
}

export const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
	return (
		<div className="max-w-[281px] flex-1 rounded-xl border border-tartiary bg-white p-5">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm text-muted-foreground">{title}</span>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</div>
			<p className="text-2xl font-semibold text-foreground">{value}</p>
			{change ? <p className="mt-1 text-xs text-primary/80">{change}</p> : null}
		</div>
	);
};
