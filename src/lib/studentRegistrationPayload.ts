import type { StudentRegistrationFormValues } from "@/lib/validation/studentRegistrationSchema";

/** POST `/api/student-register` JSON body (aligned with `CreateStudentDto` / Student model enums). */
export type StudentRegisterApiBody = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	dateOfBirth: string;
	gender: string;
	phoneNumber: string;
	school: string;
	rollNumber?: string;
	photoUrl?: string;
	applyingForLevel: string;
	yearOfExamination: number;
	examinationSession: string;
	examinationBoard?: string;
	studyGroup?: string;
	oLevelSubjects: SubjectRowPayload[];
	aLevelSubjects: SubjectRowPayload[];
};

export type SubjectRowPayload = {
	name: string;
	grade: string;
	paperCode?: string;
};

/** Form values → API enum strings stored in MongoDB (see `Gender`, `ExaminationLevel`, etc. in dtos). */
const GENDER: Record<string, string> = {
	male: "Male",
	female: "Female",
	other: "Other",
};

const APPLYING_LEVEL: Record<string, string> = {
	"o-level": "O Level",
	"a-level": "A Level",
};

const STUDY_GROUP: Record<string, string> = {
	science: "Science",
	commerce: "Commerce",
	arts: "Arts",
};

const EXAM_SESSION: Record<string, string> = {
	"may-june": "May/June",
	"oct-nov": "Oct/Nov",
};

const EXAM_BOARD: Record<string, string> = {
	cambridge: "Cambridge(CIE)",
	edexcel: "Edexcel",
};

export function formatBdPhoneForApi(phone: string): string {
	const p = phone.trim();
	if (/^01\d{9}$/.test(p)) {
		return `+88${p.slice(1)}`;
	}
	return p;
}

function normalizeSubjectName(raw: string): string {
	const t = raw.trim();
	const paren = t.indexOf(" (");
	return paren >= 0 ? t.slice(0, paren) : t;
}

function mapSubjectRows(rows: StudentRegistrationFormValues["subjects"]): SubjectRowPayload[] {
	return (rows ?? [])
		.filter((r) => Boolean(r?.subject?.trim() && r?.grade?.trim()))
		.map((r) => {
			const row: SubjectRowPayload = {
				name: normalizeSubjectName(r.subject),
				grade: r.grade.trim(),
			};
			if (r.paperCode?.trim()) {
				row.paperCode = r.paperCode.trim();
			}
			return row;
		});
}

export function buildStudentRegisterPayload(
	values: StudentRegistrationFormValues,
	photoUrl?: string,
): StudentRegisterApiBody {
	const subjectRows = mapSubjectRows(values.subjects);
	const isOLevel = values.applyingLevel === "o-level";

	return {
		name: values.fullName.trim(),
		email: values.email.trim(),
		password: values.password,
		confirmPassword: values.confirmPassword,
		dateOfBirth: values.dob,
		gender: GENDER[values.gender] ?? values.gender,
		phoneNumber: formatBdPhoneForApi(values.phone),
		school: values.schoolName.trim(),
		rollNumber: values.rollNumber.trim() || undefined,
		photoUrl,
		applyingForLevel: APPLYING_LEVEL[values.applyingLevel] ?? values.applyingLevel,
		yearOfExamination: Number.parseInt(values.yearOfExamination, 10),
		examinationSession: EXAM_SESSION[values.session] ?? values.session,
		examinationBoard: EXAM_BOARD[values.examinationBoard] ?? values.examinationBoard,
		studyGroup: STUDY_GROUP[values.studyGroup] ?? values.studyGroup,
		oLevelSubjects: isOLevel ? subjectRows : [],
		aLevelSubjects: isOLevel ? [] : subjectRows,
	};
}
