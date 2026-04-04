import { FormField, ReusableTable } from "@/components/molecules";
import { StudentInfo } from "@/components/organisms";
import { TableCell, TableRow } from "@/components/ui/table";
import { aLevelSubjectRows, oLevelSubjectRows } from "@/lib/marksheetData";

const marksheetTableHeader = ["Subject", "Grade", "Paper Code"];

export const MyApplicationUnit = () => {
	return (
		<div className="space-y-4">
			<StudentInfo />

			<div className="rounded-lg border border-tartiary bg-white p-4">
				<h3 className="mb-4 text-sm font-semibold text-foreground">Personal Information</h3>
				<div className="space-y-3">
					<FormField label="Full Name" value="Neamul Kabir Sabbir" />
					<div className="grid grid-cols-2 gap-3">
						<FormField label="Phone Number" value="+880 1700-000000" />
						<FormField label="Gender" value="Male" />
					</div>
					<FormField label="Email Address" value="example@gmail.com" />
					<FormField label="Date of Birth" value="24/01/2007" />
				</div>
			</div>

			<div className="rounded-lg border border-tartiary bg-white p-4">
				<h3 className="mb-4 text-sm font-semibold text-foreground">Academic Information</h3>
				<div className="space-y-3">
					<FormField label="School Name" value="Ideal School & College" />
					<div className="grid grid-cols-2 gap-3">
						<FormField label="Roll Number" value="G16Apr1" />
						<FormField label="Applying for Level" value="O Level" />
					</div>
					<div className="grid grid-cols-2 gap-3">
						<FormField label="Year of Examination" value="2025" />
						<FormField label="Study Group" value="Science" />
					</div>
					<div className="grid grid-cols-2 gap-3">
						<FormField label="Session" value="May–June" />
						<FormField label="Examination Board" value="Cambridge (CIE)" />
					</div>
				</div>
			</div>

			<div className="rounded-lg border border-tartiary bg-white p-4">
				<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
				<p className="mb-3 text-xs text-muted-foreground">O-Level Subjects</p>
				<ReusableTable
					variant="default"
					tableHeader={marksheetTableHeader}
					data={oLevelSubjectRows}
					emptyMessage="No subjects."
				>
					{oLevelSubjectRows.map((row, i) => (
						<TableRow key={`o-${row.code}-${i}`}>
							<TableCell className="max-w-[280px] py-3 text-sm text-foreground whitespace-normal">
								{row.subject}
							</TableCell>
							<TableCell className="py-3 text-sm text-foreground">{row.grade}</TableCell>
							<TableCell className="py-3 text-sm text-foreground">{row.code}</TableCell>
						</TableRow>
					))}
				</ReusableTable>
			</div>

			<div className="rounded-lg border border-tartiary bg-white p-4">
				<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
				<p className="mb-3 text-xs text-muted-foreground">A-Level Subjects</p>
				<ReusableTable
					variant="default"
					tableHeader={marksheetTableHeader}
					data={aLevelSubjectRows}
					emptyMessage="No subjects."
				>
					{aLevelSubjectRows.map((row, i) => (
						<TableRow key={`a-${row.code}-${i}`}>
							<TableCell className="max-w-[280px] py-3 text-sm text-foreground whitespace-normal">
								{row.subject}
							</TableCell>
							<TableCell className="py-3 text-sm text-foreground">{row.grade}</TableCell>
							<TableCell className="py-3 text-sm text-foreground">{row.code}</TableCell>
						</TableRow>
					))}
				</ReusableTable>
			</div>
		</div>
	);
};
