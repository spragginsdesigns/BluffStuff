import React, { useState, useEffect } from "react";
import {
	generateGoogleCalendarLink,
	generateICalendarLink
} from "../utils/calendar";

interface RsvpModalProps {
	eventId: string;
	eventTitle: string;
	onClose: () => void;
}

export default function RsvpModal({
	eventId,
	eventTitle,
	onClose
}: RsvpModalProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [notes, setNotes] = useState("");
	const [selectedReminders, setSelectedReminders] = useState<string[]>([]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/rsvp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					eventTitle,
					name,
					email,
					phoneNumber,
					notes
				})
			});

			if (response.ok) {
				if (selectedReminders.includes("email")) {
					await fetch("/api/sendReminders", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email,
							message: `Reminder: You have RSVP'd for ${eventTitle}. We look forward to seeing you!`
						})
					});
				}

				alert("RSVP successful!");
				onClose();
			} else {
				alert("Failed to RSVP. Please try again.");
			}
		} catch (error) {
			console.error("Error RSVPing:", error);
			alert("An error occurred. Please try again.");
		}
	};

	const handleReminderChange = (type: string) => {
		setSelectedReminders((prev) =>
			prev.includes(type)
				? prev.filter((reminder) => reminder !== type)
				: [...prev, type]
		);
	};

	const eventDetails = {
		title: eventTitle,
		date: "August 31, 2024",
		description: "Description of the event.",
		location: "Event Location"
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-white">
						RSVP for {eventTitle}
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
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="mb-4">
						<label className="block text-gray-300">Name</label>
						<input
							type="text"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-300">Email</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-300">Phone Number</label>
						<input
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-300">Notes</label>
						<textarea
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
							placeholder="e.g., Bring a potluck dish"
						></textarea>
					</div>
					<div className="mb-4">
						<label className="block text-gray-300">Reminders</label>
						<div className="flex items-center">
							<label className="mr-4 text-gray-300">
								<input
									type="checkbox"
									value="email"
									checked={selectedReminders.includes("email")}
									onChange={() => handleReminderChange("email")}
									className="mr-2"
								/>
								Email Reminder
							</label>
						</div>
					</div>
					<div className="mt-6">
						<h3 className="text-xl font-semibold text-gray-300 mb-2">
							Remind Me
						</h3>
						<div className="flex space-x-4">
							<button
								type="button"
								onClick={() =>
									window.open(
										generateGoogleCalendarLink(eventDetails),
										"_blank"
									)
								}
								className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
							>
								Add to Google
							</button>
							<a
								href={generateICalendarLink(eventDetails)}
								download={`${eventTitle}.ics`}
								className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
							>
								Download iCal
							</a>
						</div>
					</div>
					<div className="flex justify-end mt-6 space-x-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-full transition-all duration-300"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
						>
							Submit RSVP
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
