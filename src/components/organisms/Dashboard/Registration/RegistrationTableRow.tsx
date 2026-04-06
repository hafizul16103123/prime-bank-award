import { ChipByStatus, IStatus } from "@/components/molecules";
import { TableCell } from "@/components/ui/table";
import { AdminStudentListItem } from "@/libes/interface/registration";
import { Eye, MessageSquare, X } from "lucide-react";

export const RegistrationTableRow = ({
	row,
	setSelectedStudent,
}: {
	row: AdminStudentListItem;
	setSelectedStudent: (student: AdminStudentListItem) => void;
}) => {
	return (
		<>
			<TableCell>{row?.name}</TableCell>
			<TableCell>{row?.phoneNumber}</TableCell>
			<TableCell>{row?.school}</TableCell>
			<TableCell>{row?.rollNumber}</TableCell>
			<TableCell>{row?.applyingForLevel}</TableCell>
			<TableCell></TableCell>
			<TableCell className="whitespace-normal">
				<ChipByStatus status={row?.status as IStatus} label={row?.status} />
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<button onClick={() => setSelectedStudent(row)} className="bg-subtle px-3 py-1 rounded-md">
						<Eye className="w-4 h-4" color="#212121" />
					</button>
					{row?.status === "Pending" && (
						<>
							<button className="bg-subtle px-3 py-1 rounded-md">
								<MessageSquare className="w-4 h-4" color="#212121" />
							</button>
							<button className="bg-subtle px-3 py-1 rounded-md">
								<X className="w-4 h-4" color="#212121" />
							</button>
						</>
					)}
				</div>
			</TableCell>
		</>
	);
};
