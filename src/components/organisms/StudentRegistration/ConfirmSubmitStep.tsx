import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface ConfirmSubmitStepProps {
	onBack: () => void;
}

export const ConfirmSubmitStep = ({ onBack }: ConfirmSubmitStepProps) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<StudentRegistrationFormValues>();

	return (
		<div className="space-y-6">
			<div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Create Your Profile</h2>
				<p className="mb-6 text-sm text-muted-foreground">Enter your credentials to access your profile.</p>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							aria-invalid={!!errors.email}
							{...register("email")}
						/>
						{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							autoComplete="new-password"
							aria-invalid={!!errors.password}
							{...register("password")}
						/>
						{errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="••••••••"
							autoComplete="new-password"
							aria-invalid={!!errors.confirmPassword}
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
						)}
					</div>

					<div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
						<Controller
							name="termsAccepted"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="terms"
									checked={field.value}
									onCheckedChange={(c) => field.onChange(c === true)}
									className="mt-0.5"
									aria-invalid={!!errors.termsAccepted}
								/>
							)}
						/>
						<label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
							I confirm all information provided is accurate and I agree to the rules. All results shall
							be final and the Daily Star reserves the right to verify details further.
						</label>
					</div>
					{errors.termsAccepted && (
						<p className="text-xs text-destructive">{errors.termsAccepted.message}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
				<Button type="submit" size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
					Submit Registration <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
