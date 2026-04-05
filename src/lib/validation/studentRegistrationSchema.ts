import { isFileList } from "@/lib/isFileList";
import * as yup from "yup";

const subjectRowSchema = yup.object({
	subject: yup.string().default(""),
	grade: yup
		.string()
		.default("")
		.when("subject", {
			is: (subject: string) => Boolean(subject?.trim()),
			then: (schema) => schema.required("Grade is required when a subject is selected"),
			otherwise: (schema) => schema,
		}),
	paperCode: yup.string().default(""),
});

export const studentRegistrationSchema = yup.object({
	fullName: yup.string().trim().required("Full name is required").min(2, "Name is too short"),
	dob: yup.string().required("Date of birth is required"),
	phone: yup
		.string()
		.trim()
		.required("Phone number is required")
		.matches(/^01\d{9}$/, "Enter a valid 11-digit mobile number (01XXXXXXXXX)"),
	gender: yup.string().oneOf(["male", "female", "other"], "Select a gender").required("Gender is required"),
	photo: yup
		.mixed()
		.required("Photo is required")
		.test("has-file", "Please upload a photo", (value) => isFileList(value) && value.length > 0)
		.test("file-size", "Image must be 5MB or smaller", (value) => {
			if (!isFileList(value) || value.length === 0) return true;
			return value[0].size <= 5 * 1024 * 1024;
		})
		.test("file-type", "Use PNG or JPG", (value) => {
			if (!isFileList(value) || value.length === 0) return true;
			const type = value[0].type;
			return type === "image/png" || type === "image/jpeg" || type === "image/jpg" || type === "image/webp";
		}),

	applyingLevel: yup
		.string()
		.oneOf(["o-level", "a-level"], "Select a level")
		.required("Level is required"),
	yearOfExamination: yup
		.string()
		.oneOf(["2025", "2024", "2023"], "Select examination year")
		.required("Year is required"),
	studyGroup: yup
		.string()
		.oneOf(["science", "commerce", "arts"], "Select study group")
		.required("Study group is required"),
	session: yup
		.string()
		.oneOf(["may-june", "oct-nov"], "Select session")
		.required("Session is required"),
	rollNumber: yup.string().trim().required("Roll number is required").min(1),
	examinationBoard: yup
		.string()
		.oneOf(["cambridge", "edexcel"], "Select examination board")
		.required("Board is required"),
	schoolName: yup.string().trim().required("School name is required").min(2, "School name is too short"),

	subjects: yup
		.array()
		.of(subjectRowSchema)
		.required()
		.test("at-least-one-subject", "Enter at least one subject with a grade", (rows) =>
			(rows ?? []).some((r) => Boolean(r?.subject && r?.grade))
		),

	email: yup.string().trim().required("Email is required").email("Enter a valid email"),
	password: yup.string().required("Password is required").min(8, "Use at least 8 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm your password")
		.oneOf([yup.ref("password")], "Passwords must match"),
	termsAccepted: yup
		.boolean()
		.required()
		.oneOf([true], "You must confirm the terms to continue"),
});

export type StudentRegistrationFormValues = yup.InferType<typeof studentRegistrationSchema>;
