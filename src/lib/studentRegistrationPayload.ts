import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";

export type SubjectRowPayload = {
	name: string;
	grade: string;
	paperCode?: string;
};

/** JSON body aligned with `CreateStudentDto` (no `photo` FileList, no `termsAccepted`). */
export type StudentRegistrationSubmitPayload = {
	name: string;
	dateOfBirth: string;
	phoneNumber: string;
	gender: string;
	photoUrl?: string;
	applyingForLevel: string;
	yearOfExamination: number;
	studyGroup: string;
	examinationSession: string;
	rollNumber: string;
	examinationBoard: string;
	school: string;
	oLevelSubjects: SubjectRowPayload[];
	aLevelSubjects: SubjectRowPayload[];
	email: string;
	password: string;
	confirmPassword: string;
};

/** Form select values → `Gender` enum strings stored in MongoDB. */
const GENDER_TO_DTO: Record<string, string> = {
	MALE: "Male",
	FEMALE: "Female",
};

function normalizeSubjectName(raw: string): string {
	const t = raw.trim();
	const paren = t.indexOf(" (");
	return paren >= 0 ? t.slice(0, paren) : t;
}

function mapLevelSubjectRows(
	rows: { name?: string; grade?: string; paperCode?: string }[] | undefined,
): SubjectRowPayload[] {
	return (rows ?? [])
		.filter((r) => Boolean(r?.name?.trim() && r?.grade?.trim()))
		.map((r) => {
			const row: SubjectRowPayload = {
				name: normalizeSubjectName(r.name ?? ""),
				grade: (r.grade ?? "").trim(),
			};
			if (r.paperCode?.trim()) {
				row.paperCode = r.paperCode.trim();
			}
			return row;
		});
}

export function formatBdPhoneForApi(phone: string): string {
	const p = phone.trim();
	if (/^01\d{9}$/.test(p)) {
		return `+88${p.slice(1)}`;
	}
	return p;
}

/**
 * Builds the registration JSON payload from validated form values.
 * Pass `photoUrl` after upload; otherwise `photoUrl` is omitted.
 */
export function buildStudentRegistrationSubmitPayload(
	values: StudentRegistrationFormValues,
	photoUrl?: string,
): StudentRegistrationSubmitPayload {
	const oRows = mapLevelSubjectRows(values.oLevelSubjects);
	const aRows = mapLevelSubjectRows(values.aLevelSubjects);
	const isOLevel = values.applyingForLevel === "O Level";

	const payload: StudentRegistrationSubmitPayload = {
		name: values.name.trim(),
		dateOfBirth: values.dateOfBirth,
		phoneNumber: formatBdPhoneForApi(values.phoneNumber),
		gender: GENDER_TO_DTO[values.gender] ?? values.gender,
		applyingForLevel: values.applyingForLevel,
		yearOfExamination: values.yearOfExamination,
		studyGroup: values.studyGroup,
		examinationSession: values.examinationSession,
		rollNumber: values.rollNumber.trim(),
		examinationBoard: values.examinationBoard,
		school: values.school.trim(),
		oLevelSubjects: isOLevel ? oRows : [],
		aLevelSubjects: isOLevel ? [] : aRows,
		email: values.email.trim(),
		password: values.password,
		confirmPassword: values.confirmPassword,
	};

	if (photoUrl) {
		payload.photoUrl = photoUrl;
	}

	return payload;
}

/** Alias for API modules that still import this name. */
export type StudentRegisterApiBody = StudentRegistrationSubmitPayload;
export const buildStudentRegisterPayload = buildStudentRegistrationSubmitPayload;
