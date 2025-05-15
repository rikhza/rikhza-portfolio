"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getMediumPosts } from "@/lib/medium";

interface MediumArticle {
	title: string;
	link: string;
	pubDate: string;
	thumbnail: string;
	categories: string[];
	description: string;
	readingTime: string;
}

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

export default function BlogSection() {
	const [articles, setArticles] = useState<MediumArticle[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMediumArticles = async () => {
			try {
				const items = await getMediumPosts();
				console.log("Medium API Response:", items);

				if (items.length === 0) {
					console.log("No articles found");
					setArticles([]);
					return;
				}

				const formattedArticles = items.map((item: any) => {
					// Extract image from content
					let thumbnail = "/blog-placeholder.jpg";
					if (item.thumbnail) {
						thumbnail = item.thumbnail;
					} else if (item.content) {
						// Try to find the first image in the content
						const imgMatch = item.content.match(
							/<img[^>]+src="([^">]+)"/
						);
						if (imgMatch && imgMatch[1]) {
							thumbnail = imgMatch[1];
						}
					}

					return {
						title: item.title || "Untitled",
						link: item.link || "#",
						pubDate: new Date(item.pubDate).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "long",
								day: "numeric",
							}
						),
						thumbnail,
						categories: item.categories || [],
						description:
							(item.description || "")
								.replace(/<[^>]*>/g, "")
								.slice(0, 150) + "...",
						readingTime: `${Math.ceil(
							(item.content || "").split(" ").length / 200
						)} min read`,
					};
				});
				setArticles(formattedArticles);
			} catch (err) {
				console.error("Error fetching Medium articles:", err);
				setError(
					err instanceof Error
						? err.message
						: "Failed to fetch articles. Please try again later."
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMediumArticles();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="relative">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
					<div className="absolute inset-0 animate-pulse rounded-full bg-blue-100/50"></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12 px-4">
				<div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
					<p className="text-red-500 dark:text-red-400 mb-4">
						Failed to load articles: {error}
					</p>
					<Button
						variant="outline"
						onClick={() => window.location.reload()}
						className="hover:bg-red-50 dark:hover:bg-red-900/30"
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: "-100px" }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
			>
				{articles.map((article, index) => (
					<motion.div key={index} variants={itemVariants}>
						<Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
							<div className="relative h-48 sm:h-56 overflow-hidden rounded-t-lg">
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
								<img
									src={article.thumbnail}
									alt={article.title}
									className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
							<CardHeader className="space-y-3">
								<CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
									{article.title}
								</CardTitle>
								<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
									<div className="flex items-center bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-full">
										<Calendar className="w-4 h-4 mr-1.5" />
										{article.pubDate}
									</div>
									<div className="flex items-center bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-full">
										<Clock className="w-4 h-4 mr-1.5" />
										{article.readingTime}
									</div>
								</div>
							</CardHeader>
							<CardContent className="flex-grow space-y-4">
								<p className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm sm:text-base">
									{article.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{article.categories
										.slice(0, 3)
										.map((category, idx) => (
											<span
												key={idx}
												className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full"
											>
												<Tag className="w-3 h-3 mr-1" />
												{category}
											</span>
										))}
								</div>
							</CardContent>
							<CardFooter className="pt-4 border-t border-gray-100 dark:border-gray-700/50">
								<Button
									className="w-full group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors"
									asChild
								>
									<a
										href={article.link}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2"
									>
										<ExternalLink className="w-4 h-4" />
										<span>Read on Medium</span>
									</a>
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
