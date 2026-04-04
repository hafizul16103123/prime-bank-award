import * as Yup from "yup";

export interface TaskFromValue {
	customerName: string;
	phone: string;
	email: string;
	clientId: string;
	vin: string;
	taskId: string;
	appointmentDate: string;
	services: {
		name: string;
		slug: string;
	}[];
}

export const TaskValidation = Yup.object().shape({
	customerName: Yup.string().trim().required("Customer name is required"),
	phone: Yup.string().required("Phone number is required"),
	email: Yup.string().email("Invalid email format").required("Email is required"),
	clientId: Yup.string().required("Client ID is required"),
	vin: Yup.string().min(10, "VIN must be at least 10 characters").required("VIN is required"),
	taskId: Yup.string().required("Task ID is required"),
	appointmentDate: Yup.string().required("Appointment date is required"),
	services: Yup.array()
		.of(
			Yup.object().shape({
				name: Yup.string().required("Service name is required"),
				slug: Yup.string().required("Service slug is required"),
			})
		)
		.min(1, "At least one service is required")
		.required("Services are required"),
});
