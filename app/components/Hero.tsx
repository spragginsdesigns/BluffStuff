// app/components/Hero.tsx
"use client";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative w-full overflow-hidden pt-24 pb-16 md:py-24">
			<div className="container mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-center">
				{/* Left Column */}
				<div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Welcome to Bluff Stuff
					</h1>
					<p className="text-lg md:text-xl lg:text-2xl mb-10 text-white max-w-2xl mx-auto lg:mx-0 leading-relaxed">
						Your gateway to the vibrant
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
							{" "}
							Woodward Bluffs community
						</span>
					</p>
					<div className="space-y-4 sm:space-y-0 sm:space-x-4">
						<button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
							Explore
						</button>
						<button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105">
							Learn More
						</button>
					</div>
				</div>

				{/* Right Column */}
				<div className="w-full lg:w-1/2 flex justify-center items-center">
					<div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
						<div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
							<Image
								src="/images/wwb-heroimage.jpg"
								alt="Scenic view of Woodward Bluffs"
								fill
								style={{ objectFit: "cover" }}
								priority
								className="rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
