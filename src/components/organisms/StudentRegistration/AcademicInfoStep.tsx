import { FormInputField } from "@/components/molecules/FormInputField";
import { type FormSelectOption, FormSelectField } from "@/components/molecules/FormSelectField";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { Trash2 } from "lucide-react";
import type { FieldArrayWithId } from "react-hook-form";
import { useFormContext } from "react-hook-form";

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
}

export const AcademicInfoStep = ({ subjectFields, onRemoveSubject }: AcademicInfoStepProps) => {
	const { control, formState } = useFormContext<StudentRegistrationFormValues>();
	const { errors } = formState;

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Academic Information</h2>
				<p className="mb-6 text-sm text-muted-foreground">Enter your Academic Information.</p>

				<div className="grid gap-5 sm:grid-cols-2">
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
					<FormSelectField control={control} name="studyGroup" label="Study Group" options={studyGroupOptions} />
					<FormSelectField control={control} name="session" label="Session" options={sessionOptions} />
					<FormInputField
						control={control}
						name="rollNumber"
						label="Roll Number"
						placeholder="0000000000"
					/>
					<FormSelectField
						control={control}
						name="examinationBoard"
						label="Examination Board"
						options={boardOptions}
					/>
					<div className="sm:col-span-2">
						<FormInputField
							control={control}
							name="schoolName"
							label="School Name"
							placeholder="Search school..."
						/>
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">O-Level Subjects – Marksheet</h2>
				<p className="mb-4 text-sm text-muted-foreground">
					Enter your examination results. Add each subject and the corresponding grade.
				</p>

				{errors.subjects && !Array.isArray(errors.subjects) && (
					<p className="mb-3 text-xs text-destructive">{errors.subjects.message}</p>
				)}

				<div className="space-y-3">
					<div className="grid grid-cols-[1fr_100px_100px_40px] gap-3 text-xs font-semibold text-muted-foreground">
						<span>Subject</span>
						<span>Grade</span>
						<span>Paper Code</span>
						<span />
					</div>

					{subjectFields.map((row, index) => (
						<div key={row.id} className="grid grid-cols-[1fr_100px_100px_40px] gap-3">
							<FormSelectField
								control={control}
								name={`subjects.${index}.subject`}
								placeholder="Select subject"
								options={subjectOptions}
								className="space-y-1"
							/>
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
							<button
								type="button"
								disabled={subjectFields.length <= 1}
								className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-destructive focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
								aria-label="Remove subject row"
								onClick={() => onRemoveSubject(index)}
							>
								<Trash2 className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
