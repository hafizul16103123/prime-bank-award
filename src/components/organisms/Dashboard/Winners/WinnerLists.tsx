"use client";
import { ReusableTable } from "@/components/molecules";
import { TableRow } from "@/components/ui/table";
import { useState } from "react";
import { StudentRegistrationSheet } from "../../common";
import type { Registration } from "./winner.types";
import { WinnerTableRow } from "./WinnerTableRow";

export type { Registration } from "./winner.types";

const registrationTableHeader = ["Student", "Phone", "School", "ID", "Level", "Submitted", "Status", "Actions"];

const mockData: Registration[] = [
	{
		id: "1",
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "YET_TO_AWARD",
	},
	{
		id: "2",
		student: "Zayan Hossain",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "YET_TO_AWARD",
	},
	{
		id: "3",
		student: "Misha Akter",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "YET_TO_AWARD",
	},
	{
		id: "4",
		student: "Priya Sen",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "YET_TO_AWARD",
	},
	{
		id: "5",
		student: "Tanvir Ahmed",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "YET_TO_AWARD",
	},
	{
		id: "6",
		student: "Sadia Islam",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "AWARDED",
	},
	{
		id: "7",
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "AWARDED",
	},
	{
		id: "8",
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "AWARDED",
	},
	{
		id: "9",
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "A-Level",
		submitted: "12 April 2026",
		status: "AWARDED",
	},
	{
		id: "10",
		student: "Shahriar Rahman",
		phone: "01929459195",
		school: "Green Hill High",
		studentId: "32116464",
		level: "O-Level",
		submitted: "12 April 2026",
		status: "AWARDED",
	},
];
type Props = {
	data?: Registration[];
	emptyMessage?: string;
	isLoading?: boolean;
};

export const WinnerLists = ({ data = mockData, emptyMessage, isLoading = false }: Props) => {
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
						<WinnerTableRow row={row} setSelectedStudent={setSelectedStudent} />
					</TableRow>
				))}
			</ReusableTable>
		</div>
	);
};
