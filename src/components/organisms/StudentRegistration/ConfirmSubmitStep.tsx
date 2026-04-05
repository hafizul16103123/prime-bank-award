import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmSubmitStepProps {
	onBack: () => void;
}

export const ConfirmSubmitStep = ({ onBack }: ConfirmSubmitStepProps) => {
	const [agreed, setAgreed] = useState(false);

	const handleSubmit = () => {
		if (!agreed) {
			toast.error("Please agree to the terms before submitting.");
			return;
		}
		toast.success("Registration submitted successfully!");
	};

	return (
		<div className="space-y-6">
			<div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Create Your Profile</h2>
				<p className="mb-6 text-sm text-muted-foreground">Enter your credentials to access your profile.</p>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email Address</Label>
						<Input id="email" type="email" placeholder="you@example.com" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" placeholder="••••••••" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input id="confirmPassword" type="password" placeholder="••••••••" />
					</div>

					<div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
						<Checkbox
							id="terms"
							checked={agreed}
							onCheckedChange={(c) => setAgreed(c === true)}
							className="mt-0.5"
						/>
						<label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
							I confirm all information provided is accurate and I agree to the rules. All results shall
							be final and the Daily Star reserves the right to verify details further.
						</label>
					</div>
				</div>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={onBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
				<Button
					onClick={handleSubmit}
					size="lg"
					className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
				>
					Submit Registration <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
