import { CardSectionHeader } from "@/components/molecules/CardSectionHeader";
import { ControlDatePicker } from "@/components/molecules/ContorlDatePicker";
import { FormInputField } from "@/components/molecules/FormInputField";
import { type FormSelectOption, FormSelectField } from "@/components/molecules/FormSelectField";
import { isFileList } from "@/lib/isFileList";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { Upload } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

const genderOptions: FormSelectOption[] = [
	{ value: "male", label: "Male" },
	{ value: "female", label: "Female" },
	{ value: "other", label: "Other" },
];

export const PersonalInfoStep = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<StudentRegistrationFormValues>();

	return (
		<div className="">
			<CardSectionHeader
				title="Personal Information"
				description="Please provide your personal data as they appear on official documents."
			/>

			<div className="grid gap-5 sm:grid-cols-2">
				<FormInputField control={control} name="fullName" label="Full Name" placeholder="Your full name" />
				<ControlDatePicker
					control={control}
					name="dob"
					label="Date of Birth"
					placeholder="Select date"
					error={errors.dob?.message}
				/>
				<FormInputField control={control} name="phone" label="Phone Number" placeholder="01XXXXXXXXX" />
				<FormSelectField
					control={control}
					name="gender"
					label="Gender"
					placeholder="Select"
					options={genderOptions}
				/>
			</div>

			<div className="mt-5 space-y-2">
				<span className="text-sm font-medium leading-none">Upload Photo</span>
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
								{isFileList(value) && value.length > 0 ? (
									<p className="mt-2 text-xs text-accent">{value[0].name}</p>
								) : null}
							</>
						)}
					/>
				</div>
				{errors.photo && <p className="text-xs text-destructive">{errors.photo.message}</p>}
			</div>
		</div>
	);
};
