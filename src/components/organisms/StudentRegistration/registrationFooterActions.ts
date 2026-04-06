import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type RegistrationStepFooterAction = {
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

export const registrationStep1Fields: (keyof StudentRegistrationFormValues)[] = [
	"name",
	"dateOfBirth",
	"phoneNumber",
	"gender",
	"photoUrl",
];

export const registrationStep2Fields: (keyof StudentRegistrationFormValues)[] = [
	"applyingForLevel",
	"yearOfExamination",
	"studyGroup",
	"examinationSession",
	"rollNumber",
	"examinationBoard",
	"school",
	"oLevelSubjects",
	"aLevelSubjects",
];

export type GetRegistrationFooterActionsParams = {
	currentStep: number;
	isSubmitting: boolean;
	suppressStep3Submit: boolean;
	goToStep: (next: number, fields: (keyof StudentRegistrationFormValues)[]) => void | Promise<void>;
	setCurrentStep: (step: number) => void;
};

/**
 * Returns [leftAction, rightAction] for the registration form footer.
 * Import from any client component or test — pass handlers from the host that owns form state.
 */
export function getRegistrationFooterActions({
	currentStep,
	isSubmitting,
	suppressStep3Submit,
	goToStep,
	setCurrentStep,
}: GetRegistrationFooterActionsParams): [RegistrationStepFooterAction | null, RegistrationStepFooterAction | null] {
	switch (currentStep) {
		case 1:
			return [
				null,
				{
					type: "button",
					size: "lg",
					className:
						"w-full bg-brand-blue text-sm font-medium text-white transition-opacity hover:opacity-90 sm:ml-auto sm:w-auto sm:text-base md:text-base rounded-full px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-5 lg:px-16 lg:py-6 xl:px-20 xl:py-6",
					onClick: () => void goToStep(2, registrationStep1Fields),
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
					onClick: () => void goToStep(3, registrationStep2Fields),
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
					disabled: isSubmitting || suppressStep3Submit,
					className:
						"w-full gap-2 rounded-full bg-[#1E6E45] py-4 text-sm sm:w-auto sm:px-8 sm:py-5 md:px-9",
					label: isSubmitting ? "Submitting…" : "Submit Registration",
					icon: ArrowRight,
					iconPosition: "end",
				},
			];
		default:
			return [null, null];
	}
}
