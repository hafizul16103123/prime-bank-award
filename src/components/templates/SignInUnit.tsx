"use client";

import { signinValidation } from "@/utils/validation/signin.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FormInputField } from "../molecules";

interface FormValues {
	email: string;
	password: string;
}
export const SignInUnit = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(signinValidation),
	});

	const handleLogin = () => {};
	return (
		<div className="min-h-screen flex  justify-center bg-background mt-[52px]">
			<div className="relative w-full max-w-[1100px] rounded-[20px] overflow-hidden ">
				<Image
					src="/images/login_img.jpg"
					alt=""
					width={1000}
					height={1000}
					className="absolute inset-0 w-full h-auto object-cover"
				/>

				<div className="relative z-10 flex flex-col items-center py-12 px-4 min-h-[560px]">
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

						<form onSubmit={handleLogin} className="space-y-4">
							<FormInputField control={control} name="email" label="Email" placeholder="m@example.com" />
							<FormInputField
								control={control}
								name="password"
								label="Password"
								placeholder="••••••••"
								type="password"
							/>

							<button
								type="submit"
								className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
							>
								Login
							</button>
						</form>

						<p className="text-center text-sm text-muted-foreground mt-5">
							Don't have an account?{" "}
							<a href="#" className="text-foreground font-medium hover:underline">
								Sign up
							</a>
						</p>
					</div>

					{/* Footer */}
					<p className="text-primary-foreground/80 text-xs mt-6 text-center">
						By clicking continue, you agree to our{" "}
						<a href="#" className="underline hover:text-primary-foreground">
							Terms of Service
						</a>{" "}
						and{" "}
						<a href="#" className="underline hover:text-primary-foreground">
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
};
