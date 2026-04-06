import type { AdminStudentListItem } from "@/libes/interface/registration";
import type { Registration } from "./registration.types";

function formatSubmitted(iso: string): string {
	try {
		return new Date(iso).toLocaleDateString(undefined, {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	} catch {
		return iso;
	}
}

function normalizeStatus(raw: string): Registration["status"] {
	const s = String(raw || "").trim();
	if (s === "Approved" || s === "Pending" || s === "Declined") {
		return s;
	}
	const lower = s.toLowerCase();
	if (lower === "approved") return "Approved";
	if (lower === "declined") return "Declined";
	return "Pending";
}

export function mapAdminStudentItemToRegistration(item: AdminStudentListItem): Registration {
	return {
		id: item.id,
		student: item.name ?? "—",
		phone: item.phoneNumber ?? "—",
		school: item.school ?? "—",
		studentId: item.rollNumber ?? "—",
		level: item.applyingForLevel ?? "—",
		submitted: formatSubmitted(item.createdAt),
		status: normalizeStatus(item.status),
	};
}
