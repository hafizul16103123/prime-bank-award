export interface IAgents {
	total: number;
	totalPages: number;
	nextPage: any;
	pageNumber: number;
	items: Agent[];
}

export interface Agent {
	id: string;
	agentId: string;
	userId: string;
	name: string;
	image: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	isBlocked: boolean;
	totalClient: number;
	totalCompletedTask: number;
	totalServices: number;
}
