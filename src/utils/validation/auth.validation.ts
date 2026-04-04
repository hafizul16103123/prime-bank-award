import * as yup from "yup";

export interface SignUpType {
	name: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface SigninType {
	email: string;
	password: string;
}

export const signUpSchema = yup.object().shape({
	name: yup.string().required("Name is required"),

	phone: yup.string().required("Phone number is required"),

	email: yup.string().email("Please enter a valid email").required("Email is required"),

	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters long")
		.matches(/[a-z]/, "Must include at least one lowercase letter")
		.matches(/[A-Z]/, "Must include at least one uppercase letter")
		.matches(/[^a-zA-Z0-9]/, "Must include at least one special character"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords do not match")
		.required("Confirm password is required"),
});

export const signInSchema = yup.object().shape({
	email: yup.string().email("Please enter a valid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});
