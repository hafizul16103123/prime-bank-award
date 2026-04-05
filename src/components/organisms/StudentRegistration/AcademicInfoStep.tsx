import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

interface AcademicInfoStepProps {
	onNext: () => void;
	onBack: () => void;
}

const subjectOptions = [
	"Mathematics (D2/Compulsory)",
	"Physics",
	"Chemistry",
	"Biology",
	"Computer Science",
	"Economics",
	"Business Studies",
	"English Language",
	"Bangla",
];

const gradeOptions = ["A*", "A", "B", "C", "D", "E", "F", "U"];

export const AcademicInfoStep = ({ onNext, onBack }: AcademicInfoStepProps) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<StudentRegistrationFormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "subjects",
	});

	const addSubject = () => {
		append({ subject: "", grade: "", paperCode: "" });
	};

	const removeSubject = (index: number) => {
		if (fields.length > 1) remove(index);
	};

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Academic Information</h2>
				<p className="mb-6 text-sm text-muted-foreground">Enter your Academic Information.</p>

				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<Label>Applying for Level</Label>
						<Controller
							name="applyingLevel"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger className="w-full min-w-0" aria-invalid={!!errors.applyingLevel}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="o-level">O Level</SelectItem>
										<SelectItem value="a-level">A Level</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.applyingLevel && (
							<p className="text-xs text-destructive">{errors.applyingLevel.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Year of Examination</Label>
						<Controller
							name="yearOfExamination"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger className="w-full min-w-0" aria-invalid={!!errors.yearOfExamination}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="2025">2025</SelectItem>
										<SelectItem value="2024">2024</SelectItem>
										<SelectItem value="2023">2023</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.yearOfExamination && (
							<p className="text-xs text-destructive">{errors.yearOfExamination.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Study Group</Label>
						<Controller
							name="studyGroup"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger className="w-full min-w-0" aria-invalid={!!errors.studyGroup}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="science">Science</SelectItem>
										<SelectItem value="commerce">Commerce</SelectItem>
										<SelectItem value="arts">Arts</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.studyGroup && <p className="text-xs text-destructive">{errors.studyGroup.message}</p>}
					</div>
					<div className="space-y-2">
						<Label>Session</Label>
						<Controller
							name="session"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger className="w-full min-w-0" aria-invalid={!!errors.session}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="may-june">May/June</SelectItem>
										<SelectItem value="oct-nov">Oct/Nov</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.session && <p className="text-xs text-destructive">{errors.session.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="rollNumber">Roll Number</Label>
						<Input
							id="rollNumber"
							placeholder="0000000000"
							aria-invalid={!!errors.rollNumber}
							{...register("rollNumber")}
						/>
						{errors.rollNumber && <p className="text-xs text-destructive">{errors.rollNumber.message}</p>}
					</div>
					<div className="space-y-2">
						<Label>Examination Board</Label>
						<Controller
							name="examinationBoard"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger className="w-full min-w-0" aria-invalid={!!errors.examinationBoard}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="cambridge">Cambridge (CIE)</SelectItem>
										<SelectItem value="edexcel">Edexcel</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.examinationBoard && (
							<p className="text-xs text-destructive">{errors.examinationBoard.message}</p>
						)}
					</div>
					<div className="space-y-2 sm:col-span-2">
						<Label htmlFor="schoolName">School Name</Label>
						<Input
							id="schoolName"
							placeholder="Search school..."
							aria-invalid={!!errors.schoolName}
							{...register("schoolName")}
						/>
						{errors.schoolName && <p className="text-xs text-destructive">{errors.schoolName.message}</p>}
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

					{fields.map((row, index) => (
						<div key={row.id} className="grid grid-cols-[1fr_100px_100px_40px] gap-3">
							<div className="space-y-1">
								<Controller
									name={`subjects.${index}.subject`}
									control={control}
									render={({ field }) => (
										<Select
											value={field.value ? field.value : null}
											onValueChange={(v) => field.onChange(v ?? "")}
										>
											<SelectTrigger
												className="w-full min-w-0"
												aria-invalid={!!errors.subjects?.[index]?.subject}
											>
												<SelectValue placeholder="Select subject" />
											</SelectTrigger>
											<SelectContent>
												{subjectOptions.map((s) => (
													<SelectItem key={s} value={s}>
														{s}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{errors.subjects?.[index]?.subject && (
									<p className="text-xs text-destructive">{errors.subjects[index]?.subject?.message}</p>
								)}
							</div>
							<div className="space-y-1">
								<Controller
									name={`subjects.${index}.grade`}
									control={control}
									render={({ field }) => (
										<Select
											value={field.value ? field.value : null}
											onValueChange={(v) => field.onChange(v ?? "")}
										>
											<SelectTrigger
												className="w-full min-w-0"
												aria-invalid={!!errors.subjects?.[index]?.grade}
											>
												<SelectValue placeholder="—" />
											</SelectTrigger>
											<SelectContent>
												{gradeOptions.map((g) => (
													<SelectItem key={g} value={g}>
														{g}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{errors.subjects?.[index]?.grade && (
									<p className="text-xs text-destructive">{errors.subjects[index]?.grade?.message}</p>
								)}
							</div>
							<Input
								placeholder="Code"
								aria-invalid={!!errors.subjects?.[index]?.paperCode}
								{...register(`subjects.${index}.paperCode`)}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-destructive"
								onClick={() => removeSubject(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>

				<Button
					type="button"
					variant="outline"
					className="mt-4 gap-2 border-accent text-accent hover:bg-accent/10"
					onClick={addSubject}
				>
					<Plus className="h-4 w-4" /> Add Subject
				</Button>
			</div>

			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
				<Button type="button" onClick={onNext} size="lg" className="gap-2">
					Next: Confirm & Submit <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
