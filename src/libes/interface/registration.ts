export interface AdminStudentStatsData {
	total: number;
	Pending: number;
	Approved: number;
	Declined: number;
	Awarded?: number;
}

export interface AdminStudentSubject {
	name: string;
	grade: string;
	paperCode: string;
}
export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface IRegistrationLists {
	items: AdminStudentListItem[];
	pagination: Pagination;
}

export interface AdminStudentListItem {
	id: string;
	userId: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	phoneNumber: string;
	email: string;
	school?: string;
	rollNumber: string;
	photoUrl?: string;
	applyingForLevel: string;
	yearOfExamination: number;
	examinationSession: string;
	examinationBoard: string;
	studyGroup: string;
	oLevelSubjects: AdminStudentSubject[];
	aLevelSubjects: AdminStudentSubject[];
	status: string;
	createdAt: string;
	updatedAt: string;
}

export interface AdminStudentsPagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface AdminStudentsListData {
	items: AdminStudentListItem[];
	pagination: AdminStudentsPagination;
}
