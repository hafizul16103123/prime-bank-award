export interface ITasks {
	total: number;
	totalPages: number;
	nextPage: any;
	pageNumber: number;
	items: Task[];
}

export interface Task {
	id: string;
	taskId: string;
	shopName: string;
	image: string;
	client: Client;
	agentId: any;
	status: string;
	createdAt: string;
	updatedAt: string;
	note?: string | null;
	state?: string;
	customerName?: string;
	phone?: string;
}

export interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	image: string;
}

export interface ITaskDetails {
	task: TaskDetails;
	taskCommunication: TaskCommunication[];
}
export interface TaskDetails {
	taskId: string;
	customerName: string;
	phone: string;
	state: string;
}

export interface TaskCommunication {
	id: string;
	taskId: string;
	message: string;
	messageFrom: string;
	clientId: string;
	agentId: any;
	createdAt: string;
	image?: string;
	updatedAt: string;
}
