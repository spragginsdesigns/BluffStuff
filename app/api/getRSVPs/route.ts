import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
	try {
		const { rows } = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;

		const rsvps = rows.reduce((acc, row) => {
			if (!acc[row.event_title]) {
				acc[row.event_title] = [];
			}
			acc[row.event_title].push({
				id: row.id,
				name: row.name,
				email: row.email,
				phoneNumber: row.phone_number,
				notes: row.notes
			});
			return acc;
		}, {});

		return NextResponse.json(rsvps, { status: 200 });
	} catch (error) {
		console.error("Error reading RSVPs:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to read RSVPs." },
			{ status: 500 }
		);
	}
}
