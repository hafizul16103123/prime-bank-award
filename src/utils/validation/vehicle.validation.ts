import * as yup from "yup";

export interface VehicleFormType {
	vin: string;
	licensePlate: string;
}

export const vehicleFormValidation = yup.object().shape({
	vin: yup
		.string()
		.required("VIN is required")
		.matches(/^[A-HJ-NPR-Z0-9]{17}$/, "VIN must be 17 characters"),
	licensePlate: yup.string().required("License plate is required"),
});
