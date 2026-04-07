import { ReusableTable } from "@/components/molecules";
import { TableCell, TableRow } from "@/components/ui";
import { AdminStudentListItem } from "@/libes/interface/registration";

const marksheetTableHeader = ["Subject", "Grade", "Paper Code"];

export const StudentMarksheet = ({ data }: { data: AdminStudentListItem | null }) => {
	return (
		<div className="space-y-4">
			{data && data?.oLevelSubjects?.length > 0 && (
				<div className="rounded-lg border border-tartiary bg-white p-4">
					<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
					<p className="mb-3 text-xs text-muted-foreground">{data?.applyingForLevel} Subjects</p>
					<div className="-mx-4 overflow-x-auto px-4">
						<ReusableTable
							variant="default"
							tableHeader={marksheetTableHeader}
							data={data?.oLevelSubjects}
							emptyMessage="No subjects."
						>
							{data?.oLevelSubjects.map((row, i) => (
								<TableRow key={`o-${row.paperCode}-${i}`}>
									<TableCell className="max-w-[280px] whitespace-normal py-3 text-sm text-foreground">
										{row.name}
									</TableCell>
									<TableCell className="whitespace-nowrap py-3 text-sm text-foreground">{row.grade}</TableCell>
									<TableCell className="whitespace-nowrap py-3 text-sm text-foreground">{row.paperCode}</TableCell>
								</TableRow>
							))}
						</ReusableTable>
					</div>
				</div>
			)}

			{data && data?.aLevelSubjects?.length > 0 && (
				<div className="rounded-lg border border-tartiary bg-white p-4">
					<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
					<p className="mb-3 text-xs text-muted-foreground">A-Level Subjects</p>
					<div className="-mx-4 overflow-x-auto px-4">
						<ReusableTable
							variant="default"
							tableHeader={marksheetTableHeader}
							data={data?.aLevelSubjects}
							emptyMessage="No subjects."
						>
							{data?.aLevelSubjects?.map((row, i) => (
								<TableRow key={`a-${row.paperCode}-${i}`}>
									<TableCell className="max-w-[280px] whitespace-normal py-3 text-sm text-foreground">
										{row.name}
									</TableCell>
									<TableCell className="whitespace-nowrap py-3 text-sm text-foreground">{row.grade}</TableCell>
									<TableCell className="whitespace-nowrap py-3 text-sm text-foreground">{row.paperCode}</TableCell>
								</TableRow>
							))}
						</ReusableTable>
					</div>
				</div>
			)}
		</div>
	);
};
