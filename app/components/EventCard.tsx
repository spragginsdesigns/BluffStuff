import React, { useState } from "react";
import Image from "next/image";
import { Event } from "../../types/Event";
import RsvpModal from "./RsvpModal";
import AttendeesList from "./AttendeesList";

export default function EventCard({
	id,
	title,
	date,
	description,
	imageSrc
}: Event) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAttendeesListOpen, setIsAttendeesListOpen] = useState(false);

	return (
		<>
			<div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
				<Image
					src={imageSrc}
					alt={title}
					width={400}
					height={200}
					className="w-full h-48 object-cover"
				/>
				<div className="p-6">
					<h3 className="text-xl font-semibold mb-2">{title}</h3>
					<p className="text-gray-400 mb-4">{date}</p>
					<p className="text-gray-300 mb-4">{description}</p>
					<div className="flex space-x-4">
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
						>
							RSVP
						</button>
						<button
							onClick={() => setIsAttendeesListOpen(true)}
							className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
						>
							View Attendees
						</button>
					</div>
				</div>
			</div>
			{isModalOpen && (
				<RsvpModal
					eventId={id}
					eventTitle={title}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
			{isAttendeesListOpen && (
				<AttendeesList
					eventTitle={title}
					onClose={() => setIsAttendeesListOpen(false)}
				/>
			)}
		</>
	);
}
