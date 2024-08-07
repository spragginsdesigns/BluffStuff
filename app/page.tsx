import EventCard from "./components/EventCard";
import ActivityCard from "./components/ActivityCard";
import Hero from "./components/Hero";

export default function Home() {
	const events = [
		{
			title: "Raffle and Dinner Event",
			date: "August 31, 2024",
			description:
				"Join us for a lasagna dinner and exciting raffle! $5 per person, including one free raffle ticket.",
			imageSrc:
				"https://utfs.io/f/664e02e5-68df-4a04-abd8-310ecd5eed98-e8fh8e.webp"
		},
		{
			title: "Taco Tuesday",
			date: "September 17, 2024",
			description: "Enjoy delicious tacos with your neighbors!",
			imageSrc:
				"https://utfs.io/f/6a4dbf43-4544-4148-9ad6-3567ca03833c-vw0but.jpg"
		},
		{
			title: "Vegan Dinner",
			date: "September 28, 2024",
			description: "A special dinner featuring delicious vegan options.",
			imageSrc:
				"https://utfs.io/f/ad2ae982-d502-4225-abe7-92a864d14f75-r1b9fe.webp"
		}
	];

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
				"Celebrate Thanksgiving with your Woodward Bluffs community on November 23, 2024.",
			imageSrc:
				"https://utfs.io/f/f028f756-7d05-4b80-b318-9b22c11e6296-z3puwa.webp"
		}
	];

	return (
		<>
			<Hero />
			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					Upcoming Events
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event, index) => (
						<EventCard key={index} {...event} />
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
					Activities Highlights
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{activities.map((activity, index) => (
						<ActivityCard key={index} {...activity} />
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-3xl font-bold mb-8 text-primary">Community News</h2>
				<div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl">
					<h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						August 31st Raffle and Dinner Event
					</h3>
					<ul className="list-none space-y-4 text-gray-300 mb-8">
						{[
							"Lasagna dinner (including vegan option) for $5 per person",
							"Raffle tickets: $1 each or 6 for $5",
							"Family package: $25 for 4 dinners and 15 tickets",
							"Silent auction style raffle with exciting prizes"
						].map((item, index) => (
							<li key={index} className="flex items-start">
								<svg
									className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{item}</span>
							</li>
						))}
					</ul>
					<p className="text-gray-400 mb-8">
						Don&apos;t miss out on this unforgettable event! Join us for a night
						of fun, food, and raffle prizes.
					</p>
					<button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
						Learn More
					</button>
				</div>
			</section>
		</>
	);
}
