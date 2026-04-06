"use client";

import { CardSectionHeader } from "@/components/molecules/CardSectionHeader";
import { FormCheckboxField } from "@/components/molecules/FormCheckboxField";
import { FormInputField } from "@/components/molecules/FormInputField";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { useFormContext } from "react-hook-form";

export const ConfirmSubmitStep = () => {
	const { control } = useFormContext<StudentRegistrationFormValues>();

	return (
		<div className="mx-auto w-full max-w-md ">
			<CardSectionHeader
				title="Create Your Profile"
				description="Enter your credentials to access your profile."
			/>

			<div className="space-y-4">
				<FormInputField
					control={control}
					name="email"
					label="Email Address"
					type="email"
					placeholder="you@example.com"
					autoComplete="email"
				/>
				<FormInputField
					control={control}
					name="password"
					label="Password"
					type="password"
					placeholder="••••••••"
					autoComplete="new-password"
				/>
				<FormInputField
					control={control}
					name="confirmPassword"
					label="Confirm Password"
					type="password"
					placeholder="••••••••"
					autoComplete="new-password"
				/>

				<FormCheckboxField
					control={control}
					name="termsAccepted"
					label={
						<>
							I confirm all information provided is accurate and I agree to the rules. All results shall
							be final and the Daily Star reserves the right to verify details further.
						</>
					}
				/>
			</div>
		</div>
	);
};
