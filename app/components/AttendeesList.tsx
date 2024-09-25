import React, { useState, useEffect } from "react";
import { getEventAttendees } from "../utils/eventUtils";
import { Attendee } from "../../types/Event";

interface AttendeesListProps {
	eventTitle: string;
	onClose: () => void;
}

export default function AttendeesList({
	eventTitle,
	onClose
}: AttendeesListProps) {
	const [attendees, setAttendees] = useState<Attendee[]>([]);

	useEffect(() => {
		const fetchAttendees = async () => {
			const attendeesList = await getEventAttendees(eventTitle);
			console.log("Fetched attendees:", attendeesList);
			setAttendees(attendeesList);
		};
		fetchAttendees();
	}, [eventTitle]);

	console.log("Rendering attendees:", attendees);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-white">
						Attendees for {eventTitle}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors"
						aria-label="Close modal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<ul className="space-y-2">
					{attendees.map((attendee) => (
						<li key={attendee.id} className="text-gray-300">
							{attendee.name}
						</li>
					))}
				</ul>
				{attendees.length === 0 && (
					<p className="text-gray-400">
						No attendees yet. Be the first to RSVP!
					</p>
				)}
			</div>
		</div>
	);
}
