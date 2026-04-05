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
						<div className="flex flex-col items-center ">
							<div
								className={cn(
									"flex h-[70px] w-[70px] items-center justify-center rounded-full text-2xl  transition-all",
									isComplete && "bg-[#002E66] text-primary-foreground",
									isActive && "bg-[#002E66] text-primary-foreground",
									!isComplete && !isActive && "bg-[#BDBDBD] text-[#757575]",
								)}
							>
								{isComplete ? <Check className="h-5 w-5" /> : stepNum}
							</div>
							<span className={cn("mt-4 font-medium", isActive ? "text-[#002E66]" : "text-[#757575]")}>
								{step.label}
							</span>
						</div>
						{index < steps?.length - 1 && (
							<div
								className={cn(
									"mb-6 h-0.5 w-16 sm:w-24 border-[1px] border-dashed",
									currentStep > stepNum + 1
										? "bg-step-complete"
										: currentStep > stepNum
											? "border-[#002E66]"
											: "border-[#909090]",
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};
