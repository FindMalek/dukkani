import { Icons } from "@dukkani/ui/components/icons";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { userAgent } from "next/server";
import { AppleSignIn } from "@/components/auth/apple-sign-in";
import { EmailSignIn } from "@/components/auth/email-sign-in";
import { FacebookSignIn } from "@/components/auth/facebook-sign-in";
import { GoogleSignIn } from "@/components/auth/google-sign-in";
import { LoginAccordion } from "@/components/auth/login-accordion";
import { AuthBackground } from "@/components/layout/auth-background";
import { Cookies } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Login | Dukkani",
};

export default async function LoginPage() {
	const cookieStore = await cookies();
	const { device } = userAgent({ headers: await headers() });
	const preferred = cookieStore.get(Cookies.PreferredSignInProvider);

	let moreSignInOptions = null;
	let preferredSignInOption =
		device?.vendor === "Apple" ? (
			<div className="flex w-full flex-col space-y-3">
				<GoogleSignIn showLastUsed={preferred?.value === "google"} />
				<AppleSignIn showLastUsed={preferred?.value === "apple"} />
			</div>
		) : (
			<GoogleSignIn
				showLastUsed={!preferred?.value || preferred?.value === "google"}
			/>
		);

	switch (preferred?.value) {
		case "apple":
			preferredSignInOption = <AppleSignIn showLastUsed={true} />;
			moreSignInOptions = (
				<>
					<GoogleSignIn />
					<FacebookSignIn />
					<EmailSignIn className="border-border border-t pt-8" />
				</>
			);
			break;

		case "facebook":
			preferredSignInOption = <FacebookSignIn showLastUsed={true} />;
			moreSignInOptions = (
				<>
					<GoogleSignIn />
					<AppleSignIn />
					<EmailSignIn className="border-border border-t pt-8" />
				</>
			);
			break;

		case "google":
			preferredSignInOption = <GoogleSignIn showLastUsed={true} />;
			moreSignInOptions = (
				<>
					<AppleSignIn />
					<FacebookSignIn />
					<EmailSignIn className="border-border border-t pt-8" />
				</>
			);
			break;

		case "email":
			preferredSignInOption = <EmailSignIn />;
			moreSignInOptions = (
				<>
					<GoogleSignIn />
					<AppleSignIn />
					<FacebookSignIn />
				</>
			);
			break;

		default:
			if (device?.vendor === "Apple") {
				moreSignInOptions = (
					<>
						<FacebookSignIn />
						<EmailSignIn className="border-border border-t pt-8" />
					</>
				);
			} else {
				moreSignInOptions = (
					<>
						<AppleSignIn />
						<FacebookSignIn />
						<EmailSignIn className="border-border border-t pt-8" />
					</>
				);
			}
	}

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left Side - Video Background */}
			<AuthBackground />

			{/* Right Side - Login Form */}
			<div className="flex w-full flex-col items-center justify-center p-8 pb-2 lg:w-1/2 lg:p-12">
				<div className="flex h-full w-full max-w-md flex-col">
					<div className="flex flex-1 flex-col justify-center space-y-8">
						{/* Header */}
						<div className="space-y-2 text-center">
							<Icons.logo className="mx-auto size-10" />
							<h1 className="font-semibold text-lg">Welcome to Dukkani</h1>
							<p className="font-sans text-[#878787] text-sm">
								Sign in or create an account
							</p>
						</div>

						{/* Sign In Options */}
						<div className="flex w-full items-center justify-center space-y-3">
							{preferredSignInOption}
						</div>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-border border-t" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-background px-2 font-sans text-[#878787]">
									or
								</span>
							</div>
						</div>

						{/* More Options Accordion */}
						<LoginAccordion>{moreSignInOptions}</LoginAccordion>
					</div>

					{/* Terms and Privacy Policy - Bottom aligned */}
					<div className="mt-auto pt-8 text-center">
						<p className="font-sans text-[#878787] text-xs">
							By signing in you agree to our{" "}
							<Link
								href="/terms"
								className="text-[#878787] underline transition-colors hover:text-foreground"
							>
								Terms of service
							</Link>{" "}
							&{" "}
							<Link
								href="/policy"
								className="text-[#878787] underline transition-colors hover:text-foreground"
							>
								Privacy policy
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
