import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID!,
	process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(request: NextRequest) {
	try {
		const { email, phoneNumber, message } = await request.json();

		if (!email && !phoneNumber) {
			return NextResponse.json(
				{ success: false, error: "At least one contact method is required." },
				{ status: 400 }
			);
		}

		const tasks = [];

		if (email) {
			tasks.push(
				sendgrid.send({
					to: email,
					from: "no-reply@bluffstuff.com",
					subject: "Event Reminder",
					text: message
				})
			);
		}

		if (phoneNumber) {
			tasks.push(
				twilioClient.messages.create({
					body: message,
					from: process.env.TWILIO_PHONE_NUMBER!,
					to: phoneNumber
				})
			);
		}

		await Promise.all(tasks);

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error sending reminders:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to send reminders." },
			{ status: 500 }
		);
	}
}
