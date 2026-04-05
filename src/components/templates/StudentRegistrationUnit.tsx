"use client";

import { useState } from "react";
import {
	AcademicInfoStep,
	ConfirmSubmitStep,
	PersonalInfoStep,
	RegistrationStepper,
	ThankYouStep,
} from "../organisms/StudentRegistration";

const steps = [{ label: "Personal Information" }, { label: "Academic Info" }, { label: "Confirm & Submit" }];

export const StudentRegistrationUnit = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [submitted, setSubmitted] = useState(false);

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
				{/* Header */}
				<div className="mb-8 text-center">
					<span className="inline-block rounded-full bg-badge-bg px-4 py-1 text-xs font-semibold text-badge-fg">
						Application
					</span>
					<h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">Student Registration</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Complete both steps to submit your registration for the 2026 Awards.
					</p>
				</div>

				{/* Stepper */}
				<div className="mb-10">
					<RegistrationStepper currentStep={currentStep} steps={steps} />
				</div>

				{/* Step Content */}
				{currentStep === 1 && <PersonalInfoStep onNext={() => setCurrentStep(2)} />}
				{currentStep === 2 && (
					<AcademicInfoStep onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
				)}
				{currentStep === 3 && <ConfirmSubmitStep onBack={() => setCurrentStep(2)} />}
			</div>
		</div>
	);
};
