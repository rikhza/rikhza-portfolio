"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	ArrowDown,
	Network,
	AppWindowMac,
	CodeXml,
	Blocks,
	Download,
} from "lucide-react";
import ParticlesBackground from "@/components/particles";

export default function Hero() {
	const scrollToResume = () => {
		const resumeSection = document.getElementById("resume");
		if (resumeSection) {
			resumeSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="relative min-h-[90vh] flex items-center overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ duration: 1 }}
					className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
				/>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.2 }}
					transition={{ duration: 1, delay: 0.3 }}
					className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900"
				/>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.05 }}
					transition={{ duration: 1, delay: 0.6 }}
					className="absolute top-0 left-0 w-full h-full bg-grid-pattern"
				/>
				<ParticlesBackground />
			</div>

			<div className="container relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Text Content */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-center lg:text-left"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50"
						>
							<Network size={16} className="animate-pulse" />
							<span className="text-sm font-medium">
								IT Project Technical Lead
							</span>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
						>
							<span className="block">Muhammad</span>
							<span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
								Rikhza Maulana
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
						>
							IT professional with a Master's in Computer Science
							and experience in development, system architecture,
							and team leadership. Skilled in delivering impactful
							solutions by combining technical expertise with
							strategic project management.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.8 }}
							className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
						>
							<Button
								onClick={scrollToResume}
								className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transform transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
							>
								More
								<ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
							</Button>
							<Button
								variant="outline"
								className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 transform transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10"
							>
								<Download className="mr-2 h-4 w-4" />
								Download CV
							</Button>
						</motion.div>
					</motion.div>

					{/* Right Column - Tech Stack Visualization */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="relative hidden lg:block"
					>
						<div className="glass-card p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 shadow-lg shadow-blue-500/10">
							<div className="grid grid-cols-2 gap-6">
								{/* Tech Stack Items */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.5 }}
									className="glass-card p-6 rounded-xl border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50"
								>
									<AppWindowMac
										className="text-blue-600 dark:text-blue-400 mb-4"
										size={24}
									/>
									<h3 className="font-semibold mb-2">
										System Architect
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Enterprise & Cloud Architecture Mindset
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.6 }}
									className="glass-card p-6 rounded-xl border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50"
								>
									<CodeXml
										className="text-blue-600 dark:text-blue-400 mb-4"
										size={24}
									/>
									<h3 className="font-semibold mb-2">
										Application Development
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Full Stack Web Dev, Low Code Dev, Cloud
										DevOps
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.7 }}
									className="glass-card p-6 rounded-xl border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50"
								>
									<Blocks
										className="text-blue-600 dark:text-blue-400 mb-4"
										size={24}
									/>
									<h3 className="font-semibold mb-2">
										Data Science
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Data Analyst, Data Engineer, BI
										Developer, Database
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: 0.8 }}
									className="glass-card p-6 rounded-xl border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50"
								>
									<Network
										className="text-blue-600 dark:text-blue-400 mb-4"
										size={24}
									/>
									<h3 className="font-semibold mb-2">
										Technical Leadership
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Team Management & Mentoring
									</p>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
