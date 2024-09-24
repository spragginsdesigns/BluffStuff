import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
	try {
		const filePath = path.join(process.cwd(), "data", "rsvps.json");
		const fileData = await fs.readFile(filePath, "utf-8");
		const rsvps = JSON.parse(fileData);
		return NextResponse.json(rsvps, { status: 200 });
	} catch (error) {
		console.error("Error reading RSVPs:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to read RSVPs." },
			{ status: 500 }
		);
	}
}
