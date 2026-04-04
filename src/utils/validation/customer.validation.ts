import * as yup from "yup";

export interface customerForm {
	name: string;
	email: string;
	phone: string;
	address: string;
	province: string;
	city: string;
	postalCode: string;
	vin: string;
	shopId: string;
}

export const customerValidation = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email format").required("Email is required"),
	phone: yup.string().required("Phone number is required"),
	address: yup.string().required("Address is required"),
	province: yup.string().required("Province is required"),
	city: yup.string().required("City is required"),
	postalCode: yup
		.string()
		.matches(/^[0-9]{4,10}$/, "Postal code must be 4-10 digits")
		.required("Postal code is required"),
	vin: yup
		.string()
		.matches(/^[A-HJ-NPR-Z0-9]{17}$/, "VIN must be 17 characters")
		.required("VIN is required"),
	shopId: yup.string().required("Shop ID is required"),
});
