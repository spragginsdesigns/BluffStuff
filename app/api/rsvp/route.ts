import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Attendee } from "../../../types/Event";
import { promises as fs } from "fs";
import path from "path";

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

		const filePath = path.join(process.cwd(), "data", "rsvps.json");
		const fileData = await fs.readFile(filePath, "utf-8");
		const rsvps = JSON.parse(fileData);

		if (!rsvps[eventTitle]) {
			rsvps[eventTitle] = [];
		}

		rsvps[eventTitle].push(newAttendee);

		await fs.writeFile(filePath, JSON.stringify(rsvps, null, 2));

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error saving RSVP:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to save RSVP." },
			{ status: 500 }
		);
	}
}
