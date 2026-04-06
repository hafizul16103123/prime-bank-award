"use client";

import { Form } from "@/components/ui/form";
import { useApiClient } from "@/libes/hooks";
import { toastError, toastSuccess } from "@/utils/helpers/toast.helpers";
import { signinValidation } from "@/utils/validation/signin.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormInputField } from "../molecules";
import { Button } from "../ui";

interface FormValues {
	email: string;
	password: string;
}
export const SignInUnit = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	console.log({ token });

	const { post } = useApiClient();

	const methods = useForm<FormValues>({
		resolver: yupResolver(signinValidation),
		defaultValues: { email: "", password: "" },
	});

	const { control, handleSubmit } = methods;

	const handleLogin = async (_data: FormValues) => {
		try {
			const { data, status } = await post("API_URL", "login", _data);
			if (status === 201) {
				toastSuccess({ message: "Login successfully" });
			}
		} catch (err) {
			console.log(err);
			toastError({
				message: err instanceof AxiosError ? err.response?.data?.message[0] : err,
			});
		}
	};

	const handleVerifyEmail = async () => {
		try {
			const { data, status } = await post("API_URL", "verify-email", { token });
		} catch (err) {
			toastError({
				message: err instanceof AxiosError ? err.response?.data?.message[0] : err,
			});
		}
	};

	useEffect(() => {
		if (token) handleVerifyEmail();
	}, [token]);

	return (
		<div className="min-h-screen flex  justify-center bg-background pt-[52px]">
			<div className="relative w-full max-w-[1440px]  overflow-hidden ">
				<Image
					src="/images/login_img.jpg"
					alt=""
					width={1000}
					height={1000}
					className="absolute inset-0 w-[1440px] h-[600px] 2xl:h-auto object-cover rounded-[20px]"
				/>

				<div className="relative z-10 flex flex-col items-center py-12 px-4">
					<div className="flex items-center gap-2 mb-8">
						<Image
							src="/prime_logo.png"
							alt="Prime Bank Logo"
							width={200}
							height={200}
							className="w-[172px] h-auto"
						/>
					</div>

					<div className="bg-card rounded-xl  w-full max-w-[362px] p-6">
						<h1 className="text-lg font-medium text-[#09090B] text-center">Welcome back</h1>
						<p className="text-[#09090B] text-center mt-1 mb-6 text-sm">Sign in to access your account</p>

						<Form {...methods}>
							<form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
								<FormInputField
									control={control}
									name="email"
									label="Email"
									placeholder="m@example.com"
								/>
								<FormInputField
									control={control}
									name="password"
									label="Password"
									placeholder="••••••••"
									type="password"
								/>

								<Button
									type="submit"
									size={"lg"}
									className="w-full rounded-lg bg-primary !py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
								>
									Login
								</Button>
							</form>
						</Form>

						<p className="text-center text-sm text-[#09090B] mt-4">
							Don't have an account?{" "}
							<Link href="/registration" className="text-foreground underline">
								Sign up
							</Link>
						</p>
					</div>

					{/* Footer */}
					<p className="text-white text-sm mt-6 text-center w-[260px]">
						By clicking continue, you agree to our{" "}
						<Link href="#" className="underline hover:text-primary-foreground">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link href="#" className="underline hover:text-primary-foreground">
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};
