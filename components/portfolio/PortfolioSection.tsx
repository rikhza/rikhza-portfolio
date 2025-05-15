"use client";

import { useEffect, useState, useMemo } from "react";
import { Portfolio } from "@/types/portfolio";
import { getPortfolios } from "@/services/portfolio";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	CodeBracketIcon,
	GlobeAltIcon,
	FolderIcon,
	ArrowTopRightOnSquareIcon,
	StarIcon,
} from "@heroicons/react/24/outline";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export default function PortfolioSection() {
	const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeCategory, setActiveCategory] = useState("All");
	const [isHovered, setIsHovered] = useState<string | null>(null);

	// Memoize categories to prevent unnecessary recalculations
	const categories = useMemo(() => {
		return [
			"All",
			...new Set(portfolios.map((portfolio) => portfolio.category)),
		];
	}, [portfolios]);

	// Memoize filtered portfolios
	const filteredPortfolios = useMemo(() => {
		return portfolios.filter(
			(portfolio) =>
				activeCategory === "All" ||
				portfolio.category === activeCategory
		);
	}, [portfolios, activeCategory]);

	useEffect(() => {
		const fetchPortfolios = async () => {
			try {
				const data = await getPortfolios();
				setPortfolios(data);
			} catch (err) {
				setError("Failed to load portfolios");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchPortfolios();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="relative">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
					<div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-t-2 border-b-2 border-primary/30"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
				<div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 rounded-lg">
					<p className="text-lg font-medium">{error}</p>
					<p className="text-sm text-red-600 dark:text-red-400 mt-2">
						Please try again later
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Category Tabs */}
			<div className="mb-8 md:mb-12 lg:mb-16">
				{/* Mobile Category Selector */}
				<div className="sm:hidden mb-4">
					<div className="relative">
						<select
							value={activeCategory}
							onChange={(e) => setActiveCategory(e.target.value)}
							aria-label="Select portfolio category"
							className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none shadow-sm"
						>
							{categories.map((category) => (
								<option
									key={category}
									value={category}
									className="py-2"
								>
									{category}
								</option>
							))}
						</select>
						<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
							<svg
								className="w-5 h-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Desktop Category Tabs */}
				<div className="hidden sm:flex justify-center gap-2 md:gap-3">
					{categories.map((category) => (
						<motion.button
							key={category}
							onClick={() => setActiveCategory(category)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 text-sm md:text-base font-medium flex items-center gap-2 ${
								activeCategory === category
									? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30"
									: "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
							}`}
						>
							{category === "All" ? (
								<StarIcon className="w-4 h-4" />
							) : (
								<CodeBracketIcon className="w-4 h-4" />
							)}
							<span>{category}</span>
						</motion.button>
					))}
				</div>

				{/* Active Category Indicator for Mobile */}
				<motion.div
					className="sm:hidden mt-4"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm">
						{activeCategory === "All" ? (
							<StarIcon className="w-4 h-4 text-primary" />
						) : (
							<CodeBracketIcon className="w-4 h-4 text-primary" />
						)}
						<span className="text-sm font-medium text-gray-700 dark:text-gray-200">
							{activeCategory}
						</span>
					</div>
				</motion.div>
			</div>

			{/* Portfolio Grid */}
			<AnimatePresence mode="wait">
				<motion.div
					key={activeCategory}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
				>
					{filteredPortfolios.map((portfolio) => (
						<motion.div
							key={portfolio._id}
							variants={itemVariants}
							onHoverStart={() => setIsHovered(portfolio._id)}
							onHoverEnd={() => setIsHovered(null)}
							className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
						>
							<div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
								<Image
									src={portfolio.imageUrl}
									alt={portfolio.title}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									priority={portfolio.featured}
									loading={
										portfolio.featured ? "eager" : "lazy"
									}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								{portfolio.featured && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg"
									>
										<StarIcon className="w-3 h-3" />
										Featured
									</motion.div>
								)}
							</div>
							<div className="p-4 sm:p-6 md:p-8">
								<h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors dark:text-white line-clamp-1">
									{portfolio.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-2 text-sm md:text-base">
									{portfolio.description}
								</p>
								<div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
									{portfolio.technologies.map((tech) => (
										<motion.span
											key={tech}
											whileHover={{ scale: 1.05 }}
											className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs font-medium flex items-center gap-1"
										>
											<CodeBracketIcon className="w-3 h-3" />
											{tech}
										</motion.span>
									))}
								</div>
								<div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
									<Link
										href={portfolio.projectUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm md:text-base group/link"
									>
										<GlobeAltIcon className="w-4 h-4 mr-2" />
										View Project
										<motion.svg
											className="w-4 h-4 ml-2"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											animate={{
												x:
													isHovered === portfolio._id
														? 4
														: 0,
											}}
											transition={{ duration: 0.2 }}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</motion.svg>
									</Link>
									<Link
										href={portfolio.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-sm md:text-base group/link"
									>
										<CodeBracketIcon className="w-4 h-4 mr-2" />
										View Code
										<motion.svg
											className="w-4 h-4 ml-2"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											animate={{
												x:
													isHovered === portfolio._id
														? 4
														: 0,
											}}
											transition={{ duration: 0.2 }}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</motion.svg>
									</Link>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
