import { ReusableTable } from "@/components/molecules";
import { TableCell, TableRow } from "@/components/ui";
import { aLevelSubjectRows, oLevelSubjectRows } from "@/lib/marksheetData";

const marksheetTableHeader = ["Subject", "Grade", "Paper Code"];

export const StudentMarksheet = () => {
	return (
		<div>
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

			<div className="rounded-lg border border-tartiary bg-white p-4 mt-4">
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
