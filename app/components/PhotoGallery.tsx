import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Photo {
	id: string;
	src: string;
	alt: string;
	category: "activities" | "social" | "seasonal" | "special";
	date: string;
}

const photos: Photo[] = [
	{
		id: "1",
		src: "https://utfs.io/f/34fb3fee-eaca-4a08-84a5-c768e0ebcf3d-gyk9jk.webp",
		alt: "Fall Soup Cook-off 2023",
		category: "seasonal",
		date: "2023-10-15"
	},
	{
		id: "2",
		src: "https://utfs.io/f/f028f756-7d05-4b80-b318-9b22c11e6296-z3puwa.webp",
		alt: "Community Thanksgiving Dinner",
		category: "seasonal",
		date: "2023-11-23"
	}
	// Add more activity photos here
];

export default function PhotoGallery() {
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const categories = [
		{ id: "all", label: "All Events" },
		{ id: "activities", label: "Activities" },
		{ id: "social", label: "Social Gatherings" },
		{ id: "seasonal", label: "Seasonal Events" },
		{ id: "special", label: "Special Events" }
	];

	const filteredPhotos =
		selectedCategory === "all"
			? photos
			: photos.filter((photo) => photo.category === selectedCategory);

	return (
		<section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					Event Photo Gallery
				</h2>

				<div className="flex justify-center mb-8 space-x-4 overflow-x-auto pb-4">
					{categories.map(({ id, label }) => (
						<motion.button
							key={id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSelectedCategory(id)}
							className={`px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap
                ${
									selectedCategory === id
										? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
										: "bg-gray-800 text-gray-400 hover:bg-gray-700"
								}`}
						>
							{label}
						</motion.button>
					))}
				</div>

				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{filteredPhotos.map((photo) => (
						<motion.div
							key={photo.id}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
							onClick={() => setSelectedPhoto(photo)}
						>
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 right-4">
									<p className="text-white font-medium mb-1">{photo.alt}</p>
									<p className="text-gray-300 text-sm">
										{new Date(photo.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric"
										})}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<AnimatePresence>
					{selectedPhoto && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
							onClick={() => setSelectedPhoto(null)}
						>
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								className="relative max-w-4xl w-full aspect-video"
								onClick={(e) => e.stopPropagation()}
							>
								<Image
									src={selectedPhoto.src}
									alt={selectedPhoto.alt}
									fill
									className="object-contain"
								/>
								<div className="absolute bottom-4 left-4 right-4 text-white">
									<h3 className="text-xl font-medium mb-1">
										{selectedPhoto.alt}
									</h3>
									<p className="text-gray-300">
										{new Date(selectedPhoto.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric"
										})}
									</p>
								</div>
								<button
									onClick={() => setSelectedPhoto(null)}
									className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
