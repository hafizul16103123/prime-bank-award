import { ChipByStatus, IStatus } from "@/components/molecules";
import { TableCell } from "@/components/ui/table";
import { Eye, MessageSquare, X } from "lucide-react";
import type { Registration } from "./registration.types";

export const RegistrationTableRow = ({
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
				<ChipByStatus status={row.status as IStatus} label={row.status} />
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<button onClick={() => setSelectedStudent(row)} className="bg-subtle px-3 py-1 rounded-md">
						<Eye className="w-4 h-4" color="#212121" />
					</button>
					{row.status === "Pending" && (
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
