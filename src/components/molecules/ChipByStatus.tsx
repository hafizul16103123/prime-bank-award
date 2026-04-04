import { FC } from "react";
import { Text } from "../atoms";

export type IStatus = "Pending" | "Active" | "Approved" | "Completed" | "Denied" | "Upcoming" | "Ongoing" | "Blocked";

interface PropsType {
	status: IStatus;
	label: string;
}

export const ChipByStatus: FC<PropsType> = ({ status, label }) => {
	const colorByStatus: Record<IStatus, string> = {
		Completed: "bg-[#00719A]",
		Active: "bg-[#00719A]",
		Ongoing: "bg-[#00719A]",
		Pending: "bg-[#DEF300]",
		Denied: "bg-[#FF4141]",
		Blocked: "bg-[#FF4141]",
		Approved: "bg-[#2FB772]",
		Upcoming: "bg-[#DEF300]",
	};

	const textByStatus: Record<IStatus, string> = {
		Completed: "text-white",
		Active: "text-white",
		Ongoing: "text-white",
		Denied: "text-white",
		Blocked: "text-white",
		Approved: "text-white",
		Pending: "text-black",
		Upcoming: "text-black",
	};

	return (
		<div className="flex-row items-center gap-2 ">
			<div
				className={`inline-block rounded-[6px] hover:shadow-none shadow-none normal-case ${colorByStatus[status]} ${textByStatus[status]} px-4 py-1 text-[10px] rounded-full`}
			>
				<Text className={`${textByStatus[status]}`} variant="footnote">
					{label}
				</Text>
			</div>
		</div>
	);
};
