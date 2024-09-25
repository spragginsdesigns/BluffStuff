export interface Attendee {
	id: string;
	name: string;
	email?: string;
	phoneNumber?: string;
	notes?: string;
}

export interface Event {
	id: string;
	title: string;
	date: string;
	description: string;
	imageSrc: string;
	time?: string;
	location?: string;
	attendees: Attendee[];
}
