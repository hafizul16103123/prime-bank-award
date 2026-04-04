export interface IDashboard {
	userCount: number;
	shopCount: number;
	agentCount: number;
	appointmentCount: number;
	taskStatusPrecentage: TaskStatusPrecentage[];
	appointmentCountMonthly: AppointmentCountMonthly[];
}

export interface TaskStatusPrecentage {
	status: string;
	count: number;
	percentage: number;
}

export interface AppointmentCountMonthly {
	count: number;
	month: string;
	year: number;
}
