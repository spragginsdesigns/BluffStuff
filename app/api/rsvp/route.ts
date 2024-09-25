import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
	try {
		const { eventTitle, name, email, phoneNumber, notes } =
			await request.json();

		if (!eventTitle || !name || !email) {
			return NextResponse.json(
				{ success: false, error: "Missing required fields." },
				{ status: 400 }
			);
		}

		const result = await sql`
      INSERT INTO rsvps (event_title, name, email, phone_number, notes)
      VALUES (${eventTitle}, ${name}, ${email}, ${phoneNumber}, ${notes})
      RETURNING id;
    `;

		const newRsvpId = result.rows[0].id;

		return NextResponse.json({ success: true, id: newRsvpId }, { status: 200 });
	} catch (error) {
		console.error("Error saving RSVP:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to save RSVP. " + (error as Error).message
			},
			{ status: 500 }
		);
	}
}
