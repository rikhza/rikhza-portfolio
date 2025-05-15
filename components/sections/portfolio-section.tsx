"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, ChartBar, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	technologies: string[];
	projectUrl: string;
	githubUrl: string;
	featured: boolean;
	category: "development" | "data";
	createdAt: string;
	updatedAt: string;
}

export default function PortfolioSection() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [activeCategory, setActiveCategory] = useState<
		"development" | "data"
	>("development");

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("/api/portfolio");
				if (!response.ok) {
					throw new Error("Failed to fetch projects");
				}
				const data = await response.json();
				setProjects(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load projects"
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-500 mb-4">
					Failed to load projects: {error}
				</p>
				<Button
					variant="outline"
					onClick={() => window.location.reload()}
				>
					Try Again
				</Button>
			</div>
		);
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "development":
				return <Code className="w-5 h-5" />;
			case "data":
				return <ChartBar className="w-5 h-5" />;
			default:
				return <Code className="w-5 h-5" />;
		}
	};

	const filteredProjects = projects.filter(
		(project) => project.category === activeCategory
	);

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-12">
			<Tabs
				defaultValue="development"
				className="w-full"
				onValueChange={(value) =>
					setActiveCategory(value as "development" | "data")
				}
			>
				<TabsList className="grid w-full grid-cols-2 mb-8">
					<TabsTrigger
						value="development"
						className="flex items-center gap-2"
					>
						<Code className="w-4 h-4" />
						Development
					</TabsTrigger>
					<TabsTrigger
						value="data"
						className="flex items-center gap-2"
					>
						<ChartBar className="w-4 h-4" />
						Data Projects
					</TabsTrigger>
				</TabsList>

				{["development", "data"].map((category) => (
					<TabsContent key={category} value={category}>
						<motion.div
							variants={container}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						>
							{filteredProjects.map((project) => (
								<motion.div key={project._id} variants={item}>
									<Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800">
										{project.imageUrl && (
											<div className="relative h-48 overflow-hidden rounded-t-lg">
												<img
													src={project.imageUrl}
													alt={project.title}
													className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
												/>
											</div>
										)}
										<CardHeader>
											<div className="flex items-center gap-2 mb-2">
												{getCategoryIcon(
													project.category
												)}
												<CardTitle className="text-xl text-blue-600 dark:text-blue-400">
													{project.title}
												</CardTitle>
											</div>
											{project.featured && (
												<span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
													Featured
												</span>
											)}
										</CardHeader>
										<CardContent className="flex-grow">
											<p className="text-gray-700 dark:text-gray-300 mb-4">
												{project.description}
											</p>
											<div className="flex flex-wrap gap-2 mb-4">
												{project.technologies.map(
													(tech) => (
														<span
															key={tech}
															className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full"
														>
															{tech}
														</span>
													)
												)}
											</div>
										</CardContent>
										<CardFooter className="flex justify-between pt-2 border-t dark:border-gray-700">
											<Button
												variant="outline"
												size="sm"
												asChild
											>
												<a
													href={project.githubUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center"
												>
													<Github className="w-4 h-4 mr-1" />
													Code
												</a>
											</Button>
											{project.projectUrl && (
												<Button size="sm" asChild>
													<a
														href={
															project.projectUrl
														}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center"
													>
														<ExternalLink className="w-4 h-4 mr-1" />
														Live Demo
													</a>
												</Button>
											)}
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
