import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface AcademicInfoStepProps {
	onNext: () => void;
	onBack: () => void;
}

interface SubjectRow {
	id: number;
	subject: string;
	grade: string;
	paperCode: string;
}

export const AcademicInfoStep = ({ onNext, onBack }: AcademicInfoStepProps) => {
	const [subjects, setSubjects] = useState<SubjectRow[]>([
		{ id: 1, subject: "", grade: "", paperCode: "" },
		{ id: 2, subject: "", grade: "", paperCode: "" },
		{ id: 3, subject: "", grade: "", paperCode: "" },
		{ id: 4, subject: "", grade: "", paperCode: "" },
		{ id: 5, subject: "", grade: "", paperCode: "" },
		{ id: 6, subject: "", grade: "", paperCode: "" },
	]);

	const addSubject = () => {
		setSubjects([...subjects, { id: Date.now(), subject: "", grade: "", paperCode: "" }]);
	};

	const removeSubject = (id: number) => {
		if (subjects.length > 1) setSubjects(subjects.filter((s) => s.id !== id));
	};

	const subjectOptions = [
		"Mathematics (D2/Compulsory)",
		"Physics",
		"Chemistry",
		"Biology",
		"Computer Science",
		"Economics",
		"Business Studies",
		"English Language",
		"Bangla",
	];

	const gradeOptions = ["A*", "A", "B", "C", "D", "E", "F", "U"];

	return (
		<div className="space-y-6">
			{/* Academic Info Card */}
			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">Academic Information</h2>
				<p className="mb-6 text-sm text-muted-foreground">Enter your Academic Information.</p>

				<div className="grid gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<Label>Applying for Level</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="o-level">O Level</SelectItem>
								<SelectItem value="a-level">A Level</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Year of Examination</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="2025">2025</SelectItem>
								<SelectItem value="2024">2024</SelectItem>
								<SelectItem value="2023">2023</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Study Group</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="science">Science</SelectItem>
								<SelectItem value="commerce">Commerce</SelectItem>
								<SelectItem value="arts">Arts</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Session</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="may-june">May/June</SelectItem>
								<SelectItem value="oct-nov">Oct/Nov</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Roll Number</Label>
						<Input placeholder="0000000000" />
					</div>
					<div className="space-y-2">
						<Label>Examination Board</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="cambridge">Cambridge (CIE)</SelectItem>
								<SelectItem value="edexcel">Edexcel</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2 sm:col-span-2">
						<Label>School Name</Label>
						<Input placeholder="Search school..." />
					</div>
				</div>
			</div>

			{/* Subjects Marksheet */}
			<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
				<h2 className="text-lg font-bold text-foreground">O-Level Subjects – Marksheet</h2>
				<p className="mb-4 text-sm text-muted-foreground">
					Enter your examination results. Add each subject and the corresponding grade.
				</p>

				<div className="space-y-3">
					{/* Header */}
					<div className="grid grid-cols-[1fr_100px_100px_40px] gap-3 text-xs font-semibold text-muted-foreground">
						<span>Subject</span>
						<span>Grade</span>
						<span>Paper Code</span>
						<span />
					</div>

					{subjects.map((row) => (
						<div key={row.id} className="grid grid-cols-[1fr_100px_100px_40px] gap-3">
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select subject" />
								</SelectTrigger>
								<SelectContent>
									{subjectOptions.map((s) => (
										<SelectItem key={s} value={s}>
											{s}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="—" />
								</SelectTrigger>
								<SelectContent>
									{gradeOptions.map((g) => (
										<SelectItem key={g} value={g}>
											{g}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Input placeholder="Code" />
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-destructive"
								onClick={() => removeSubject(row.id)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>

				<Button
					variant="outline"
					className="mt-4 gap-2 border-accent text-accent hover:bg-accent/10"
					onClick={addSubject}
				>
					<Plus className="h-4 w-4" /> Add Subject
				</Button>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={onBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" /> Back
				</Button>
				<Button onClick={onNext} size="lg" className="gap-2">
					Next: Confirm & Submit <ArrowRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
