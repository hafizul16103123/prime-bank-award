"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
	currentStep: number;
	steps: { label: string }[];
}

export const RegistrationStepper = ({ currentStep, steps }: StepperProps) => {
	return (
		<div className="flex items-center justify-center gap-0">
			{steps.map((step, index) => {
				const stepNum = index + 1;
				const isComplete = currentStep > stepNum;
				const isActive = currentStep === stepNum;

				return (
					<div key={index} className="flex items-center">
						<div className="flex flex-col items-center">
							<div
								className={cn(
									"flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all",
									isComplete && "bg-step-complete text-primary-foreground",
									isActive && "bg-step-active text-primary-foreground",
									!isComplete && !isActive && "bg-step-inactive text-muted-foreground",
								)}
							>
								{isComplete ? <Check className="h-5 w-5" /> : stepNum}
							</div>
							<span
								className={cn(
									"mt-2 text-xs font-semibold",
									isActive ? "text-primary" : "text-muted-foreground",
								)}
							>
								{step.label}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div
								className={cn(
									"mx-4 mb-6 h-0.5 w-16 sm:w-24",
									currentStep > stepNum + 1
										? "bg-step-complete"
										: currentStep > stepNum
											? "bg-step-active"
											: "bg-step-inactive",
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};
