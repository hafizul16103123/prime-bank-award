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
							"w-full bg-brand-blue text-sm font-medium text-white transition-opacity hover:opacity-90 sm:ml-auto sm:w-auto sm:text-base md:text-base rounded-full px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-5 lg:px-16 lg:py-6 xl:px-20 xl:py-6",
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
						className:
							"w-full gap-2 rounded-full border border-tartiary bg-subtle py-4 text-sm sm:w-auto sm:px-8 sm:py-5 md:px-9 md:py-5 lg:px-10 lg:py-6",
						onClick: () => setCurrentStep(1),
						label: "Back",
						icon: ArrowLeft,
						iconPosition: "start",
					},
					{
						type: "button",
						size: "lg",
						className:
							"w-full bg-brand-blue text-sm font-medium text-white transition-opacity hover:opacity-90 sm:ml-auto sm:w-auto sm:text-base md:text-base rounded-full px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-5 lg:px-16 lg:py-6 xl:px-20 xl:py-6",
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
						className:
							"w-full gap-2 rounded-full border border-tartiary bg-subtle py-4 text-sm sm:w-auto sm:px-8 sm:py-5 md:px-9",
						onClick: () => setCurrentStep(2),
						label: "Back",
						icon: ArrowLeft,
						iconPosition: "start",
					},
					{
						type: "submit",
						size: "lg",
						disabled: isSubmitting,
						className:
							"w-full gap-2 bg-accent text-sm text-accent-foreground hover:bg-accent/90 sm:ml-auto sm:w-auto sm:text-base md:text-base lg:px-8 lg:py-6 xl:px-10",
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
			<div className="min-h-screen bg-background px-3 py-8 sm:px-4 sm:py-9 md:px-6 md:py-10 lg:px-8 xl:px-10">
				<div className="mx-auto max-w-3xl">
					<ThankYouStep />
				</div>
			</div>
		);
	}

	return (
		<Container>
			<div
				className={[
					"min-h-screen border border-tartiary bg-default",
					"mt-2 rounded-2xl px-3 pt-12 pb-8 sm:mt-3 sm:rounded-3xl sm:px-4 sm:pt-16 sm:pb-10",
					"md:rounded-[36px] md:px-6 md:pt-20 md:pb-12",
					"lg:rounded-[42px] lg:px-8 lg:pt-[72px] lg:pb-16",
					"xl:mt-3 xl:rounded-[50px] xl:px-10 xl:pt-[85px] xl:pb-[75px]",
					"py-6 sm:py-8 md:py-9 lg:py-10",
				].join(" ")}
			>
				<div className="mx-auto max-w-[1200px] px-0 sm:px-1 md:px-2 lg:px-3 xl:px-4">
					<div className="mb-6 text-center sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10">
						<span className="inline-block rounded-full border border-[#002E66] bg-frost px-4 py-2 text-xs font-medium sm:px-[18px] sm:py-[9px] sm:text-sm md:px-5 md:text-sm lg:px-[22px] lg:py-[10px] xl:text-sm">
							Application
						</span>
						<h1 className="my-3 text-xl font-semibold leading-tight text-[#212121] sm:my-4 sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-[40px] xl:font-normal">
							Student Registration
						</h1>
						<p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#757575] sm:text-base md:text-lg lg:text-xl xl:text-xl">
							Complete both steps to submit your registration for the 2026 Awards.
						</p>
					</div>

					<div className="mb-6 sm:mb-8 md:mb-9 lg:mb-10">
						<RegistrationStepper currentStep={currentStep} steps={steps} />
					</div>

					<FormProvider {...methods}>
						<form
							onSubmit={handleSubmit(onRegistrationSubmit)}
							className={[
								"space-y-5 border border-tartiary bg-white sm:space-y-6",
								"rounded-2xl px-4 py-6 sm:rounded-3xl sm:px-5 sm:py-8 md:rounded-[32px] md:px-7 md:py-9",
								"lg:rounded-[34px] lg:px-9 lg:py-10 xl:rounded-[36px] xl:px-[50px] xl:py-[45px]",
							].join(" ")}
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

							<div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
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
