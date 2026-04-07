import { ReactNode } from "react";

export type FormSelectOption = {
	value: string;
	label: ReactNode;
};

export const genderOptions: FormSelectOption[] = [
	{ value: "MALE", label: "Male" },
	{ value: "FEMALE", label: "Female" },
];

export const levelOptions: FormSelectOption[] = [
	{ value: "O Level", label: "O Level" },
	{ value: "A Level", label: "A Level" },
];

export const studyGroupOptions: FormSelectOption[] = [
	{ value: "Science", label: "Science" },
	{ value: "Commerce", label: "Commerce" },
	{ value: "Arts", label: "Arts" },
];

export const sessionOptions: FormSelectOption[] = [
	{ value: "May/June", label: "May/June" },
	{ value: "Oct/Nov", label: "Oct/Nov" },
];

export const boardOptions: FormSelectOption[] = [
	{ value: "Cambridge(CIE)", label: "Cambridge (CIE)" },
	{ value: "Edexcel", label: "Edexcel" },
	{ value: "Pearson", label: "Pearson" },
];

export const subjectOptions: FormSelectOption[] = [
	{ label: "Mathematics (D2/Compulsory)", value: "Mathematics (D2/Compulsory)" },
	{ label: "Physics", value: "Physics" },
	{ label: "Chemistry", value: "Chemistry" },
	{ label: "Biology", value: "Biology" },
	{ label: "Computer Science", value: "Computer Science" },
	{ label: "Economics", value: "Economics" },
	{ label: "Business Studies", value: "Business Studies" },
	{ label: "English Language", value: "English Language" },
	{ label: "Bangla", value: "Bangla" },
];

export const gradeOptions: FormSelectOption[] = [
	{ label: "A*", value: "A*" },
	{ label: "A", value: "A" },
	{ label: "B", value: "B" },
	{ label: "C", value: "C" },
	{ label: "D", value: "D" },
	{ label: "E", value: "E" },
	{ label: "F", value: "F" },
	{ label: "U", value: "U" },
];
