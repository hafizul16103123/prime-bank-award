"use client";

import { ControlDatePicker, FormInputField, FormSelectField, type FormSelectOption } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { aLevelSubjectRows, GRADE_OPTIONS, oLevelSubjectRows } from "@/lib/marksheetData";
import { cn } from "@/lib/utils";
import {
	defaultValuesStudentForm,
	StudentRegistrationFormValues,
	studentRegistrationSchema,
} from "@/lib/validation/studentRegistrationSchema";
import { useApiClient } from "@/libes/hooks";
import type { AdminStudentListItem } from "@/libes/interface/registration";
import { boardOptions, genderOptions, levelOptions, sessionOptions, studyGroupOptions } from "@/utils/constant";
import { toastError, toastSuccess } from "@/utils/helpers/toast.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Trash2, Upload, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm, useWatch, type Resolver } from "react-hook-form";

const skipStudentKeysForForm = new Set(["id", "userId", "status", "createdAt", "updatedAt"]);

const emptySubjectRow = () => ({ name: "", grade: "", paperCode: "" });

type Props = {
	student: AdminStudentListItem | null;
	onOpenChange: (open: boolean) => void;
	updateData: () => Promise<void>;
};

export const StudentRegistrationSheet = ({ student, onOpenChange, updateData }: Props) => {
	const { data: session } = useSession();
	const role = session?.user?.role ?? null;

	const [schoolsOption, setSchoolsOption] = useState([]);

	const { post, get, patch, put, loading } = useApiClient();

	const methods = useForm<StudentRegistrationFormValues>({
		resolver: yupResolver(studentRegistrationSchema) as Resolver<StudentRegistrationFormValues>,
		defaultValues: defaultValuesStudentForm,
		mode: "onTouched",
		shouldFocusError: true,
	});

	const {
		handleSubmit,
		setValue,
		control,
		reset,
		formState: { errors },
	} = methods;
	console.log({ errors });

	const applyingForLevel = useWatch({ control, name: "applyingForLevel" });
	const showOMarksheet = applyingForLevel === "O Level";
	const showAMarksheet = applyingForLevel === "A Level";
	const open = student !== null;

	const oLevelFA = useFieldArray({ control, name: "oLevelSubjects" });
	const aLevelFA = useFieldArray({ control, name: "aLevelSubjects" });

	const oSubjectOptions: FormSelectOption[] = useMemo(
		() => oLevelSubjectRows.map((r) => ({ value: r.name, label: r.name })),
		[],
	);
	const aSubjectOptions: FormSelectOption[] = useMemo(
		() => aLevelSubjectRows.map((r) => ({ value: r.name, label: r.name })),
		[],
	);
	const gradeOptions: FormSelectOption[] = useMemo(() => GRADE_OPTIONS.map((g) => ({ value: g, label: g })), []);

	const oSubjectsError =
		showOMarksheet && errors.oLevelSubjects && !Array.isArray(errors.oLevelSubjects)
			? errors.oLevelSubjects.message
			: undefined;
	const aSubjectsError =
		showAMarksheet && errors.aLevelSubjects && !Array.isArray(errors.aLevelSubjects)
			? errors.aLevelSubjects.message
			: undefined;

	useEffect(() => {
		if (!student) {
			reset(defaultValuesStudentForm);
			return;
		}

		reset(defaultValuesStudentForm);

		const setOpts = { shouldValidate: false, shouldDirty: false } as const;
		Object.entries(student).forEach(([key, value]) => {
			if (skipStudentKeysForForm.has(key)) return;
			setValue(key as keyof StudentRegistrationFormValues, value as any, setOpts);
		});

		const oList = student.oLevelSubjects ?? [];
		const aList = student.aLevelSubjects ?? [];
		setValue("oLevelSubjects", oList?.length > 0 ? oList : [emptySubjectRow()], setOpts);
		setValue("aLevelSubjects", aList?.length > 0 ? aList : [emptySubjectRow()], setOpts);
	}, [student, setValue, reset]);

	const onUpdateStudents = async (_data: StudentRegistrationFormValues) => {
		try {
			const { data, status } = await put("API_URL", "student/profile", _data);
			console.log({ status });
			if (status === 200) {
				onOpenChange(false);
				updateData();
				toastSuccess({ message: `Update successfully` });
			}
		} catch (err) {
			toastError({
				message: err instanceof AxiosError ? err.response?.data?.message[0] : err,
			});
		}
	};

	const handleApprovedReject = async (value: string) => {
		const payload = {
			studentIds: [student?.id],
			action: value,
		};
		try {
			const { data, status } = await patch("API_URL", "admin/students", payload);
			if (status === 200) {
				onOpenChange(false);
				updateData();
				toastSuccess({ message: `${value} successfully` });
			}
		} catch (err) {
			toastError({
				message: err instanceof AxiosError ? err.response?.data?.message[0] : err,
			});
		}
	};

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
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				overlayClassName="bg-foreground/30 backdrop-blur-[2px]"
				className={cn(
					"flex h-full max-h-[100dvh] min-h-0 w-full max-w-[500px] flex-col gap-0 overflow-hidden border-l bg-background p-0 text-foreground shadow-xl",
					"data-[side=right]:w-full data-[side=right]:sm:max-w-[500px]",
					"animate-in slide-in-from-right duration-200",
				)}
			>
				{student ? (
					<>
						<SheetHeader className="shrink-0 space-y-1 px-6 pt-6 pb-4">
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
								onClick={() => onOpenChange(false)}
							>
								<X className="size-5" />
								<span className="sr-only">Close</span>
							</Button>
							<SheetDescription className="mb-0 text-sm text-[#005EB0]">Application</SheetDescription>
							<SheetTitle className="text-2xl font-medium text-foreground">
								Student Registration
							</SheetTitle>
						</SheetHeader>

						<FormProvider {...methods}>
							<form
								onSubmit={handleSubmit(onUpdateStudents)}
								className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6"
							>
								<div className="space-y-8">
									<div className="flex items-end justify-between gap-3 rounded-lg border border-tartiary p-4">
										<div className="size-28 overflow-hidden rounded-lg bg-muted">
											{student?.photoUrl ? (
												<img
													src={student?.photoUrl}
													alt="Student"
													className="size-full object-cover"
												/>
											) : (
												<User className="size-28" />
											)}
										</div>
										<Button type="button" variant="outline" size="sm" className="gap-1.5 bg-frost">
											<Upload className="size-3.5" />
											Replace Image
										</Button>
									</div>

									<div className="rounded-lg border border-tartiary p-4">
										<h3 className="mb-4 text-sm font-semibold text-foreground">
											Personal Information
										</h3>
										<div className="space-y-3">
											<FormInputField
												control={control}
												name="name"
												label="Full Name"
												placeholder="Your full name"
											/>
											<div className="grid grid-cols-2 gap-3">
												<FormInputField
													control={control}
													name="phoneNumber"
													label="Phone Number"
													placeholder="01XXXXXXXXX"
												/>
												<FormSelectField
													control={control}
													name="gender"
													label="Gender"
													placeholder="Select"
													options={genderOptions}
												/>
											</div>
											<FormInputField
												control={control}
												name="email"
												label="Email Address"
												type="email"
												placeholder="you@example.com"
												autoComplete="email"
											/>
											<ControlDatePicker
												control={control}
												name="dateOfBirth"
												label="Date of Birth"
												placeholder="Select date"
												// error={errors.dateOfBirth?.message}
											/>
											{role === "STUDENT" && (
												<>
													<FormInputField
														control={control}
														name="password"
														label="Password"
														type="text"
														placeholder="*******"
													/>
													<FormInputField
														control={control}
														name="confirmPassword"
														label="Confirm Password"
														type="text"
														placeholder="*******"
													/>
												</>
											)}
										</div>
									</div>

									<div className="rounded-lg border border-tartiary p-4">
										<h3 className="mb-4 text-sm font-semibold text-foreground">
											Academic Information
										</h3>
										<div className="space-y-3">
											<FormSelectField
												control={control}
												name="school"
												label="School Name"
												options={schoolsOption}
											/>
											<div className="grid grid-cols-2 gap-3">
												<FormInputField
													control={control}
													name="rollNumber"
													label="Roll Number"
													placeholder="0000000000"
												/>
												<FormSelectField
													control={control}
													name="applyingForLevel"
													label="Applying for Level"
													options={levelOptions}
												/>
											</div>
											<div className="grid grid-cols-2 gap-3">
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
											</div>
											<div className="grid grid-cols-2 gap-3">
												<FormSelectField
													control={control}
													name="examinationSession"
													label="Session"
													options={sessionOptions}
												/>
												<FormSelectField
													control={control}
													name="examinationBoard"
													label="Examination Board"
													options={boardOptions}
												/>
											</div>
										</div>
									</div>

									{showOMarksheet ? (
										<div className="rounded-lg border border-tartiary p-4">
											<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
											<p className="mb-3 text-xs text-muted-foreground">O-Level Subjects</p>
											{oSubjectsError ? (
												<p className="mb-3 text-xs text-destructive">{oSubjectsError}</p>
											) : null}
											<div className="hidden text-sm font-medium text-muted-foreground sm:mb-2 sm:grid sm:grid-cols-[1fr_100px_100px_40px] sm:gap-3 sm:rounded-md sm:bg-tartiary/60 sm:p-2">
												<span>Subject</span>
												<span>Grade</span>
												<span>Paper Code</span>
												<span />
											</div>
											<div className="space-y-3">
												{oLevelFA.fields.map((row, index) => (
													<div
														key={row.id}
														className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px_100px_40px] sm:items-end sm:gap-3"
													>
														<FormSelectField
															control={control}
															name={`oLevelSubjects.${index}.name`}
															placeholder="Select subject"
															options={oSubjectOptions}
															className="space-y-1"
														/>
														<div className="grid grid-cols-2 gap-3 sm:contents">
															<FormSelectField
																control={control}
																name={`oLevelSubjects.${index}.grade`}
																placeholder="—"
																options={gradeOptions}
																className="space-y-1"
															/>
															<FormInputField
																control={control}
																name={`oLevelSubjects.${index}.paperCode`}
																placeholder="Code"
																className="space-y-1"
															/>
														</div>
														<button
															type="button"
															disabled={oLevelFA.fields.length <= 1}
															className={cn(
																"inline-flex size-9 shrink-0 items-center justify-center justify-self-end rounded-lg text-muted-foreground outline-none transition-colors",
																"hover:bg-muted hover:text-destructive focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
																"disabled:pointer-events-none disabled:opacity-40 sm:size-8 sm:justify-self-auto",
															)}
															aria-label="Remove subject row"
															onClick={() => oLevelFA.remove(index)}
														>
															<Trash2 className="h-4 w-4" />
														</button>
													</div>
												))}
											</div>
											<Button
												type="button"
												variant="outline"
												size="lg"
												className="mt-2 gap-1.5 !bg-frost"
												onClick={() => oLevelFA.append(emptySubjectRow())}
											>
												+ Add Subject
											</Button>
										</div>
									) : null}

									{showAMarksheet ? (
										<div className="rounded-lg border border-tartiary p-4">
											<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
											<p className="mb-3 text-xs text-muted-foreground">A-Level Subjects</p>
											{aSubjectsError ? (
												<p className="mb-3 text-xs text-destructive">{aSubjectsError}</p>
											) : null}
											<div className="hidden text-sm font-medium text-muted-foreground sm:mb-2 sm:grid sm:grid-cols-[1fr_100px_100px_40px] sm:gap-3 sm:rounded-md sm:bg-tartiary/60 sm:p-2">
												<span>Subject</span>
												<span>Grade</span>
												<span>Paper Code</span>
												<span />
											</div>
											<div className="space-y-3">
												{aLevelFA.fields.map((row, index) => (
													<div
														key={row.id}
														className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px_100px_40px] sm:items-end sm:gap-3"
													>
														<FormSelectField
															control={control}
															name={`aLevelSubjects.${index}.name`}
															placeholder="Select subject"
															options={aSubjectOptions}
															className="space-y-1"
														/>
														<div className="grid grid-cols-2 gap-3 sm:contents">
															<FormSelectField
																control={control}
																name={`aLevelSubjects.${index}.grade`}
																placeholder="—"
																options={gradeOptions}
																className="space-y-1"
															/>
															<FormInputField
																control={control}
																name={`aLevelSubjects.${index}.paperCode`}
																placeholder="Code"
																className="space-y-1"
															/>
														</div>
														<button
															type="button"
															disabled={aLevelFA.fields.length <= 1}
															className={cn(
																"inline-flex size-9 shrink-0 items-center justify-center justify-self-end rounded-lg text-muted-foreground outline-none transition-colors",
																"hover:bg-muted hover:text-destructive focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
																"disabled:pointer-events-none disabled:opacity-40 sm:size-8 sm:justify-self-auto",
															)}
															aria-label="Remove subject row"
															onClick={() => aLevelFA.remove(index)}
														>
															<Trash2 className="h-4 w-4" />
														</button>
													</div>
												))}
											</div>
											<Button
												type="button"
												variant="outline"
												size="lg"
												className="mt-2 gap-1.5 !bg-frost"
												onClick={() => aLevelFA.append(emptySubjectRow())}
											>
												+ Add Subject
											</Button>
										</div>
									) : null}

									<div className="space-y-2 pb-4">
										{role === "STUDENT" && (
											<Button
												type="submit"
												variant="outline"
												className="h-10 w-full rounded-md border border-[#002E66] bg-frost text-sm font-medium"
											>
												Update Information
											</Button>
										)}
										{student?.status === "Pending" && role !== "STUDENT" && (
											<>
												<Button
													onClick={() => handleApprovedReject("approve")}
													type="button"
													className="h-10 w-full rounded-md bg-[#002E66] text-sm font-medium"
												>
													Approve Now
												</Button>
												<div className="flex items-center gap-2">
													{/* <select className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50">
												<option>Select a reason to decline</option>
											</select> */}
													<Button
														onClick={() => handleApprovedReject("reject")}
														type="button"
														className="h-10 w-full shrink-0 rounded-md bg-[#FFB0B0] px-6 text-sm font-medium text-[#B00000] hover:bg-[#FFB0B0]/90"
													>
														Decline
													</Button>
												</div>
											</>
										)}
									</div>
								</div>
							</form>
						</FormProvider>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
};
