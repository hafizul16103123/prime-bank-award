"use client";
import { ReusableTable } from "@/components/molecules";
import { TableRow } from "@/components/ui/table";
import { AdminStudentListItem, IRegistrationLists } from "@/libes/interface/registration";
import { useState } from "react";
import { StudentRegistrationSheet } from "../../common";
import { RegistrationTableRow } from "./RegistrationTableRow";

const registrationTableHeader = ["Student", "Phone", "School", "ID", "Level", "Submitted", "Status", "Actions"];

type Props = {
	data: IRegistrationLists;
	emptyMessage?: string;
	isLoading?: boolean;
	updateData: () => Promise<void>;
};

export const RegistrationLists = ({ data, emptyMessage, isLoading = false, updateData }: Props) => {
	const [selectedStudent, setSelectedStudent] = useState<AdminStudentListItem | null>(null);

	return (
		<div>
			<StudentRegistrationSheet
				student={selectedStudent}
				updateData={updateData}
				onOpenChange={(next) => {
					if (!next) setSelectedStudent(null);
				}}
			/>
			<ReusableTable
				variant="default"
				tableHeader={registrationTableHeader}
				data={data?.items}
				isLoading={isLoading}
				emptyMessage={emptyMessage ?? "No registrations yet."}
			>
				{data?.items.map((row) => (
					<TableRow key={row.id}>
						<RegistrationTableRow row={row} setSelectedStudent={setSelectedStudent} />
					</TableRow>
				))}
			</ReusableTable>
		</div>
	);
};
