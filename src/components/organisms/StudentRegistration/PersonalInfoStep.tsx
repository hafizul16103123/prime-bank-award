import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Upload } from "lucide-react";
import { useState } from "react";

interface PersonalInfoStepProps {
	onNext: () => void;
}

export const PersonalInfoStep = ({ onNext }: PersonalInfoStepProps) => {
	const [photo, setPhoto] = useState<File | null>(null);

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Personal Information</h2>
				<p className="mb-6 text-sm text-muted-foreground">
					Please provide your personal data as they appear on official documents.
				</p>

				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="fullName">Full Name</Label>
						<Input id="fullName" placeholder="Your full name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="dob">Date of Birth</Label>
						<Input id="dob" type="date" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" placeholder="01XXXXXXXXX" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="gender">Gender</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="male">Male</SelectItem>
								<SelectItem value="female">Female</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="mt-5 space-y-2">
					<Label>Upload Photo</Label>
					<div className="flex flex-col items-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8">
						<Upload className="mb-2 h-8 w-8 text-muted-foreground" />
						<p className="text-sm font-medium text-foreground">Upload Images</p>
						<p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
						<label className="mt-3 cursor-pointer">
							<span className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
								Select Image
							</span>
							<input
								type="file"
								className="hidden"
								accept="image/*"
								onChange={(e) => setPhoto(e.target.files?.[0] || null)}
							/>
						</label>
						{photo && <p className="mt-2 text-xs text-accent">{photo.name}</p>}
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<Button onClick={onNext} size="lg" className="gap-2">
					Next: Academic Info <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
