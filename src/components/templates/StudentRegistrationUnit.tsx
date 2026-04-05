"use client";

import { Button } from "@/components/ui/button";
import { isFileList } from "@/lib/isFileList";
import { buildStudentRegisterPayload } from "@/lib/studentRegistrationPayload";
import {
	studentRegistrationSchema,
	type StudentRegistrationFormValues,
} from "@/lib/validation/studentRegistrationSchema";
import { toastError, toastSuccess } from "@/utils/helpers/toast.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm, type Resolver } from "react-hook-form";
import {
	AcademicInfoStep,
	ConfirmSubmitStep,
	PersonalInfoStep,
	RegistrationStepper,
	ThankYouStep,
} from "../organisms/StudentRegistration";

const steps = [{ label: "Personal Information" }, { label: "Academic Info" }, { label: "Confirm & Submit" }];

const defaultSubjectRows = () =>
	Array.from({ length: 6 }, () => ({
		subject: "",
		grade: "",
		paperCode: "",
	}));

const defaultValues: StudentRegistrationFormValues = {
	fullName: "",
	dob: "",
	phone: "",
	gender: "" as StudentRegistrationFormValues["gender"],
	photo: null as unknown as StudentRegistrationFormValues["photo"],
	applyingLevel: "" as StudentRegistrationFormValues["applyingLevel"],
	yearOfExamination: "" as StudentRegistrationFormValues["yearOfExamination"],
	studyGroup: "" as StudentRegistrationFormValues["studyGroup"],
	session: "" as StudentRegistrationFormValues["session"],
	rollNumber: "",
	examinationBoard: "" as StudentRegistrationFormValues["examinationBoard"],
	schoolName: "",
	subjects: defaultSubjectRows(),
	email: "",
	password: "",
	confirmPassword: "",
	termsAccepted: false,
};

const step1Fields: (keyof StudentRegistrationFormValues)[] = ["fullName", "dob", "phone", "gender", "photo"];

const step2Fields: (keyof StudentRegistrationFormValues)[] = [
	"applyingLevel",
	"yearOfExamination",
	"studyGroup",
	"session",
	"rollNumber",
	"examinationBoard",
	"schoolName",
	"subjects",
];

type ApiEnvelope = {
	success: boolean;
	message?: string[];
	data?: { url?: string };
};

export const StudentRegistrationUnit = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const methods = useForm<StudentRegistrationFormValues>({
		resolver: yupResolver(studentRegistrationSchema) as Resolver<StudentRegistrationFormValues>,
		defaultValues,
		mode: "onTouched",
		shouldFocusError: true,
	});

	const { control, handleSubmit, trigger } = methods;

	const {
		fields: subjectFields,
		append: appendSubject,
		remove: removeSubject,
	} = useFieldArray({
		control,
		name: "subjects",
	});

	const goToStep = async (next: number, fields: (keyof StudentRegistrationFormValues)[]) => {
		const valid = await trigger(fields, { shouldFocus: true });
		if (valid) setCurrentStep(next);
	};

	const onRegistrationSubmit = async (data: StudentRegistrationFormValues) => {
		setIsSubmitting(true);
		try {
			let photoUrl: string | undefined;

			if (isFileList(data.photo) && data.photo.length > 0) {
				const uploadForm = new FormData();
				uploadForm.append("image", data.photo[0]);
				const uploadRes = await fetch("/api/upload/image", {
					method: "POST",
					body: uploadForm,
				});
				const uploadJson = (await uploadRes.json()) as ApiEnvelope;
				if (!uploadRes.ok || !uploadJson.success || !uploadJson.data?.url) {
					const m = uploadJson.message?.[0] ?? "Photo upload failed";
					throw new Error(m);
				}
				photoUrl = uploadJson.data.url;
			}

			const body = buildStudentRegisterPayload(data, photoUrl);
			const regRes = await fetch("/api/student-register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const regJson = (await regRes.json()) as ApiEnvelope;
			if (!regRes.ok || !regJson.success) {
				const m = regJson.message?.[0] ?? "Registration failed";
				throw new Error(m);
			}

			toastSuccess({ message: regJson.message?.[0] ?? "Registration successful." });
			setSubmitted(true);
		} catch (e) {
			toastError({ message: e instanceof Error ? e.message : "Something went wrong" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const removeSubjectRow = (index: number) => {
		if (subjectFields.length > 1) removeSubject(index);
	};

	if (submitted) {
		return (
			<div className="min-h-screen bg-background px-4 py-10">
				<div className="mx-auto max-w-3xl">
					<ThankYouStep />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background px-4 py-10">
			<div className="mx-auto max-w-3xl">
				<div className="mb-8 text-center">
					<span className="inline-block rounded-full bg-badge-bg px-4 py-1 text-xs font-semibold text-badge-fg">
						Application
					</span>
					<h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">Student Registration</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Complete both steps to submit your registration for the 2026 Awards.
					</p>
				</div>

				<div className="mb-10">
					<RegistrationStepper currentStep={currentStep} steps={steps} />
				</div>

				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onRegistrationSubmit)} className="space-y-6">
						{currentStep === 1 && <PersonalInfoStep />}
						{currentStep === 2 && (
							<AcademicInfoStep subjectFields={subjectFields} onRemoveSubject={removeSubjectRow} />
						)}
						{currentStep === 3 && <ConfirmSubmitStep />}

						<div className="flex flex-wrap items-center justify-between gap-4">
							{currentStep === 1 && (
								<>
									<span className="hidden min-w-0 flex-1 sm:block" aria-hidden />
									<Button
										type="button"
										size="lg"
										className="ml-auto gap-2"
										onClick={() => goToStep(2, step1Fields)}
									>
										Next: Academic Info <ArrowRight className="h-4 w-4" />
									</Button>
								</>
							)}

							{currentStep === 2 && (
								<>
									<Button
										type="button"
										variant="outline"
										className="gap-2"
										onClick={() => setCurrentStep(1)}
									>
										<ArrowLeft className="h-4 w-4" /> Back
									</Button>
									<div className="flex flex-wrap items-center justify-end gap-2 sm:ml-auto">
										<Button
											type="button"
											variant="outline"
											className="gap-2 border-accent text-accent hover:bg-accent/10"
											onClick={() => appendSubject({ subject: "", grade: "", paperCode: "" })}
										>
											<Plus className="h-4 w-4" /> Add Subject
										</Button>
										<Button
											type="button"
											size="lg"
											className="gap-2"
											onClick={() => goToStep(3, step2Fields)}
										>
											Next: Confirm & Submit <ArrowRight className="h-4 w-4" />
										</Button>
									</div>
								</>
							)}

							{currentStep === 3 && (
								<>
									<Button
										type="button"
										variant="outline"
										className="gap-2"
										onClick={() => setCurrentStep(2)}
									>
										<ArrowLeft className="h-4 w-4" /> Back
									</Button>
									<Button
										type="submit"
										size="lg"
										disabled={isSubmitting}
										className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 sm:ml-auto"
									>
										{isSubmitting ? "Submitting…" : "Submit Registration"}{" "}
										<ArrowRight className="h-4 w-4" />
									</Button>
								</>
							)}
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
