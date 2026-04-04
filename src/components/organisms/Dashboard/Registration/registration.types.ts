export interface Registration {
	id: number;
	student: string;
	phone: string;
	school: string;
	studentId: string;
	level: string;
	submitted: string;
	status: "Pending" | "Approved" | "Declined";
}
