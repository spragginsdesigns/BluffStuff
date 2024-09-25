import { sql } from "@vercel/postgres";
import { Attendee } from "../../types/Event";

export async function getEventAttendees(
	eventTitle: string
): Promise<Attendee[]> {
	// Use dynamic import to access environment variables
	const env = await import("../../next.config.mjs");

	// Add type checking and fallback
	const POSTGRES_URL =
		(env.default as any)?.env?.POSTGRES_URL || process.env.POSTGRES_URL;

	console.log("POSTGRES_URL:", POSTGRES_URL);

	if (!POSTGRES_URL) {
		console.error("POSTGRES_URL environment variable is not set");
		return [];
	}

	try {
		const result = await sql`
      SELECT id, name, email, phone_number as phoneNumber, notes
      FROM rsvps
      WHERE event_title = ${eventTitle}
      ORDER BY created_at DESC
    `;

		console.log("Database query result:", result.rows);

		return result.rows.map((row) => ({
			id: row.id.toString(),
			name: row.name,
			email: row.email,
			phoneNumber: row.phoneNumber,
			notes: row.notes
		}));
	} catch (error) {
		console.error("Error fetching attendees:", error);
		return [];
	}
}
