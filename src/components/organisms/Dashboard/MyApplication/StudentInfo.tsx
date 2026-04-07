"use client";

import { Button } from "@/components/ui";
import { AdminStudentListItem } from "@/libes/interface/registration";
import { CircleCheck, Edit, User } from "lucide-react";
import { useState } from "react";
import { StudentRegistrationSheet } from "../../common";

export const StudentInfo = ({
	data,
	updateData,
}: {
	data: AdminStudentListItem | null;
	updateData: () => Promise<void>;
}) => {
	const [selectedStudent, setSelectedStudent] = useState<AdminStudentListItem | null>(data);
	return (
		<div className="flex flex-col gap-4 rounded-lg border border-tartiary bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex min-w-0 flex-1 items-center gap-4">
				<div className="size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-[136px]">
					{data?.photoUrl ? (
						<img src={data?.photoUrl} alt="Student" className="size-full object-cover" />
					) : (
						<User className="size-full" />
					)}
				</div>

				<div className="min-w-0">
					<p className="mt-1 truncate text-lg font-medium sm:text-xl">{data?.name}</p>
					<p className="truncate text-sm text-black/60">{data?.phoneNumber}</p>
					<p className="truncate text-sm text-black/60">{data?.applyingForLevel}</p>
					<p className="truncate text-sm text-black/60">{data?.school}</p>

					<div className="mt-2 inline-flex w-max max-w-full items-center gap-2 rounded-full bg-[#DFFABC] px-4 py-2 text-[#0A6700]">
						<CircleCheck size={18} />
						<span className="text-sm">Eligible for Award</span>
					</div>
				</div>
			</div>

			<Button
				onClick={() => setSelectedStudent(data)}
				type="button"
				variant="outline"
				size="lg"
				className="w-full gap-1.5 bg-frost sm:w-auto"
			>
				<Edit className="size-3.5" />
				Edit Information
			</Button>

			{selectedStudent && (
				<StudentRegistrationSheet
					student={selectedStudent}
					updateData={updateData}
					onOpenChange={(next) => {
						if (!next) setSelectedStudent(null);
					}}
				/>
			)}
		</div>
	);
};
