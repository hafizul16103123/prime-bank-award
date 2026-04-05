"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
	currentStep: number;
	steps: { label: string }[];
}

export const RegistrationStepper = ({ currentStep, steps }: StepperProps) => {
	return (
		<div className="w-full overflow-x-auto overflow-y-hidden pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<div className="mx-auto flex w-max max-w-none flex-nowrap items-start  justify-center gap-0">
				{steps.map((step, index) => {
					const stepNum = index + 1;
					const isComplete = currentStep > stepNum;
					const isActive = currentStep === stepNum;

					return (
						<div key={index} className="flex shrink-0 items-center">
							<div className="flex flex-col items-center px-1 sm:px-0">
								<div
									className={cn(
										"flex h-12 w-12 items-center justify-center rounded-full text-sm transition-all sm:h-14 sm:w-14 sm:text-base md:h-16 md:w-16 md:text-lg lg:h-[68px] lg:w-[68px] lg:text-2xl xl:h-[70px] xl:w-[70px]",
										isComplete && "bg-[#1E6E45] text-primary-foreground",
										isActive && "bg-[#002E66] text-primary-foreground",
										!isComplete && !isActive && "bg-[#BDBDBD] text-[#757575]",
									)}
								>
									{isComplete ? (
										<Check className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
									) : (
										stepNum
									)}
								</div>
								<span
									className={cn(
										"mt-2 max-w-[4.5rem] text-center text-[10px] font-medium leading-tight sm:mt-3 sm:max-w-[5.5rem] sm:text-xs md:mt-3 md:max-w-[6.5rem] md:text-sm lg:mt-4 lg:max-w-[9rem] lg:text-sm xl:mt-4 xl:max-w-[11rem] xl:text-base",
										isActive ? "text-[#002E66]" : "text-[#757575]",
									)}
								>
									{step.label}
								</span>
							</div>
							{index < steps?.length - 1 && (
								<div
									className={cn(
										"mb-7 h-0.5 w-8 shrink-0 self-center border border-dashed sm:mb-8 sm:w-12 md:mb-9 md:w-16 lg:mb-10 lg:w-20 xl:mb-11 xl:w-24",
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
		</div>
	);
};
