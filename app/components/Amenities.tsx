import { FaSwimmingPool, FaTree, FaParking, FaShieldAlt } from "react-icons/fa";
import { MdLocalLaundryService, MdPets } from "react-icons/md";
import { motion } from "framer-motion";

const amenities = [
	{
		icon: FaSwimmingPool,
		title: "Swimming Pool",
		description: "Seasonal outdoor pool perfect for summer relaxation"
	},
	{
		icon: FaTree,
		title: "Landscaped Grounds",
		description: "Beautiful, well-maintained common areas and gardens"
	},
	{
		icon: FaParking,
		title: "Ample Parking",
		description: "Designated parking spaces for residents and guests"
	},
	{
		icon: MdLocalLaundryService,
		title: "Laundry Facilities",
		description: "24/7 access to modern laundry facilities"
	},
	{
		icon: MdPets,
		title: "Pet Friendly",
		description: "Welcome area for your furry friends with restrictions"
	},
	{
		icon: FaShieldAlt,
		title: "Security",
		description: "Regular security patrols and well-lit common areas"
	}
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1
	}
};

export default function Amenities() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
					Community Amenities
				</h2>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{amenities.map((amenity, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-900/10 transition-all duration-300 border border-gray-700"
						>
							<div className="flex items-center mb-4">
								<div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-gray-700">
									<amenity.icon className="w-6 h-6 text-blue-400" />
								</div>
								<h3 className="text-xl font-semibold ml-4 text-gray-100">
									{amenity.title}
								</h3>
							</div>
							<p className="text-gray-400">{amenity.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
