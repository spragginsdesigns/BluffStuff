import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Attendee } from "../../../types/Event";
import { promises as fs } from "fs";
import path from "path";

interface RSVPData {
	[eventTitle: string]: Attendee[];
}

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

		const newAttendee: Attendee = {
			id: uuidv4(),
			name,
			email,
			phoneNumber,
			notes
		};

		// Use a more flexible path for file storage
		const filePath = path.join(process.cwd(), "data", "rsvps.json");

		let rsvps: RSVPData = {};
		try {
			const fileData = await fs.readFile(filePath, "utf-8");
			rsvps = JSON.parse(fileData) as RSVPData;
		} catch (error) {
			console.error("Error reading RSVP file:", error);
			// If file doesn't exist or is empty, start with an empty object
			rsvps = {};
		}

		if (!rsvps[eventTitle]) {
			rsvps[eventTitle] = [];
		}

		rsvps[eventTitle].push(newAttendee);

		await fs.writeFile(filePath, JSON.stringify(rsvps, null, 2));

		return NextResponse.json({ success: true }, { status: 200 });
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
