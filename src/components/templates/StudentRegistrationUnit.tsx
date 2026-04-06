"use client";

import { Button } from "@/components/ui/button";
import { buildStudentRegistrationSubmitPayload } from "@/lib/studentRegistrationPayload";
import {
	defaultValuesStudentForm,
	studentRegistrationSchema,
	type StudentRegistrationFormValues,
} from "@/lib/validation/studentRegistrationSchema";
import { useApiClient } from "@/libes/hooks";
import { toastError } from "@/utils/helpers/toast.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
	AcademicInfoStep,
	ConfirmSubmitStep,
	getRegistrationFooterActions,
	PersonalInfoStep,
	RegistrationStepper,
	ThankYouStep,
	type RegistrationStepFooterAction,
} from "../organisms/StudentRegistration";
import { Container } from "../ui";

const steps = [{ label: "Personal Information" }, { label: "Academic Info" }, { label: "Confirm & Submit" }];

function StepFooterButton({ action }: { action: RegistrationStepFooterAction }) {
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
	const [suppressStep3Submit, setSuppressStep3Submit] = useState(false);

	const { post, loading } = useApiClient();

	const methods = useForm<StudentRegistrationFormValues>({
		resolver: yupResolver(studentRegistrationSchema) as Resolver<StudentRegistrationFormValues>,
		defaultValues: defaultValuesStudentForm,
		mode: "onTouched",
		shouldFocusError: true,
	});

	const { handleSubmit, trigger, setValue } = methods;

	useEffect(() => {
		if (currentStep !== 3) return;
		const id = window.setTimeout(() => setSuppressStep3Submit(false), 450);
		return () => window.clearTimeout(id);
	}, [currentStep]);

	useEffect(() => {
		if (currentStep !== 3) return;
		requestAnimationFrame(() => {
			const el = document.activeElement;
			if (el instanceof HTMLElement) el.blur();
		});
	}, [currentStep]);

	const goToStep = async (next: number, fields: (keyof StudentRegistrationFormValues)[]) => {
		const valid = await trigger(fields, { shouldFocus: true });
		if (!valid) return;
		if (next === 3) setSuppressStep3Submit(true);
		setCurrentStep(next);
	};

	const onRegistrationSubmit = async (data: StudentRegistrationFormValues) => {
		const payload = buildStudentRegistrationSubmitPayload(data);

		try {
			const { data, status } = await post("API_URL", "student-register", payload);
			if (status === 201) {
				setSubmitted(true);
			}
		} catch (err) {
			toastError({
				message: err instanceof AxiosError ? err.response?.data?.message[0] : err,
			});
		}
	};

	const [footerLeft, footerRight] = getRegistrationFooterActions({
		currentStep,
		isSubmitting,
		suppressStep3Submit,
		goToStep,
		setCurrentStep,
	});

	if (submitted) {
		return (
			<div className="min-h-screen bg-background px-3 py-8 sm:px-4 sm:py-9 md:px-6 md:py-10 lg:px-8 xl:px-10">
				<div className="mx-auto max-w-5xl">
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
						<h1 className="my-3 text-xl font-semibold leading-tight text-ink sm:my-4 sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight xl:text-[40px] xl:font-normal">
							Student Registration
						</h1>
						<p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-ink sm:text-base md:text-lg lg:text-xl xl:text-xl">
							Complete both steps to submit your registration for the 2026 Awards.
						</p>
					</div>

					<div className="mb-6 sm:mb-8 md:mb-9 lg:mb-10">
						<RegistrationStepper currentStep={currentStep} steps={steps} />
					</div>

					<FormProvider {...methods}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (currentStep !== 3) return;
								void handleSubmit(onRegistrationSubmit)(e);
							}}
							className={[
								"space-y-5 border border-tartiary bg-white sm:space-y-6",
								"rounded-2xl px-4 py-6 sm:rounded-3xl sm:px-5 sm:py-8 md:rounded-[32px] md:px-7 md:py-9",
								"lg:rounded-[34px] lg:px-9 lg:py-10 xl:rounded-[36px] xl:px-[50px] xl:py-[45px]",
							].join(" ")}
						>
							{currentStep === 1 && <PersonalInfoStep setValue={setValue} />}
							{currentStep === 2 && <AcademicInfoStep />}
							{currentStep === 3 && <ConfirmSubmitStep />}

							<div
								key={currentStep}
								className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4"
							>
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
