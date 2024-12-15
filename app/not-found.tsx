import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-xl mb-8">This page could not be found.</p>
			<Link
				href="/"
				className="px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-colors rounded-lg text-white"
			>
				Return Home
			</Link>
		</div>
	);
}
