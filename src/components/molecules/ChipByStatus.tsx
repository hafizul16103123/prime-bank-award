import { FC } from "react";

export type IStatus = "Pending" | "YET_TO_AWARD" | "AWARDED" | "Approved" | "Declined";

interface PropsType {
	status: IStatus;
	label: string;
}

export const ChipByStatus: FC<PropsType> = ({ status, label }) => {
	const colorByStatus: Record<IStatus, string> = {
		Pending: "!bg-[#FAF0BC]",
		YET_TO_AWARD: "!bg-[#FAF0BC]",
		AWARDED: "!bg-subtle",
		Approved: "!bg-[#DCFCE7]",
		Declined: "!bg-[#FEE2E2]",
	};

	const textByStatus: Record<IStatus, string> = {
		Pending: "!text-[#675E00]",
		YET_TO_AWARD: "!text-[#675E00]",
		AWARDED: "!text-primary",
		Approved: "!text-[#166534]",
		Declined: "!text-[#991B1B]",
	};

	return (
		<div className="flex-row items-center gap-2 ">
			<div
				className={`inline-block rounded-[6px] hover:shadow-none shadow-none normal-case ${colorByStatus[status]} ${textByStatus[status]} px-4 py-1 text-[10px] rounded-full`}
			>
				<p className={`${textByStatus[status]} text-xs`}>{label}</p>
			</div>
		</div>
	);
};
