// app/components/EventCard.tsx
import Image from "next/image";
import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon
} from "@heroicons/react/24/outline";

interface EventCardProps {
	title: string;
	date: string;
	description: string;
	imageSrc: string;
	time?: string;
	location?: string;
}

export default function EventCard({
	title,
	date,
	description,
	imageSrc,
	time,
	location
}: EventCardProps) {
	return (
		<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
			<div className="relative h-48 w-full">
				<Image
					src={imageSrc}
					alt={title}
					fill
					style={{ objectFit: "cover" }}
					className="transition-transform duration-300 hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
			</div>
			<div className="p-6">
				<h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					{title}
				</h3>
				<div className="flex items-center mb-2 text-gray-300">
					<CalendarIcon className="h-5 w-5 mr-2 text-purple-400" />
					<span>{date}</span>
				</div>
				{time && (
					<div className="flex items-center mb-2 text-gray-300">
						<ClockIcon className="h-5 w-5 mr-2 text-purple-400" />
						<span>{time}</span>
					</div>
				)}
				{location && (
					<div className="flex items-center mb-2 text-gray-300">
						<MapPinIcon className="h-5 w-5 mr-2 text-purple-400" />
						<span>{location}</span>
					</div>
				)}
				<p className="text-gray-400 mt-4">{description}</p>
				<button className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105">
					Learn More
				</button>
			</div>
		</div>
	);
}
