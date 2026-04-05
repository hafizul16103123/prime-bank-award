import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ThankYouStep = () => {
	return (
		<div className="flex items-center justify-center py-6 sm:py-8 md:py-9 lg:py-10 xl:py-10">
			<div className="w-full max-w-xl rounded-2xl border border-border bg-default p-6 text-center shadow-sm sm:p-8 md:p-9 lg:p-10 xl:p-10">
				<h1 className="text-2xl  text-[#212121] sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">Thank you!</h1>
				<p className="mt-3 text-sm text-[#212121] sm:mt-4 sm:text-base md:text-lg lg:text-lg xl:text-lg md:leading-[25px] leading-[20px] sm:leading-[30px]">
					Your registration for the O &amp; A Level Awards is almost complete. We've sent a verification link
					to your inbox.
				</p>

				<div className="mx-auto mt-6 max-w-md rounded-2xl bg-accent/10 px-4 py-4 text-center sm:mt-8 sm:px-6 sm:py-5 md:px-6 lg:px-6 xl:px-6">
					<p className="text-xs text-[#212121] sm:text-sm md:text-base lg:text-base xl:text-xl">
						Please check your email and click <span className="font-bold text-primary">"Verify Now"</span>{" "}
						to activate your account.
					</p>
				</div>

				<div className="mt-6 sm:mt-8 md:mt-8 lg:mt-8 xl:mt-8">
					<Button
						size="lg"
						className="w-full gap-2 rounded-full bg-primary px-8 text-sm text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-10 sm:text-base md:text-base lg:text-base xl:text-base"
						onClick={() => window.open("https://mail.google.com", "_blank")}
					>
						Open My Inbox <ArrowRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="mt-6 space-y-1">
					<p className="text-sm text-muted-foreground">
						Didn't receive the email?{" "}
						<button className="font-semibold text-primary hover:underline">"Resend Verification"</button>
					</p>
					<p className="text-xs text-muted-foreground">Don't forget to check your spam folder!</p>
				</div>
			</div>
		</div>
	);
};
