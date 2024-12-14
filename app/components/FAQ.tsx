import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
	question: string;
	answer: string;
}

const faqs: FAQItem[] = [
	{
		question: "What are the office hours?",
		answer:
			"Our office is open Monday through Friday from 9:00 AM to 5:00 PM. For emergencies outside of office hours, please call our 24/7 emergency maintenance line."
	},
	{
		question: "How do I submit a maintenance request?",
		answer:
			"You can submit maintenance requests through our online resident portal, by calling the office during business hours, or by filling out a maintenance request form at the office."
	},
	{
		question: "What is the pet policy?",
		answer:
			"We are a pet-friendly community. Dogs and cats are welcome with a maximum of 2 pets per home. There is a one-time pet fee and monthly pet rent. Breed restrictions apply. Please contact the office for details."
	},
	{
		question: "How do I pay my rent?",
		answer:
			"Rent can be paid online through our resident portal, by check or money order at the office, or through automatic bank draft. Rent is due on the 1st of each month."
	},
	{
		question: "What utilities am I responsible for?",
		answer:
			"Residents are responsible for electricity, gas, water, and internet/cable. Trash service is included in your rent."
	},
	{
		question: "Are there guest parking restrictions?",
		answer:
			"Guest parking is available in designated areas. Guests staying longer than 3 days must register with the office. No overnight parking of commercial vehicles or RVs."
	}
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
			<div className="container mx-auto px-4 max-w-4xl">
				<h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
					Frequently Asked Questions
				</h2>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors duration-200"
							>
								<span className="font-semibold text-gray-100">
									{faq.question}
								</span>
								<motion.svg
									animate={{ rotate: openIndex === index ? 180 : 0 }}
									className="w-5 h-5 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</motion.svg>
							</button>

							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="px-6 py-4 border-t border-gray-700 text-gray-400">
											{faq.answer}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-gray-400 mb-6">
						Still have questions? We&apos;re here to help!
					</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200"
					>
						Contact Us
					</motion.button>
				</div>
			</div>
		</section>
	);
}
