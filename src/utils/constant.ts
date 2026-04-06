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
