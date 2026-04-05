import { isFileList } from "@/lib/isFileList";
import * as yup from "yup";

/** One row in oLevelSubjects / aLevelSubjects (matches API `SubjectDto`). */
const levelSubjectRowSchema = yup.object({
	name: yup.string().default(""),
	grade: yup
		.string()
		.default("")
		.when("name", {
			is: (n: string) => Boolean(n?.trim()),
			then: (schema) => schema.required("Grade is required when a subject is selected"),
			otherwise: (schema) => schema,
		}),
	paperCode: yup.string().default(""),
});

export const studentRegistrationSchema = yup
	.object({
		name: yup.string().trim().required("Full name is required").min(2, "Name is too short"),
		dateOfBirth: yup.string().required("Date of birth is required"),
		phoneNumber: yup
			.string()
			.trim()
			.required("Phone number is required")
			.matches(/^01\d{9}$/, "Enter a valid 11-digit mobile number (01XXXXXXXXX)"),
		gender: yup.string().oneOf(["MALE", "FEMALE"], "Select a gender").required("Gender is required"),
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

		applyingForLevel: yup.string().oneOf(["O Level", "A Level"], "Select a level").required("Level is required"),
		yearOfExamination: yup.number().required("Year is required"),
		studyGroup: yup
			.string()
			.oneOf(["Science", "Commerce", "Arts"], "Select study group")
			.required("Study group is required"),
		examinationSession: yup
			.string()
			.oneOf(["May/June", "Oct/Nov"], "Select session")
			.required("Session is required"),
		rollNumber: yup.string().trim().required("Roll number is required").min(1),
		examinationBoard: yup
			.string()
			.oneOf(["Cambridge(CIE)", "Edexcel", "Pearson"], "Select examination board")
			.required("Board is required"),
		school: yup.string().trim().required("School name is required").min(2, "School name is too short"),

		oLevelSubjects: yup.array().of(levelSubjectRowSchema).required().default([]),
		aLevelSubjects: yup.array().of(levelSubjectRowSchema).required().default([]),

		email: yup.string().trim().required("Email is required").email("Enter a valid email"),
		password: yup.string().required("Password is required").min(8, "Use at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm your password")
			.oneOf([yup.ref("password")], "Passwords must match"),
		termsAccepted: yup.boolean().required().oneOf([true], "You must confirm the terms to continue"),
	})
	.test("subjects-for-level", "Enter at least one subject with a grade", function (vals) {
		const { applyingForLevel, oLevelSubjects, aLevelSubjects } = vals;
		if (!applyingForLevel) return true;
		if (applyingForLevel === "O Level") {
			const ok = (oLevelSubjects ?? []).some((r) => Boolean(r?.name?.trim() && r?.grade?.trim()));
			if (!ok) {
				return this.createError({
					path: "oLevelSubjects",
					message: "Enter at least one subject with a grade",
				});
			}
		}
		if (applyingForLevel === "A Level") {
			const ok = (aLevelSubjects ?? []).some((r) => Boolean(r?.name?.trim() && r?.grade?.trim()));
			if (!ok) {
				return this.createError({
					path: "aLevelSubjects",
					message: "Enter at least one subject with a grade",
				});
			}
		}
		return true;
	});

export type StudentRegistrationFormValues = yup.InferType<typeof studentRegistrationSchema>;

const defaultLevelSubjectRows = () =>
	Array.from({ length: 6 }, () => ({
		name: "",
		grade: "",
		paperCode: "",
	}));

export const defaultValuesStudentForm: StudentRegistrationFormValues = {
	name: "",
	dateOfBirth: "",
	phoneNumber: "",
	gender: "" as StudentRegistrationFormValues["gender"],
	photo: null as unknown as StudentRegistrationFormValues["photo"],
	applyingForLevel: "" as StudentRegistrationFormValues["applyingForLevel"],
	yearOfExamination: 0,
	studyGroup: "" as StudentRegistrationFormValues["studyGroup"],
	examinationSession: "" as StudentRegistrationFormValues["examinationSession"],
	rollNumber: "",
	examinationBoard: "" as StudentRegistrationFormValues["examinationBoard"],
	school: "",
	oLevelSubjects: defaultLevelSubjectRows(),
	aLevelSubjects: defaultLevelSubjectRows(),
	email: "",
	password: "",
	confirmPassword: "",
	termsAccepted: false,
};
