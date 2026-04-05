"use client";

import { studentRegistrationSchema, type StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
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

export const StudentRegistrationUnit = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [submitted, setSubmitted] = useState(false);

	const methods = useForm<StudentRegistrationFormValues>({
		resolver: yupResolver(studentRegistrationSchema) as Resolver<StudentRegistrationFormValues>,
		defaultValues,
		mode: "onTouched",
		shouldFocusError: true,
	});

	const { handleSubmit, trigger } = methods;

	const goToStep = async (next: number, fields: (keyof StudentRegistrationFormValues)[]) => {
		const valid = await trigger(fields, { shouldFocus: true });
		if (valid) setCurrentStep(next);
	};

	const onRegistrationSubmit = (_data: StudentRegistrationFormValues) => {
		setSubmitted(true);
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
					<form onSubmit={handleSubmit(onRegistrationSubmit)} className="space-y-0">
						{currentStep === 1 && <PersonalInfoStep onNext={() => goToStep(2, step1Fields)} />}
						{currentStep === 2 && (
							<AcademicInfoStep
								onNext={() => goToStep(3, step2Fields)}
								onBack={() => setCurrentStep(1)}
							/>
						)}
						{currentStep === 3 && <ConfirmSubmitStep onBack={() => setCurrentStep(2)} />}
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
