import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD
	}
});

export async function POST(request: NextRequest) {
	try {
		const { email, message } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ success: false, error: "Email is required." },
				{ status: 400 }
			);
		}

		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: email,
			subject: "Event Reminder",
			text: message
		};

		const info = await transporter.sendMail(mailOptions);

		if (info.accepted.length > 0) {
			return NextResponse.json({ success: true }, { status: 200 });
		} else {
			throw new Error("Failed to send email");
		}
	} catch (error) {
		console.error("Error sending reminder:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to send reminder." },
			{ status: 500 }
		);
	}
}
