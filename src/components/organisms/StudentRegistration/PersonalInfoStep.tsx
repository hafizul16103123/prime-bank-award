import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { ArrowRight, Upload } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface PersonalInfoStepProps {
	onNext: () => void;
}

export const PersonalInfoStep = ({ onNext }: PersonalInfoStepProps) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<StudentRegistrationFormValues>();

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
						<Input
							id="fullName"
							placeholder="Your full name"
							aria-invalid={!!errors.fullName}
							{...register("fullName")}
						/>
						{errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="dob">Date of Birth</Label>
						<Input id="dob" type="date" aria-invalid={!!errors.dob} {...register("dob")} />
						{errors.dob && <p className="text-xs text-destructive">{errors.dob.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input
							id="phone"
							placeholder="01XXXXXXXXX"
							aria-invalid={!!errors.phone}
							{...register("phone")}
						/>
						{errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="gender">Gender</Label>
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value ? field.value : null}
									onValueChange={(v) => field.onChange(v ?? "")}
								>
									<SelectTrigger id="gender" className="w-full min-w-0" aria-invalid={!!errors.gender}>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
					</div>
				</div>

				<div className="mt-5 space-y-2">
					<Label>Upload Photo</Label>
					<div className="flex flex-col items-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8">
						<Controller
							name="photo"
							control={control}
							render={({ field: { value, onChange, onBlur, name, ref } }) => (
								<>
									<Upload className="mb-2 h-8 w-8 text-muted-foreground" />
									<p className="text-sm font-medium text-foreground">Upload Images</p>
									<p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
									<input
										ref={ref}
										name={name}
										onBlur={onBlur}
										type="file"
										className="hidden"
										id="photo-upload"
										accept="image/png,image/jpeg,image/jpg,image/webp"
										onChange={(e) => {
											const files = e.target.files;
											onChange(files && files.length > 0 ? files : null);
										}}
									/>
									<label htmlFor="photo-upload" className="mt-3 cursor-pointer">
										<span className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
											Select Image
										</span>
									</label>
									{value instanceof FileList && value.length > 0 ? (
										<p className="mt-2 text-xs text-accent">{value[0].name}</p>
									) : null}
								</>
							)}
						/>
					</div>
					{errors.photo && <p className="text-xs text-destructive">{errors.photo.message}</p>}
				</div>
			</div>

			<div className="flex justify-end">
				<Button type="button" onClick={onNext} size="lg" className="gap-2">
					Next: Academic Info <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
