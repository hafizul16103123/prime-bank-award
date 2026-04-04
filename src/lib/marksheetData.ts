export const oLevelSubjectRows = [
	{ subject: "Mathematics D (Calculator)", grade: "A*", code: "4024" },
	{ subject: "Physics", grade: "B", code: "5054" },
	{ subject: "Chemistry", grade: "C", code: "5070" },
	{ subject: "Biology", grade: "D", code: "5090" },
	{ subject: "Computer Science", grade: "E", code: "2210" },
	{ subject: "Combined Science", grade: "U", code: "5129" },
	{ subject: "Accounting", grade: "A", code: "7707" },
	{ subject: "Business Studies", grade: "A", code: "7115" },
	{ subject: "Economics", grade: "A", code: "2281" },
	{ subject: "Commerce", grade: "A", code: "7100" },
	{ subject: "Bangladesh Studies", grade: "A", code: "7094" },
	{ subject: "Sociology", grade: "A", code: "2251" },
	{ subject: "Geography", grade: "A", code: "2217" },
	{ subject: "ICT", grade: "B", code: "7042" },
	{ subject: "Islamiyat", grade: "A", code: "2058" },
	{ subject: "Global Perspectives", grade: "A", code: "2069" },
	{ subject: "Additional Mathematics", grade: "A", code: "4037" },
	{ subject: "English Language", grade: "A", code: "1123" },
	{ subject: "Bengali", grade: "A", code: "3204" },
];

export const aLevelSubjectRows = [
	{ subject: "Mathematics", grade: "A", code: "9709" },
	{ subject: "Further Mathematics", grade: "A", code: "9231" },
	{ subject: "Physics", grade: "A", code: "9702" },
	{ subject: "Chemistry", grade: "A", code: "9701" },
	{ subject: "Biology", grade: "A", code: "9700" },
	{ subject: "Computer Science", grade: "A", code: "9618" },
	{ subject: "Marine Science", grade: "A", code: "9693" },
	{ subject: "Accounting", grade: "A", code: "9706" },
	{ subject: "Business", grade: "A", code: "9609" },
	{ subject: "Economics", grade: "A", code: "9708" },
	{ subject: "Law", grade: "A", code: "9084" },
	{ subject: "Psychology", grade: "A", code: "9990" },
	{ subject: "Sociology", grade: "A", code: "9699" },
	{ subject: "English Language", grade: "A", code: "9093" },
];

export const GRADE_OPTIONS = ["A*", "A", "B", "C", "D", "E", "U"];

export type MarkLine = { id: string; subject: string; grade: string; code: string };

export function seedLines(rows: { subject: string; grade: string; code: string }[], prefix: string): MarkLine[] {
	return rows.map((r, i) => ({
		id: `${prefix}-${i}-${r.code}`,
		subject: r.subject,
		grade: r.grade,
		code: r.code,
	}));
}

export function newLine(prefix: string, subjectOptions: string[]): MarkLine {
	return {
		id: `${prefix}-${crypto.randomUUID()}`,
		subject: subjectOptions[0] ?? "",
		grade: "A",
		code: "",
	};
}
