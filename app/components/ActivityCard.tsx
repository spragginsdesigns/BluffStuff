// app/components/ActivityCard.tsx
import Image from "next/image";
import { CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface ActivityCardProps {
	title: string;
	description: string;
	imageSrc: string;
	date?: string;
	participants?: string;
}

export default function ActivityCard({
	title,
	description,
	imageSrc,
	date,
	participants
}: ActivityCardProps) {
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
				<h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
					{title}
				</h3>
				{date && (
					<div className="flex items-center mb-2 text-gray-300">
						<CalendarIcon className="h-5 w-5 mr-2 text-green-400" />
						<span>{date}</span>
					</div>
				)}
				{participants && (
					<div className="flex items-center mb-2 text-gray-300">
						<UserGroupIcon className="h-5 w-5 mr-2 text-green-400" />
						<span>{participants}</span>
					</div>
				)}
				<p className="text-gray-400 mt-4">{description}</p>
				<button className="mt-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105">
					Join Activity
				</button>
			</div>
		</div>
	);
}
