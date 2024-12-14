import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

export default function ContactForm() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: ""
	});

	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("submitting");

		try {
			// TODO: Implement actual form submission logic
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
			setStatus("success");
			setFormData({
				name: "",
				email: "",
				phone: "",
				subject: "",
				message: ""
			});
		} catch (error) {
			setStatus("error");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
			<div className="container mx-auto px-4 max-w-4xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
						Contact Us
					</h2>

					<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										value={formData.name}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Phone (optional)
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									/>
								</div>

								<div>
									<label
										htmlFor="subject"
										className="block text-sm font-medium text-gray-300 mb-2"
									>
										Subject
									</label>
									<select
										id="subject"
										name="subject"
										required
										value={formData.subject}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									>
										<option value="">Select a subject</option>
										<option value="general">General Inquiry</option>
										<option value="maintenance">Maintenance Request</option>
										<option value="complaint">File a Complaint</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									required
									value={formData.message}
									onChange={handleChange}
									rows={4}
									className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
								/>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									disabled={status === "submitting"}
									className={`
                    px-6 py-3 rounded-lg font-semibold text-white
                    ${
											status === "submitting"
												? "bg-gray-600 cursor-not-allowed"
												: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
										}
                  `}
								>
									{status === "submitting" ? "Sending..." : "Send Message"}
								</button>
							</div>

							{status === "success" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-400"
								>
									Thank you for your message! We&apos;ll get back to you soon.
								</motion.div>
							)}

							{status === "error" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="p-4 rounded-lg bg-red-500/20 border border-red-500 text-red-400"
								>
									There was an error sending your message. Please try again
									later.
								</motion.div>
							)}
						</form>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
