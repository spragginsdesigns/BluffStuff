// app/components/NavBar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navClasses = `fixed w-full transition-all duration-300 ${
		isScrolled
			? "bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg"
			: "bg-transparent"
	}`;

	return (
		<nav className={navClasses}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0">
							<Image
								src="/apple-icon-180x180.png"
								alt="Bluff Stuff Logo"
								width={40}
								height={40}
								className="rounded-full"
							/>
						</Link>
						<Link href="/" className="ml-3 text-xl font-bold text-white">
							Bluff Stuff
						</Link>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<NavLink href="/">Home</NavLink>
							<NavLink href="/about">About</NavLink>
							<NavLink href="/events">Events</NavLink>
							<NavLink href="/activities">Activities</NavLink>
							<NavLink href="/contact">Contact</NavLink>
							<Link
								href="/login"
								className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
							>
								Login/Register
							</Link>
						</div>
					</div>
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						>
							<span className="sr-only">Open main menu</span>
							{!isMenuOpen ? (
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
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
						<MobileNavLink href="/">Home</MobileNavLink>
						<MobileNavLink href="/about">About</MobileNavLink>
						<MobileNavLink href="/events">Events</MobileNavLink>
						<MobileNavLink href="/activities">Activities</MobileNavLink>
						<MobileNavLink href="/contact">Contact</MobileNavLink>
						<Link
							href="/login"
							className="block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium transition duration-300"
						>
							Login/Register
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

function NavLink({
	href,
	children
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
		>
			{children}
		</Link>
	);
}

function MobileNavLink({
	href,
	children
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
		>
			{children}
		</Link>
	);
}
