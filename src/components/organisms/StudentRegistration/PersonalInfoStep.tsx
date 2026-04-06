"use client";

import { FileUpload } from "@/components/molecules";
import { CardSectionHeader } from "@/components/molecules/CardSectionHeader";
import { ControlDatePicker } from "@/components/molecules/ContorlDatePicker";
import { FormInputField } from "@/components/molecules/FormInputField";
import { FormSelectField } from "@/components/molecules/FormSelectField";
import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";
import { genderOptions } from "@/utils/constant";
import { useFormContext } from "react-hook-form";

export const PersonalInfoStep = ({ setValue }: { setValue: any }) => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<StudentRegistrationFormValues>();

	const { photoUrl } = watch();

	return (
		<div className="">
			<CardSectionHeader
				title="Personal Information"
				description="Please provide your personal data as they appear on official documents."
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5">
				<FormInputField control={control} name="name" label="Full Name" placeholder="Your full name" />
				<ControlDatePicker
					control={control}
					name="dateOfBirth"
					label="Date of Birth"
					placeholder="Select date"
					error={errors.dateOfBirth?.message}
				/>
				<FormInputField control={control} name="phoneNumber" label="Phone Number" placeholder="01XXXXXXXXX" />
				<FormSelectField
					control={control}
					name="gender"
					label="Gender"
					placeholder="Select"
					options={genderOptions}
				/>
			</div>

			<div className="mt-5">
				<FileUpload setValue={setValue} imageURL={photoUrl as string} property={"photoUrl"} showImage />
			</div>
			{errors.photoUrl && <p className="text-xs text-destructive">{errors.photoUrl.message}</p>}
		</div>
	);
};
