"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Mail,
	Send,
	Linkedin,
	Github,
	Instagram,
	Code2,
	Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			toast({
				title: "Message sent!",
				description:
					"Thank you for your message. I'll get back to you soon.",
			});
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
			setIsSubmitting(false);
		}, 1500);
	};

	return (
		<div className="flex flex-col md:flex-row gap-12">
			{/* Contact Information */}
			<motion.div
				className="md:w-1/3"
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex items-center gap-3 mb-6">
					<Code2
						className="text-blue-600 dark:text-blue-400"
						size={24}
					/>
					<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
						Let's Connect
					</h3>
				</div>
				<p className="text-lg mb-8 text-gray-700 dark:text-gray-300 font-light leading-relaxed">
					I'm always open to discussing new projects, creative ideas,
					or opportunities to be part of your vision.
				</p>
				<div className="space-y-6">
					<div className="glass-card p-6 border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors">
						<div className="flex items-center gap-3 mb-4">
							<Terminal
								className="text-blue-600 dark:text-blue-400"
								size={20}
							/>
							<h4 className="font-semibold text-lg">
								Connect with me
							</h4>
						</div>
						<div className="flex space-x-4">
							<a
								href="https://linkedin.com/in/rikhza"
								target="_blank"
								rel="noopener noreferrer"
								className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
							>
								<Linkedin size={22} />
								<span className="sr-only">LinkedIn</span>
							</a>
							<a
								href="https://github.com/rikhza"
								target="_blank"
								rel="noopener noreferrer"
								className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black flex items-center justify-center text-white hover:from-gray-900 hover:to-black dark:hover:from-black dark:hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
							>
								<Github size={22} />
								<span className="sr-only">GitHub</span>
							</a>
							<a
								href="https://instagram.com/rizaa_mr"
								target="_blank"
								rel="noopener noreferrer"
								className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 flex items-center justify-center text-white hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
							>
								<Instagram size={22} />
								<span className="sr-only">Instagram</span>
							</a>
						</div>
					</div>

					<div className="glass-card p-6 border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors">
						<div className="flex items-center gap-3 mb-4">
							<Code2
								className="text-blue-600 dark:text-blue-400"
								size={20}
							/>
							<h4 className="font-semibold text-lg">
								Availability
							</h4>
						</div>
						<p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
							I'm currently available for freelance work and
							full-time positions. Feel free to reach out if you
							have any questions or would like to discuss
							potential opportunities.
						</p>
					</div>
				</div>
			</motion.div>

			{/* Contact Form */}
			<motion.div
				className="md:w-2/3"
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex items-center gap-3 mb-6">
					<Mail
						className="text-blue-600 dark:text-blue-400"
						size={24}
					/>
					<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
						Send Message
					</h3>
				</div>
				<form
					onSubmit={handleSubmit}
					className="glass-card p-8 border border-blue-100 dark:border-blue-900/50"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
							>
								Your Name
							</label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full bg-white/50 dark:bg-gray-900/50 border-blue-100 dark:border-blue-900/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
								placeholder="John Doe"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
							>
								Your Email
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full bg-white/50 dark:bg-gray-900/50 border-blue-100 dark:border-blue-900/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
								placeholder="john@example.com"
							/>
						</div>
					</div>

					<div className="mb-6">
						<label
							htmlFor="subject"
							className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
						>
							Subject
						</label>
						<Input
							id="subject"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							required
							className="w-full bg-white/50 dark:bg-gray-900/50 border-blue-100 dark:border-blue-900/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
							placeholder="How can I help you?"
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="message"
							className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
						>
							Message
						</label>
						<Textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							className="w-full min-h-[150px] bg-white/50 dark:bg-gray-900/50 border-blue-100 dark:border-blue-900/50 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
							placeholder="Your message here..."
						/>
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
					>
						{isSubmitting ? (
							<>
								<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
								Sending...
							</>
						) : (
							<>
								Send Message
								<Send size={16} className="ml-2" />
							</>
						)}
					</Button>
				</form>
			</motion.div>
		</div>
	);
}
