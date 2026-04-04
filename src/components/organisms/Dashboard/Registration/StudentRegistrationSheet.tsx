"use client";

import { FormField } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import type { Registration } from "./registration.types";

const oLevelSubjects = [
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

const aLevelSubjects = [
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

function MarksheetTable({ subjects }: { subjects: { subject: string; grade: string; code: string }[] }) {
	return (
		<div className="overflow-hidden rounded-md border border-border">
			<Table>
				<TableHeader>
					<TableRow className="border-0 hover:bg-transparent">
						<TableHead className="h-9 bg-muted px-3 py-2 text-left text-xs font-medium">Subject</TableHead>
						<TableHead className="h-9 bg-muted px-3 py-2 text-left text-xs font-medium">Grade</TableHead>
						<TableHead className="h-9 bg-muted px-3 py-2 text-left text-xs font-medium">
							Paper Code
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subjects.map((s, i) => (
						<TableRow key={i} className="border-t border-border">
							<TableCell className="px-3 py-1.5 text-xs whitespace-normal">{s.subject}</TableCell>
							<TableCell className="px-3 py-1.5 text-xs">{s.grade}</TableCell>
							<TableCell className="px-3 py-1.5 text-xs">{s.code}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

type Props = {
	student: Registration | null;
	onOpenChange: (open: boolean) => void;
};

export const StudentRegistrationSheet = ({ student, onOpenChange }: Props) => {
	const open = student !== null;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				overlayClassName="bg-foreground/30 backdrop-blur-[2px]"
				className={cn(
					"flex h-full max-h-[100dvh] min-h-0 w-full max-w-md flex-col gap-0 overflow-hidden border-l bg-background p-0 text-foreground shadow-xl",
					"data-[side=right]:w-full data-[side=right]:sm:max-w-md",
					"animate-in slide-in-from-right duration-200",
				)}
			>
				{student ? (
					<>
						<SheetHeader className="shrink-0 space-y-1  px-6 pt-6 pb-4">
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
								onClick={() => onOpenChange(false)}
							>
								<X className="size-5" />
								<span className="sr-only">Close</span>
							</Button>
							<SheetDescription className="mb-0 text-sm text-[#005EB0]">Application</SheetDescription>
							<SheetTitle className="text-2xl font-medium text-foreground">
								Student Registration
							</SheetTitle>
						</SheetHeader>

						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
							<div className="space-y-8">
								<div className="flex justify-between items-end gap-3 border border-tartiary rounded-lg p-4">
									<div className="size-28 overflow-hidden rounded-lg bg-muted">
										<img
											src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
											alt="Student"
											className="size-full object-cover"
										/>
									</div>
									<Button type="button" variant="outline" size="sm" className="gap-1.5 bg-frost ">
										<Upload className="size-3.5" />
										Replace Image
									</Button>
								</div>

								<div className="border border-tartiary rounded-lg p-4">
									<h3 className="mb-4 text-sm font-semibold text-foreground">Personal Information</h3>
									<div className="space-y-3">
										<FormField label="Full Name" value={student.student} />
										<div className="grid grid-cols-2 gap-3">
											<FormField label="Phone Number" value={student.phone} />
											<FormField label="Gender" value="Male" />
										</div>
										<FormField label="Email Address" value="example@gmail.com" />
										<FormField label="Date of Birth" value="24/01/2007" />
									</div>
								</div>

								<div>
									<h3 className="mb-4 text-sm font-semibold text-foreground">Academic Information</h3>
									<div className="space-y-3">
										<FormField label="School Name" value={student.school} />
										<div className="grid grid-cols-2 gap-3">
											<FormField label="Roll Number" value="G16Apr1" />
											<FormField label="Applying for Level" value={student.level} />
										</div>
										<div className="grid grid-cols-2 gap-3">
											<FormField label="Year of Examination" value="2025" />
											<FormField label="Study Group" value="Science" />
										</div>
										<div className="grid grid-cols-2 gap-3">
											<FormField label="Session" value="May-June" />
											<FormField label="Examination Board" value="Cambridge (CIE)" />
										</div>
									</div>
								</div>

								<div>
									<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
									<p className="mb-3 text-xs text-muted-foreground">O-Level Subjects</p>
									<MarksheetTable subjects={oLevelSubjects} />
									<Button type="button" variant="link" className="mt-2 h-auto p-0 text-primary">
										+ Add Subject
									</Button>
								</div>

								<div>
									<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
									<p className="mb-3 text-xs text-muted-foreground">A-Level Subjects</p>
									<MarksheetTable subjects={aLevelSubjects} />
									<Button type="button" variant="link" className="mt-2 h-auto p-0 text-primary">
										+ Add Subject
									</Button>
								</div>

								<div className="space-y-2 pb-4">
									<Button
										type="button"
										variant="outline"
										className="h-10 w-full rounded-md text-sm font-medium"
									>
										Update Information
									</Button>
									<Button type="button" className="h-10 w-full rounded-md text-sm font-medium">
										Approve Now
									</Button>
									<div className="flex items-center gap-2">
										<select className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50">
											<option>Select a reason to decline</option>
										</select>
										<Button
											type="button"
											className="h-10 shrink-0 rounded-md bg-destructive px-6 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
										>
											Decline
										</Button>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
};
