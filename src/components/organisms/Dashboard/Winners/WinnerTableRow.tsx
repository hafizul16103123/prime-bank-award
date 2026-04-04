import { ChipByStatus, IStatus } from "@/components/molecules";
import { TableCell } from "@/components/ui/table";
import { formatStatus } from "@/utils/helpers/format.helpers";
import { Eye } from "lucide-react";
import type { Registration } from "./winner.types";

export const WinnerTableRow = ({
	row,
	setSelectedStudent,
}: {
	row: Registration;
	setSelectedStudent: (student: Registration) => void;
}) => {
	return (
		<>
			<TableCell>{row.student}</TableCell>
			<TableCell>{row.phone}</TableCell>
			<TableCell>{row.school}</TableCell>
			<TableCell>{row.studentId}</TableCell>
			<TableCell>{row.level}</TableCell>
			<TableCell>{row.submitted}</TableCell>
			<TableCell className="whitespace-normal">
				<ChipByStatus status={row.status as IStatus} label={formatStatus(row.status)} />
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<button onClick={() => setSelectedStudent(row)} className="bg-subtle px-3 py-1 rounded-md">
						<Eye className="w-4 h-4" color="#212121" />
					</button>
					<button className="bg-subtle px-3 py-1 rounded-md">
						<Eye className="w-4 h-4" color="#212121" />
					</button>
				</div>
			</TableCell>
		</>
	);
};
