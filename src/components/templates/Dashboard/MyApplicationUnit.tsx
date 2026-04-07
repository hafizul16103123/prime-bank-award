"use client";

import { FormField } from "@/components/molecules";
import { StudentInfo, StudentMarksheet } from "@/components/organisms";
import { useApiClient } from "@/libes/hooks";
import { AdminStudentListItem } from "@/libes/interface/registration";
import dateFormat from "dateformat";
import Image from "next/image";
import { useEffect, useState } from "react";

export const MyApplicationUnit = () => {
	const [data, setData] = useState<AdminStudentListItem | null>(null);
	const { get } = useApiClient();

	const getStudentData = async () => {
		try {
			const { data, status } = await get("API_URL", `student/profile`);
			if (status === 200) {
				setData(data?.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getStudentData();
	}, []);
	return (
		<div className="space-y-4">
			<StudentInfo data={data} updateData={getStudentData} />

			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-8 ">
					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-lg border border-tartiary bg-white p-4">
							<h3 className="mb-4 text-sm font-semibold text-foreground">Personal Information</h3>
							<div className="space-y-3">
								<FormField label="Full Name" value={data?.name as string} />
								<div className="grid grid-cols-2 gap-3">
									<FormField label="Phone Number" value={data?.phoneNumber as string} />
									<FormField label="Gender" value={data?.gender as string} />
								</div>
								<FormField label="Email Address" value={data?.email as string} />
								<FormField
									label="Date of Birth"
									value={
										data?.dateOfBirth &&
										(dateFormat(new Date(data?.dateOfBirth), "mmmm d, yyyy") as any)
									}
								/>
							</div>
						</div>

						<div className="rounded-lg border border-tartiary bg-white p-4">
							<h3 className="mb-4 text-sm font-semibold text-foreground">Academic Information</h3>
							<div className="space-y-3">
								<FormField label="School Name" value={data?.school as string} />
								<div className="grid grid-cols-2 gap-3">
									<FormField label="Roll Number" value={data?.rollNumber as string} />
									<FormField label="Applying for Level" value={data?.applyingForLevel as string} />
								</div>
								<div className="grid grid-cols-2 gap-3">
									<FormField label="Year of Examination" value={data?.yearOfExamination as any} />
									<FormField label="Study Group" value={data?.studyGroup as string} />
								</div>
								<div className="grid grid-cols-2 gap-3">
									<FormField label="Session" value={data?.examinationSession as string} />
									<FormField label="Examination Board" value={data?.examinationBoard as string} />
								</div>
							</div>
						</div>
					</div>

					<Image
						src="/images/student_banner.png"
						alt=""
						width={500}
						height={500}
						className="w-full h-auto mt-4"
					/>
				</div>
				<div className="col-span-4">
					<StudentMarksheet data={data} />
				</div>
			</div>
		</div>
	);
};
