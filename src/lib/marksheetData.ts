/** Template / catalog rows — same shape as API subject lines: `name`, `grade`, `paperCode`. */
export const oLevelSubjectRows = [
	{ name: "Mathematics D (Calculator)", grade: "A*", paperCode: "4024" },
	{ name: "Physics", grade: "B", paperCode: "5054" },
	{ name: "Chemistry", grade: "C", paperCode: "5070" },
	{ name: "Biology", grade: "D", paperCode: "5090" },
	{ name: "Computer Science", grade: "E", paperCode: "2210" },
	{ name: "Combined Science", grade: "U", paperCode: "5129" },
	{ name: "Accounting", grade: "A", paperCode: "7707" },
	{ name: "Business Studies", grade: "A", paperCode: "7115" },
	{ name: "Economics", grade: "A", paperCode: "2281" },
	{ name: "Commerce", grade: "A", paperCode: "7100" },
	{ name: "Bangladesh Studies", grade: "A", paperCode: "7094" },
	{ name: "Sociology", grade: "A", paperCode: "2251" },
	{ name: "Geography", grade: "A", paperCode: "2217" },
	{ name: "ICT", grade: "B", paperCode: "7042" },
	{ name: "Islamiyat", grade: "A", paperCode: "2058" },
	{ name: "Global Perspectives", grade: "A", paperCode: "2069" },
	{ name: "Additional Mathematics", grade: "A", paperCode: "4037" },
	{ name: "English Language", grade: "A", paperCode: "1123" },
	{ name: "Bengali", grade: "A", paperCode: "3204" },
];

export const aLevelSubjectRows = [
	{ name: "Mathematics", grade: "A", paperCode: "9709" },
	{ name: "Further Mathematics", grade: "A", paperCode: "9231" },
	{ name: "Physics", grade: "A", paperCode: "9702" },
	{ name: "Chemistry", grade: "A", paperCode: "9701" },
	{ name: "Biology", grade: "A", paperCode: "9700" },
	{ name: "Computer Science", grade: "A", paperCode: "9618" },
	{ name: "Marine Science", grade: "A", paperCode: "9693" },
	{ name: "Accounting", grade: "A", paperCode: "9706" },
	{ name: "Business", grade: "A", paperCode: "9609" },
	{ name: "Economics", grade: "A", paperCode: "9708" },
	{ name: "Law", grade: "A", paperCode: "9084" },
	{ name: "Psychology", grade: "A", paperCode: "9990" },
	{ name: "Sociology", grade: "A", paperCode: "9699" },
	{ name: "English Language", grade: "A", paperCode: "9093" },
];

export const GRADE_OPTIONS = ["A*", "A", "B", "C", "D", "E", "U"];

export type MarksheetSubjectRow = { name: string; grade: string; paperCode: string };

export type MarkLine = { id: string; name: string; grade: string; paperCode: string };

export function seedLines(rows: MarksheetSubjectRow[], prefix: string): MarkLine[] {
	return rows.map((r, i) => ({
		id: `${prefix}-${i}-${r.paperCode}`,
		name: r.name,
		grade: r.grade,
		paperCode: r.paperCode,
	}));
}

export function newLine(prefix: string, nameOptions: string[]): MarkLine {
	return {
		id: `${prefix}-${crypto.randomUUID()}`,
		name: nameOptions[0] ?? "",
		grade: "A",
		paperCode: "",
	};
}
