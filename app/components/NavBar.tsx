// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0">
							<span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
								Woodward Bluffs
							</span>
						</Link>
					</div>

					{/* Desktop menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-center space-x-4">
							<Link
								href="/"
								className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Home
							</Link>
							<Link
								href="/events"
								className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Events
							</Link>
							<Link
								href="/resources"
								className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Resources
							</Link>
							<SignedOut>
								<SignInButton mode="modal">
									<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
										Sign In
									</button>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton
									afterSignOutUrl="/"
									appearance={{
										elements: {
											avatarBox: "w-10 h-10",
											userButtonPopoverCard:
												"bg-gray-900 border border-gray-700",
											userButtonPopoverActionButton: "hover:bg-gray-800",
											userButtonPopoverActionButtonText: "text-white",
											userButtonPopoverFooter: "hidden"
										}
									}}
								/>
							</SignedIn>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							<span className="sr-only">Open main menu</span>
							{!isOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link
							href="/"
							className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Home
						</Link>
						<Link
							href="/events"
							className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Events
						</Link>
						<Link
							href="/resources"
							className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>
							Resources
						</Link>
						<div className="pt-4">
							<SignedOut>
								<SignInButton mode="modal">
									<button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
										Sign In
									</button>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton
									afterSignOutUrl="/"
									appearance={{
										elements: {
											avatarBox: "w-10 h-10",
											userButtonPopoverCard:
												"bg-gray-900 border border-gray-700",
											userButtonPopoverActionButton: "hover:bg-gray-800",
											userButtonPopoverActionButtonText: "text-white",
											userButtonPopoverFooter: "hidden"
										}
									}}
								/>
							</SignedIn>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
