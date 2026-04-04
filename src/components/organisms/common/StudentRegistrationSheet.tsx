"use client";

import { FormField, SelectInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
	GRADE_OPTIONS,
	aLevelSubjectRows,
	newLine,
	oLevelSubjectRows,
	seedLines,
	type MarkLine,
} from "@/lib/marksheetData";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Registration } from "../Dashboard/Winners/winner.types";

type Props = {
	student: Registration | null;
	onOpenChange: (open: boolean) => void;
};

export const StudentRegistrationSheet = ({ student, onOpenChange }: Props) => {
	const open = student !== null;

	const oNames = useMemo(() => oLevelSubjectRows.map((r) => r.subject), []);
	const aNames = useMemo(() => aLevelSubjectRows.map((r) => r.subject), []);

	const [oLines, setOLines] = useState<MarkLine[]>(() => seedLines(oLevelSubjectRows, "o"));
	const [aLines, setALines] = useState<MarkLine[]>(() => seedLines(aLevelSubjectRows, "a"));

	useEffect(() => {
		if (!student) return;
		setOLines(seedLines(oLevelSubjectRows, "o"));
		setALines(seedLines(aLevelSubjectRows, "a"));
	}, [student?.id]);

	const patchO = (id: string, patch: Partial<MarkLine>) =>
		setOLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
	const patchA = (id: string, patch: Partial<MarkLine>) =>
		setALines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				overlayClassName="bg-foreground/30 backdrop-blur-[2px]"
				className={cn(
					"flex h-full max-h-[100dvh] min-h-0 w-full max-w-[500px] flex-col gap-0 overflow-hidden border-l bg-background p-0 text-foreground shadow-xl",
					"data-[side=right]:w-full data-[side=right]:sm:max-w-[500px]",
					"animate-in slide-in-from-right duration-200",
				)}
			>
				{student ? (
					<>
						<SheetHeader className="shrink-0 space-y-1 px-6 pt-6 pb-4">
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
								<div className="flex items-end justify-between gap-3 rounded-lg border border-tartiary p-4">
									<div className="size-28 overflow-hidden rounded-lg bg-muted">
										<img
											src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
											alt="Student"
											className="size-full object-cover"
										/>
									</div>
									<Button type="button" variant="outline" size="sm" className="gap-1.5 bg-frost">
										<Upload className="size-3.5" />
										Replace Image
									</Button>
								</div>

								<div className="rounded-lg border border-tartiary p-4">
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

								<div className="rounded-lg border border-tartiary p-4">
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

								<div className="rounded-lg border border-tartiary p-4">
									<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
									<p className="mb-3 text-xs text-muted-foreground">O-Level Subjects</p>
									<div className="gap-3 grid sm:grid-cols-12 bg-tartiary/60 rounded-md border border-tartiary p-2 mb-3">
										<div className="min-w-0 sm:col-span-6">
											<span>Subject</span>
										</div>
										<div className="min-w-0 sm:col-span-3">
											<span>Grade</span>
										</div>
										<div className="min-w-0 sm:col-span-3">
											<span>Paper Code</span>
										</div>
									</div>
									<div className="space-y-3">
										{oLines.map((line) => (
											<div
												key={line.id}
												className="grid grid-cols-1 items-end gap-3 sm:grid-cols-12"
											>
												<div className="min-w-0 sm:col-span-6">
													<SelectInput
														options={oNames}
														value={line.subject}
														onValueChange={(v) => patchO(line.id, { subject: v })}
														placeholder="Select subject"
													/>
												</div>
												<div className="min-w-0 sm:col-span-3">
													<SelectInput
														options={GRADE_OPTIONS}
														value={line.grade}
														onValueChange={(v) => patchO(line.id, { grade: v })}
														placeholder="Select grade"
													/>
												</div>
												<div className="min-w-0 sm:col-span-3">
													<FormField
														value={line.code}
														readOnly={false}
														onChange={(e) => patchO(line.id, { code: e.target.value })}
													/>
												</div>
											</div>
										))}
									</div>
									<Button
										type="button"
										variant="outline"
										size="lg"
										className="mt-2 gap-1.5 !bg-frost"
										onClick={() => setOLines((prev) => [...prev, newLine("o", oNames)])}
									>
										+ Add Subject
									</Button>
								</div>

								<div className="rounded-lg border border-tartiary p-4">
									<h3 className="mb-2 text-sm font-semibold text-foreground">Marksheet</h3>
									<p className="mb-3 text-xs text-muted-foreground">A-Level Subjects</p>
									<div className="gap-3 grid sm:grid-cols-12 bg-tartiary/60 rounded-md border border-tartiary p-2 mb-3">
										<div className="min-w-0 sm:col-span-6">
											<span>Subject</span>
										</div>
										<div className="min-w-0 sm:col-span-3">
											<span>Grade</span>
										</div>
										<div className="min-w-0 sm:col-span-3">
											<span>Paper Code</span>
										</div>
									</div>
									<div className="space-y-3">
										{aLines.map((line) => (
											<div
												key={line.id}
												className="grid grid-cols-1 items-end gap-3 rounded-lg sm:grid-cols-12"
											>
												<div className="min-w-0 sm:col-span-6">
													<SelectInput
														options={aNames}
														value={line.subject}
														onValueChange={(v) => patchA(line.id, { subject: v })}
														placeholder="Select subject"
													/>
												</div>
												<div className="min-w-0 sm:col-span-3">
													<SelectInput
														options={GRADE_OPTIONS}
														value={line.grade}
														onValueChange={(v) => patchA(line.id, { grade: v })}
														placeholder="Select grade"
													/>
												</div>
												<div className="min-w-0 sm:col-span-3">
													<FormField
														value={line.code}
														readOnly={false}
														onChange={(e) => patchA(line.id, { code: e.target.value })}
													/>
												</div>
											</div>
										))}
									</div>
									<Button
										type="button"
										variant="outline"
										size="lg"
										className="mt-2 gap-1.5 !bg-frost"
										onClick={() => setALines((prev) => [...prev, newLine("a", aNames)])}
									>
										+ Add Subject
									</Button>
								</div>

								<div className="space-y-2 pb-4">
									<Button
										type="button"
										variant="outline"
										className="h-10 w-full rounded-md border border-[#002E66] bg-frost text-sm font-medium"
									>
										Update Information
									</Button>
									<Button
										type="button"
										className="h-10 w-full rounded-md bg-[#002E66] text-sm font-medium"
									>
										Approve Now
									</Button>
									<div className="flex items-center gap-2">
										<select className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50">
											<option>Select a reason to decline</option>
										</select>
										<Button
											type="button"
											className="h-10 shrink-0 rounded-md bg-[#FFB0B0] px-6 text-sm font-medium text-[#B00000] hover:bg-[#FFB0B0]/90"
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
