"use client";

import { useEffect, useState } from "react";
import EventCard from "./components/EventCard";
import ActivityCard from "./components/ActivityCard";
import Hero from "./components/Hero";
import PhotoGallery from "./components/PhotoGallery";
import EventPlanner from "./components/EventPlanner";
import CommitteeDashboard from "./components/CommitteeDashboard";
import { Event } from "../types/Event";
import { getUpcomingEvents } from "./utils/getEvents";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

// List of committee member email addresses
const COMMITTEE_EMAILS = [
	"bob.walker@example.com",
	"del@example.com",
	"kim@example.com",
	"donalee@example.com",
	"jeff@example.com"
	// Add other committee member emails
];

export default function Home() {
	const [events, setEvents] = useState<Event[]>([]);
	const { isLoaded, isSignedIn, user } = useUser();

	// Check if the signed-in user is a committee member
	const isCommitteeMember =
		isLoaded &&
		isSignedIn &&
		user?.primaryEmailAddress?.emailAddress &&
		COMMITTEE_EMAILS.includes(user.primaryEmailAddress.emailAddress);

	useEffect(() => {
		const fetchEvents = async () => {
			const upcomingEvents = await getUpcomingEvents();
			setEvents(upcomingEvents);
		};

		fetchEvents();
	}, []);

	const activities = [
		{
			title: "Soup Cook-off",
			description:
				"Join our Oktoberfest-themed Soup Cook-off on October 26, 2024. Showcase your best soup recipe!",
			imageSrc:
				"https://utfs.io/f/34fb3fee-eaca-4a08-84a5-c768e0ebcf3d-gyk9jk.webp"
		},
		{
			title: "Thanksgiving Dinner",
			description:
				"Celebrate Thanksgiving with a community dinner. Bring your favorite dish to share!",
			imageSrc:
				"https://utfs.io/f/f028f756-7d05-4b80-b318-9b22c11e6296-z3puwa.webp"
		}
	];

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<main className="min-h-screen">
			<Hero />

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{isCommitteeMember && (
					<>
						<CommitteeDashboard />
						<EventPlanner />
					</>
				)}

				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Upcoming Events
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{events.map((event, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<EventCard {...event} />
							</motion.div>
						))}
					</div>
				</section>

				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
						Activities Highlights
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{activities.map((activity, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<ActivityCard {...activity} />
							</motion.div>
						))}
					</div>
				</section>

				<PhotoGallery />

				{!isCommitteeMember && (
					<section className="container mx-auto px-4 py-16">
						<div className="bg-gray-900/5 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700">
							<h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
								Join the Activities Committee
							</h2>
							<p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
								Help us create memorable experiences for our community!
								We&apos;re always looking for enthusiastic residents to join our
								activities committee. Share your ideas, help plan events, and
								make a difference in our community.
							</p>
							<div className="flex flex-col items-center space-y-4">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
								>
									Volunteer Now
								</motion.button>
								<p className="text-gray-400 text-sm">
									Committee meetings are held every first Tuesday of the month
									at 7 PM
								</p>
							</div>
						</div>
					</section>
				)}

				<section className="container mx-auto px-4 py-16">
					<div className="bg-gray-900/5 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700">
						<h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
							Mobile Home Living Resources
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{
									title: "Fresno Mobile Home Laws",
									description:
										"Learn about local regulations and your rights as a mobile home resident.",
									icon: "⚖️"
								},
								{
									title: "Community Guidelines",
									description:
										"Access Woodward Bluffs community rules and guidelines.",
									icon: "📋"
								},
								{
									title: "Resident Resources",
									description:
										"Find helpful information and contacts for mobile home living.",
									icon: "📱"
								}
							].map((resource, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
								>
									<div className="text-4xl mb-4">{resource.icon}</div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{resource.title}
									</h3>
									<p className="text-gray-400">{resource.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</motion.div>
		</main>
	);
}
