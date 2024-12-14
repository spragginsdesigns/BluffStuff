"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<SignUp
				appearance={{
					elements: {
						formButtonPrimary:
							"bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
						card: "bg-gray-900 border border-gray-800",
						headerTitle: "text-white",
						headerSubtitle: "text-gray-400",
						socialButtonsBlockButton:
							"bg-gray-800 border border-gray-700 hover:bg-gray-700",
						socialButtonsBlockButtonText: "text-white font-normal",
						formFieldInput: "bg-gray-800 border-gray-700 text-white",
						formFieldLabel: "text-gray-300",
						footerActionText: "text-gray-400",
						footerActionLink: "text-purple-400 hover:text-purple-300",
						identityPreviewText: "text-white",
						identityPreviewEditButtonIcon: "text-purple-400"
					}
				}}
			/>
		</div>
	);
}
