import { useState } from "react";
import { motion } from "framer-motion";

interface CommitteeMember {
	name: string;
	role: string;
	tasks: string[];
}

interface MeetingAgenda {
	date: string;
	items: {
		title: string;
		description: string;
		duration: string;
		presenter: string;
	}[];
}

const committeeMembers: CommitteeMember[] = [
	{
		name: "Bob Walker",
		role: "Committee Leader",
		tasks: ["Review monthly budget", "Approve event proposals"]
	},
	{
		name: "Del",
		role: "Board Member",
		tasks: ["Coordinate Halloween event", "Update event calendar"]
	},
	{
		name: "Kim",
		role: "Board Member",
		tasks: ["Manage volunteer sign-ups", "Coordinate with vendors"]
	},
	{
		name: "Donalee",
		role: "Board Member",
		tasks: ["Update photo gallery", "Coordinate decorations"]
	},
	{
		name: "Jeff",
		role: "Board Member",
		tasks: ["Manage equipment inventory", "Coordinate setup/cleanup"]
	}
];

const nextMeeting: MeetingAgenda = {
	date: "2024-02-06", // First Tuesday of February
	items: [
		{
			title: "Previous Meeting Minutes Review",
			description: "Review and approve minutes from January meeting",
			duration: "10 mins",
			presenter: "Secretary"
		},
		{
			title: "Valentine's Day Event Planning",
			description: "Finalize details for upcoming community celebration",
			duration: "20 mins",
			presenter: "Kim"
		},
		{
			title: "Spring Events Calendar",
			description: "Plan and schedule March-May community events",
			duration: "30 mins",
			presenter: "Del"
		},
		{
			title: "Budget Review",
			description: "Review Q1 event budget allocations",
			duration: "15 mins",
			presenter: "Treasurer"
		}
	]
};

export default function CommitteeDashboard() {
	const [activeTab, setActiveTab] = useState<
		"agenda" | "members" | "resources"
	>("agenda");

	return (
		<section className="py-16">
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="flex items-center justify-between mb-12">
					<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Committee Dashboard
					</h2>
					<div className="flex items-center space-x-4">
						<span className="text-gray-400">Next Meeting:</span>
						<span className="text-white font-medium">
							{new Date(nextMeeting.date).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
								year: "numeric"
							})}
						</span>
					</div>
				</div>

				<div className="flex justify-center mb-8 space-x-4">
					{[
						{ id: "agenda", label: "Meeting Agenda" },
						{ id: "members", label: "Committee Members" },
						{ id: "resources", label: "Resources" }
					].map(({ id, label }) => (
						<motion.button
							key={id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() =>
								setActiveTab(id as "agenda" | "members" | "resources")
							}
							className={`px-8 py-3 rounded-full font-medium transition-all duration-200
                ${
									activeTab === id
										? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
										: "bg-gray-800 text-gray-400 hover:bg-gray-700"
								}`}
						>
							{label}
						</motion.button>
					))}
				</div>

				<div className="bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
					{activeTab === "agenda" && (
						<div className="space-y-6">
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-semibold text-white">
									Upcoming Meeting Agenda
								</h3>
								<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-600 hover:to-pink-700 transition-colors">
									Add Agenda Item
								</button>
							</div>
							{nextMeeting.items.map((item, index) => (
								<div
									key={index}
									className="p-4 bg-gray-900/5 rounded-lg border border-gray-700"
								>
									<div className="flex justify-between items-start mb-2">
										<div>
											<h4 className="text-white font-medium">{item.title}</h4>
											<p className="text-gray-400 text-sm">
												{item.description}
											</p>
										</div>
										<span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
											{item.duration}
										</span>
									</div>
									<p className="text-gray-400 text-sm">
										Presenter: {item.presenter}
									</p>
								</div>
							))}
						</div>
					)}

					{activeTab === "members" && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{committeeMembers.map((member, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="p-4 bg-gray-800 rounded-lg border border-gray-700"
									>
										<div className="flex items-start justify-between mb-3">
											<div>
												<h4 className="text-white font-medium">
													{member.name}
												</h4>
												<p className="text-gray-400 text-sm">{member.role}</p>
											</div>
										</div>
										<div className="space-y-2">
											{member.tasks.map((task, taskIndex) => (
												<div
													key={taskIndex}
													className="flex items-center text-sm text-gray-300"
												>
													<svg
														className="w-4 h-4 text-purple-400 mr-2"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5l7 7-7 7"
														/>
													</svg>
													{task}
												</div>
											))}
										</div>
									</motion.div>
								))}
							</div>
						</div>
					)}

					{activeTab === "resources" && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{
									title: "Meeting Templates",
									description: "Access agenda and minutes templates",
									icon: "📝"
								},
								{
									title: "Event Planning Guide",
									description:
										"Step-by-step guide for organizing community events",
									icon: "📅"
								},
								{
									title: "Budget Forms",
									description: "Access budget request and tracking forms",
									icon: "💰"
								},
								{
									title: "Mobile Home Laws",
									description: "Fresno mobile home regulations and guidelines",
									icon: "⚖️"
								},
								{
									title: "Contact Directory",
									description: "Important contacts and vendor list",
									icon: "📞"
								},
								{
									title: "Document Archive",
									description: "Access past meeting minutes and event records",
									icon: "📚"
								}
							].map((resource, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
								>
									<div className="text-3xl mb-3">{resource.icon}</div>
									<h4 className="text-white font-medium mb-2">
										{resource.title}
									</h4>
									<p className="text-gray-400 text-sm">
										{resource.description}
									</p>
								</motion.div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
