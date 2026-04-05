import { CardSectionHeader } from "@/components/molecules/CardSectionHeader";
import { FormInputField } from "@/components/molecules/FormInputField";
import { type FormSelectOption, FormSelectField } from "@/components/molecules/FormSelectField";
import { Button } from "@/components/ui/button";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { Plus, Trash2 } from "lucide-react";
import type { FieldArrayWithId } from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";

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
	{ value: "o-level", label: "O Level" },
	{ value: "a-level", label: "A Level" },
];

function marksheetSectionTitle(level: string | undefined): string {
	if (level === "a-level") return "A-Level Subjects – Marksheet";
	if (level === "o-level") return "O-Level Subjects – Marksheet";
	return "Subjects – Marksheet";
}

const yearOptions: FormSelectOption[] = ["2025", "2024", "2023"].map((y) => ({
	value: y,
	label: y,
}));

const studyGroupOptions: FormSelectOption[] = [
	{ value: "science", label: "Science" },
	{ value: "commerce", label: "Commerce" },
	{ value: "arts", label: "Arts" },
];

const sessionOptions: FormSelectOption[] = [
	{ value: "may-june", label: "May/June" },
	{ value: "oct-nov", label: "Oct/Nov" },
];

const boardOptions: FormSelectOption[] = [
	{ value: "cambridge", label: "Cambridge (CIE)" },
	{ value: "edexcel", label: "Edexcel" },
];

export interface AcademicInfoStepProps {
	subjectFields: FieldArrayWithId<StudentRegistrationFormValues, "subjects">[];
	onRemoveSubject: (index: number) => void;
	onAddSubject: () => void;
}

export const AcademicInfoStep = ({ subjectFields, onRemoveSubject, onAddSubject }: AcademicInfoStepProps) => {
	const { control, formState } = useFormContext<StudentRegistrationFormValues>();
	const { errors } = formState;
	const applyingLevel = useWatch({ control, name: "applyingLevel" });

	return (
		<div className="space-y-5 sm:space-y-6 md:space-y-6 lg:space-y-6 xl:space-y-6">
			<div>
				<CardSectionHeader title="Academic Information" description="Enter your Academic Information." />

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5">
					<FormSelectField
						control={control}
						name="applyingLevel"
						label="Applying for Level"
						options={levelOptions}
					/>
					<FormSelectField
						control={control}
						name="yearOfExamination"
						label="Year of Examination"
						options={yearOptions}
					/>
					<FormSelectField
						control={control}
						name="studyGroup"
						label="Study Group"
						options={studyGroupOptions}
					/>
					<FormSelectField control={control} name="session" label="Session" options={sessionOptions} />
					<FormInputField control={control} name="rollNumber" label="Roll Number" placeholder="0000000000" />
					<FormSelectField
						control={control}
						name="examinationBoard"
						label="Examination Board"
						options={boardOptions}
					/>
				</div>
				<FormInputField
					control={control}
					name="schoolName"
					label="School Name"
					placeholder="Search school..."
				/>
			</div>

			<div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 md:p-6 lg:p-6 xl:p-6">
				<CardSectionHeader
					title={marksheetSectionTitle(applyingLevel)}
					description="Enter your examination results. Add each subject and the corresponding grade."
				/>

				{errors.subjects && !Array.isArray(errors.subjects) && (
					<p className="mb-3 text-xs text-destructive">{errors.subjects.message}</p>
				)}

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
								name={`subjects.${index}.subject`}
								placeholder="Select subject"
								options={subjectOptions}
								className="space-y-1"
							/>
							<div className="grid grid-cols-2 gap-3 md:contents">
								<FormSelectField
									control={control}
									name={`subjects.${index}.grade`}
									placeholder="—"
									options={gradeOptions}
									className="space-y-1"
								/>
								<FormInputField
									control={control}
									name={`subjects.${index}.paperCode`}
									placeholder="Code"
									className="space-y-1"
								/>
							</div>
							<button
								type="button"
								disabled={subjectFields.length <= 1}
								className="inline-flex size-9 shrink-0 items-center justify-center justify-self-end rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-destructive focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 md:size-8 md:justify-self-auto"
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
