import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ThankYouStep = () => {
	return (
		<div className="flex items-center justify-center py-10">
			<div className="w-full max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
				<h1 className="text-4xl font-bold text-foreground sm:text-5xl">Thank you!</h1>
				<p className="mt-4 text-base text-muted-foreground sm:text-lg">
					Your registration for the O &amp; A Level Awards is almost complete. We've sent a verification link
					to your inbox.
				</p>

				<div className="mx-auto mt-8 max-w-md rounded-2xl bg-accent/10 px-6 py-5 text-center">
					<p className="text-sm text-muted-foreground sm:text-base">
						Please check your email and click <span className="font-bold text-primary">"Verify Now"</span>{" "}
						to activate your account.
					</p>
				</div>

				<div className="mt-8">
					<Button
						size="lg"
						className="gap-2 rounded-full bg-primary px-10 text-primary-foreground hover:bg-primary/90"
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
