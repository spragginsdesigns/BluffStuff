import React, { useState } from "react";
import Image from "next/image";
import {
	CalendarIcon,
	ClockIcon,
	MapPinIcon
} from "@heroicons/react/24/outline";
import { Event } from "../../types/Event";
import RsvpModal from "./RsvpModal";

interface EventCardProps extends Event {}

export default function EventCard({
	title,
	date,
	description,
	imageSrc,
	time,
	location,
	attendees
}: EventCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showAttendees, setShowAttendees] = useState(false);

	const handleRsvpClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleToggleAttendees = () => {
		setShowAttendees(!showAttendees);
	};

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
				<button
					onClick={handleRsvpClick}
					className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105"
				>
					RSVP
				</button>
				{attendees.length > 0 && (
					<div className="mt-4">
						<button
							onClick={handleToggleAttendees}
							className="text-blue-400 hover:underline"
						>
							{showAttendees ? "Hide Attendees" : "Show Attendees"}
						</button>
						{showAttendees && (
							<ul className="mt-2 text-gray-300">
								{attendees.map((attendee) => (
									<li key={attendee.id}>
										{attendee.name} {attendee.notes && ` - ${attendee.notes}`}
									</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
			{isModalOpen && (
				<RsvpModal eventTitle={title} onClose={handleCloseModal} />
			)}
		</div>
	);
}
