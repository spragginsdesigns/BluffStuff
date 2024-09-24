export const generateGoogleCalendarLink = (event: {
	title: string;
	date: string;
	description: string;
	location?: string;
}) => {
	const startDate =
		new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
	const endDate =
		new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000) // Assume 2-hour event
			.toISOString()
			.replace(/[-:]/g, "")
			.split(".")[0] + "Z";

	const details = encodeURIComponent(event.description);
	const locationEncoded = encodeURIComponent(event.location || "");

	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
		event.title
	)}&dates=${startDate}/${endDate}&details=${details}&location=${locationEncoded}&sf=true&output=xml`;
};

export const generateICalendarLink = (event: {
	title: string;
	date: string;
	description: string;
	location?: string;
}) => {
	const startDate =
		new Date(event.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
	const endDate =
		new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000) // Assume 2-hour event
			.toISOString()
			.replace(/[-:]/g, "")
			.split(".")[0] + "Z";

	return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Product//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:${event.location || ""}
END:VEVENT
END:VCALENDAR`;
};
