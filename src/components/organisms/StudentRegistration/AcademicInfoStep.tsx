"use client";

import { CardSectionHeader } from "@/components/molecules/CardSectionHeader";
import { FormInputField } from "@/components/molecules/FormInputField";
import { type FormSelectOption, FormSelectField } from "@/components/molecules/FormSelectField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { useApiClient } from "@/libes/hooks";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

const subjectOptions: FormSelectOption[] = [
	"Mathematics (D2/Compulsory)",
	"Physics",
	"Chemistry",
	"Biology",
	"Computer Science",
	"Economics",
	"Business Studies",
	"English Language",
	"Bangla",
].map((s) => ({ value: s, label: s }));

const gradeOptions: FormSelectOption[] = ["A*", "A", "B", "C", "D", "E", "F", "U"].map((g) => ({
	value: g,
	label: g,
}));

const levelOptions: FormSelectOption[] = [
	{ value: "O Level", label: "O Level" },
	{ value: "A Level", label: "A Level" },
];

function marksheetSectionTitle(level: string | undefined): string {
	if (level === "A Level") return "A-Level Subjects – Marksheet";
	if (level === "O Level") return "O-Level Subjects – Marksheet";
	return "Subjects – Marksheet";
}

const studyGroupOptions: FormSelectOption[] = [
	{ value: "Science", label: "Science" },
	{ value: "Commerce", label: "Commerce" },
	{ value: "Arts", label: "Arts" },
];

const sessionOptions: FormSelectOption[] = [
	{ value: "May/June", label: "May/June" },
	{ value: "Oct/Nov", label: "Oct/Nov" },
];

const boardOptions: FormSelectOption[] = [
	{ value: "Cambridge(CIE)", label: "Cambridge (CIE)" },
	{ value: "Edexcel", label: "Edexcel" },
	{ value: "Pearson", label: "Pearson" },
];

const emptySubjectRow = () => ({ name: "", grade: "", paperCode: "" });

export const AcademicInfoStep = () => {
	const { get } = useApiClient();
	const [schoolsOption, setSchoolsOption] = useState([]);

	const { control, formState } = useFormContext<StudentRegistrationFormValues>();
	const { errors } = formState;
	const applyingForLevel = useWatch({ control, name: "applyingForLevel" });

	const oLevelFA = useFieldArray({ control, name: "oLevelSubjects" });
	const aLevelFA = useFieldArray({ control, name: "aLevelSubjects" });

	const isO = applyingForLevel === "O Level";
	const subjectFields = isO ? oLevelFA.fields : aLevelFA.fields;
	const subjectPath = (isO ? "oLevelSubjects" : "aLevelSubjects") as "oLevelSubjects" | "aLevelSubjects";

	const onRemoveSubject = (index: number) => {
		if (isO) {
			if (oLevelFA.fields.length > 1) oLevelFA.remove(index);
		} else if (aLevelFA.fields.length > 1) {
			aLevelFA.remove(index);
		}
	};

	const onAddSubject = () => {
		if (isO) oLevelFA.append(emptySubjectRow());
		else aLevelFA.append(emptySubjectRow());
	};

	const subjectsError =
		isO && errors.oLevelSubjects && !Array.isArray(errors.oLevelSubjects)
			? errors.oLevelSubjects.message
			: !isO && errors.aLevelSubjects && !Array.isArray(errors.aLevelSubjects)
				? errors.aLevelSubjects.message
				: undefined;

	const getSchoolOptions = async () => {
		try {
			const { data, status } = await get("API_URL", "schools");
			if (status === 200) {
				const options = (data?.data ?? []).map((s: { name: string }) => ({ value: s.name, label: s.name }));

				setSchoolsOption(options);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getSchoolOptions();
	}, []);

	return (
		<div className="space-y-5 sm:space-y-6 md:space-y-6 lg:space-y-6 xl:space-y-6">
			<div>
				<CardSectionHeader title="Academic Information" description="Enter your Academic Information." />

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5">
					<FormSelectField
						control={control}
						name="applyingForLevel"
						label="Applying for Level"
						options={levelOptions}
					/>
					<FormInputField
						control={control}
						name="yearOfExamination"
						label="Year of Examination"
						placeholder="2025"
					/>

					<FormSelectField
						control={control}
						name="studyGroup"
						label="Study Group"
						options={studyGroupOptions}
					/>
					<FormSelectField
						control={control}
						name="examinationSession"
						label="Session"
						options={sessionOptions}
					/>
					<FormInputField control={control} name="rollNumber" label="Roll Number" placeholder="0000000000" />
					<FormSelectField
						control={control}
						name="examinationBoard"
						label="Examination Board"
						options={boardOptions}
					/>
				</div>
				<div className="mt-4">
					<FormSelectField control={control} name="school" label="School Name" options={schoolsOption} />
				</div>
			</div>

			<div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6 lg:p-6 xl:p-6">
				<CardSectionHeader
					title={marksheetSectionTitle(applyingForLevel)}
					description="Enter your examination results. Add each subject and the corresponding grade."
				/>

				{subjectsError ? <p className="mb-3 text-xs text-destructive">{subjectsError}</p> : null}

				<div className="space-y-3 md:space-y-3">
					<div className="hidden text-sm font-medium text-muted-foreground md:grid md:grid-cols-[1fr_100px_100px_40px] md:gap-3 md:rounded-[50px] md:bg-subtle md:p-[10px]">
						<span>Subject</span>
						<span>Grade</span>
						<span>Paper Code</span>
						<span />
					</div>

					{subjectFields.map((row, index) => (
						<div
							key={row.id}
							className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_100px_100px_40px] md:items-end md:gap-3"
						>
							<FormSelectField
								control={control}
								name={`${subjectPath}.${index}.name`}
								placeholder="Select subject"
								options={subjectOptions}
								className="space-y-1"
							/>
							<div className="grid grid-cols-2 gap-3 md:contents">
								<FormSelectField
									control={control}
									name={`${subjectPath}.${index}.grade`}
									placeholder="—"
									options={gradeOptions}
									className="space-y-1"
								/>
								<FormInputField
									control={control}
									name={`${subjectPath}.${index}.paperCode`}
									placeholder="Code"
									className="space-y-1"
								/>
							</div>
							<button
								type="button"
								disabled={subjectFields.length <= 1}
								className={cn(
									"inline-flex size-9 shrink-0 items-center justify-center justify-self-end rounded-lg text-muted-foreground outline-none transition-colors",
									"hover:bg-muted hover:text-destructive focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
									"disabled:pointer-events-none disabled:opacity-40 md:size-8 md:justify-self-auto",
								)}
								aria-label="Remove subject row"
								onClick={() => onRemoveSubject(index)}
							>
								<Trash2 className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>

				<Button
					type="button"
					variant="outline"
					className="mt-4 w-full gap-2 border border-[#002E66] bg-frost py-[10px] text-sm font-medium sm:w-auto sm:px-[22px]"
					onClick={onAddSubject}
				>
					<Plus className="h-4 w-4" /> Add Subject
				</Button>
			</div>
		</div>
	);
};
