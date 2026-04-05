"use client";

import { Button } from "@/components/ui/button";
import {
	studentRegistrationSchema,
	type StudentRegistrationFormValues,
} from "@/lib/validation/studentRegistrationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm, type Resolver } from "react-hook-form";
import {
	AcademicInfoStep,
	ConfirmSubmitStep,
	PersonalInfoStep,
	RegistrationStepper,
	ThankYouStep,
} from "../organisms/StudentRegistration";
import { Container } from "../ui";

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

type StepFooterAction = {
	type?: "button" | "submit";
	variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
	size?: "default" | "sm" | "lg" | "xs" | "icon" | "icon-sm" | "icon-lg";
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	label: string;
	icon: LucideIcon;
	iconPosition: "start" | "end";
};

function StepFooterButton({ action }: { action: StepFooterAction }) {
	const Icon = action.icon;
	return (
		<Button
			type={action.type ?? "button"}
			variant={action.variant}
			size={action.size}
			className={action.className}
			disabled={action.disabled}
			onClick={action.type === "submit" ? undefined : action.onClick}
		>
			{action.iconPosition === "start" ? (
				<>
					<Icon className="h-4 w-4" /> {action.label}
				</>
			) : (
				<>
					{action.label} <Icon className="h-4 w-4" />
				</>
			)}
		</Button>
	);
}

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
		console.log(data);
	};

	const removeSubjectRow = (index: number) => {
		if (subjectFields.length > 1) removeSubject(index);
	};

	const addSubjectRow = () => appendSubject({ subject: "", grade: "", paperCode: "" });

	const getFooterActions = (): [StepFooterAction | null, StepFooterAction | null] => {
		switch (currentStep) {
			case 1:
				return [
					null,
					{
						type: "button",
						size: "lg",
						className:
							"ml-auto bg-brand-blue text-white rounded-full hover:opacity-90 transition-opacity text-base font-medium px-20 py-6",
						onClick: () => goToStep(2, step1Fields),
						label: "Next: Academic Info",
						icon: ArrowRight,
						iconPosition: "end",
					},
				];
			case 2:
				return [
					{
						type: "button",
						variant: "outline",
						className: "gap-2 py-6 border border-tartiary rounded-full bg-subtle px-10",
						onClick: () => setCurrentStep(1),
						label: "Back",
						icon: ArrowLeft,
						iconPosition: "start",
					},
					{
						type: "button",
						size: "lg",
						className:
							"ml-auto bg-brand-blue text-white rounded-full hover:opacity-90 transition-opacity text-base font-medium px-20 py-6",
						onClick: () => goToStep(3, step2Fields),
						label: "Next: Confirm & Submit",
						icon: ArrowRight,
						iconPosition: "end",
					},
				];
			case 3:
				return [
					{
						type: "button",
						variant: "outline",
						className: "gap-2",
						onClick: () => setCurrentStep(2),
						label: "Back",
						icon: ArrowLeft,
						iconPosition: "start",
					},
					{
						type: "submit",
						size: "lg",
						disabled: isSubmitting,
						className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90 sm:ml-auto",
						label: isSubmitting ? "Submitting…" : "Submit Registration",
						icon: ArrowRight,
						iconPosition: "end",
					},
				];
			default:
				return [null, null];
		}
	};

	const [footerLeft, footerRight] = getFooterActions();

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
		<Container>
			<div className="min-h-screen bg-default rounded-[50px] border border-tartiary mt-3 pt-[85px] pb-[75px] py-10">
				<div className="mx-auto max-w-[1200px]">
					<div className="mb-8 text-center">
						<span className="inline-block rounded-full border border-[#002E66] bg-frost text-sm font-medium py-[10px] px-[22px]">
							Application
						</span>
						<h1 className="my-4 text-2xl text-[#212121] sm:text-[40px]">Student Registration</h1>
						<p className=" text-xl text-[#757575]">
							Complete both steps to submit your registration for the 2026 Awards.
						</p>
					</div>

					<div className="mb-10">
						<RegistrationStepper currentStep={currentStep} steps={steps} />
					</div>

					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onRegistrationSubmit)}
							className="space-y-6 bg-white border border-tartiary rounded-[36px] px-[50px] py-[45px]"
						>
							{currentStep === 1 && <PersonalInfoStep />}
							{currentStep === 2 && (
								<AcademicInfoStep
									subjectFields={subjectFields}
									onRemoveSubject={removeSubjectRow}
									onAddSubject={addSubjectRow}
								/>
							)}
							{currentStep === 3 && <ConfirmSubmitStep />}

							<div className="flex flex-wrap items-center justify-between gap-4">
								{footerLeft ? (
									<StepFooterButton action={footerLeft} />
								) : (
									<span className="hidden min-w-0 flex-1 sm:block" aria-hidden />
								)}
								{footerRight ? <StepFooterButton action={footerRight} /> : null}
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</Container>
	);
};
