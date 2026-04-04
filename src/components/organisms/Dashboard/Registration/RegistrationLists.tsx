"use client";
import { ReusableTable } from "@/components/molecules";
import { TableRow } from "@/components/ui/table";
import { useState } from "react";
import { StudentRegistrationSheet } from "../../common";
import { RegistrationTableRow } from "./RegistrationTableRow";
import type { Registration } from "./registration.types";

export type { Registration } from "./registration.types";

const registrationTableHeader = ["Student", "Phone", "School", "ID", "Level", "Submitted", "Status", "Actions"];

const mockData: Registration[] = [
	{
		id: 1,
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "Pending",
	},
	{
		id: 2,
		student: "Zayan Hossain",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "Pending",
	},
	{
		id: 3,
		student: "Misha Akter",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "Pending",
	},
	{
		id: 4,
		student: "Priya Sen",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "Pending",
	},
	{
		id: 5,
		student: "Tanvir Ahmed",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "Pending",
	},
	{
		id: 6,
		student: "Sadia Islam",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "Approved",
	},
	{
		id: 7,
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "Declined",
	},
	{
		id: 8,
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "Approved",
	},
	{
		id: 9,
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "Approved",
	},
	{
		id: 10,
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "Declined",
	},
];
type Props = {
	data?: Registration[];
	emptyMessage?: string;
	isLoading?: boolean;
};

export const RegistrationLists = ({ data = mockData, emptyMessage, isLoading = false }: Props) => {
	const [selectedStudent, setSelectedStudent] = useState<Registration | null>(null);
	return (
		<div>
			<StudentRegistrationSheet
				student={selectedStudent}
				onOpenChange={(next) => {
					if (!next) setSelectedStudent(null);
				}}
			/>
			<ReusableTable
				variant="default"
				tableHeader={registrationTableHeader}
				data={data}
				isLoading={isLoading}
				emptyMessage={emptyMessage ?? "No registrations yet."}
			>
				{data.map((row) => (
					<TableRow key={row.id}>
						<RegistrationTableRow row={row} setSelectedStudent={setSelectedStudent} />
					</TableRow>
				))}
			</ReusableTable>
		</div>
	);
};
