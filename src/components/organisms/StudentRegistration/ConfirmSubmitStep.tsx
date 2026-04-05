import { FormCheckboxField } from "@/components/molecules/FormCheckboxField";
import { FormInputField } from "@/components/molecules/FormInputField";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { useFormContext } from "react-hook-form";

export const ConfirmSubmitStep = () => {
	const { control } = useFormContext<StudentRegistrationFormValues>();

	return (
		<div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
			<h2 className="text-lg font-bold text-foreground">Create Your Profile</h2>
			<p className="mb-6 text-sm text-muted-foreground">Enter your credentials to access your profile.</p>

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
