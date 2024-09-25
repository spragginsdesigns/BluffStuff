import { Event } from "../../types/Event";

export const getUpcomingEvents = async (): Promise<Event[]> => {
	const initialEvents: Omit<Event, "attendees">[] = [
		{
			id: "1",
			title: "Vegan Dinner",
			date: "September 28, 2024",
			description: "A special dinner featuring delicious vegan options.",
			imageSrc:
				"https://utfs.io/f/ad2ae982-d502-4225-abe7-92a864d14f75-r1b9fe.webp"
		}
	];

	try {
		const response = await fetch("/api/getRSVPs");
		const rsvps = await response.json();

		const eventsWithRSVPs: Event[] = initialEvents.map((event) => ({
			...event,
			attendees: rsvps[event.title] || []
		}));

		const currentDate = new Date();
		const upcomingEvents = eventsWithRSVPs.filter((event) => {
			const eventDate = new Date(event.date);
			eventDate.setDate(eventDate.getDate() + 1); // Add 1 day to the event date
			return eventDate > currentDate;
		});

		return upcomingEvents;
	} catch (error) {
		console.error("Error fetching RSVPs:", error);
		const eventsWithEmptyRSVPs: Event[] = initialEvents.map((event) => ({
			...event,
			attendees: []
		}));
		return eventsWithEmptyRSVPs;
	}
};
