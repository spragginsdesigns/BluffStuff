"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				elements: {
					formButtonPrimary:
						"bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-sm normal-case",
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
		>
			<NextUIProvider>{children}</NextUIProvider>
		</ClerkProvider>
	);
}
