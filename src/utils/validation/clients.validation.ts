import * as yup from "yup";

export interface ClientsForm {
	name: string;
	ownerName: string;
	email: string;
	phone: string;
	address: string;
	province: string;
	city: string;
	postalCode: string;
}

export const clientsInfoValidation = yup.object().shape({
	name: yup.string().required("Name is required"),
	ownerName: yup.string().required("Owner Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	phone: yup.string().required("Phone is required"),
	address: yup.string().required("Address is required"),
	province: yup.string().required("Province is required"),
	city: yup.string().required("City is required"),
	postalCode: yup
		.string()
		.matches(/^\d{4,10}$/, "Postal Code must be 4–10 digits")
		.required("Postal Code is required"),
});
