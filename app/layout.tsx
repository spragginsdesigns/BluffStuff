import Link from "next/link";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Woodward Bluffs Mobile Home Park Activities Committee",
	description:
		"Official website for the Woodward Bluffs Mobile Home Park Activities Committee. Find information about community events, activities, and get involved in your neighborhood.",
	keywords: [
		"Woodward Bluffs",
		"Mobile Home Park",
		"Activities",
		"Community Events",
		"Neighborhood"
	],
	authors: [{ name: "Woodward Bluffs Activities Committee" }],
	colorScheme: "dark",
	creator: "Woodward Bluffs Activities Committee",
	publisher: "Woodward Bluffs Mobile Home Park",
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
		],
		apple: [{ url: "/apple-touch-icon.png" }]
	},
	manifest: "/site.webmanifest",
	openGraph: {
		type: "website",
		url: "https://www.woodwardbluffsactivities.com",
		title: "Woodward Bluffs Mobile Home Park Activities Committee",
		description:
			"Join us for community events and activities at Woodward Bluffs Mobile Home Park",
		siteName: "Woodward Bluffs Activities",
		images: [
			{
				url: "/og-image.jpg"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "Woodward Bluffs Mobile Home Park Activities",
		description:
			"Join us for community events and activities at Woodward Bluffs Mobile Home Park",
		images: ["/twitter-image.jpg"]
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen bg-background text-white">
				<header className="fixed w-full top-0 z-50">
					<NavBar />
				</header>
				<main className="flex-grow mt-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
				<Footer />
			</body>
		</html>
	);
}
