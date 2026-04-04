import { FC } from "react";
import { Text } from "../atoms";

interface StatCardProps {
	title: string;
	value: string | number;
	period: string;
	isDark?: boolean;
}

export const StatCard: FC<StatCardProps> = ({ title, value, period, isDark = false }) => {
	return (
		<div className={`rounded-xl p-5 ${isDark ? "bg-primary " : "bg-white "}`}>
			<Text variant="lg" color={isDark ? "white" : "primary"}>
				{title}
			</Text>

			<div className="flex items-end justify-between mt-[128px]">
				<Text variant="3xl" color={isDark ? "white" : "primary"} weight="semibold">
					{value}
				</Text>
			</div>
		</div>
	);
};
