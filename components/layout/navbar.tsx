"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/shared/theme-toggle";

const navLinks = [
	{ id: "home", name: "Home", href: "/" },
	{ id: "resume", name: "Resume", href: "#resume" },
	{ id: "portfolio", name: "Portfolio", href: "#portfolio" },
	{ id: "blog", name: "Blog", href: "#blog" },
	{ id: "contact", name: "Contact", href: "#contact" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);

			// Update active section based on scroll position
			const sections = navLinks.map((link) =>
				link.href.replace("#", "").replace("/", "")
			);
			const currentSection = sections.find((section) => {
				if (section === "") {
					return window.scrollY < 100;
				}
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top <= 100 && rect.bottom >= 100;
				}
				return false;
			});
			setActiveSection(currentSection || "");
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "py-3 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg"
					: "py-5 bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Link
							href="/"
							className="text-2xl font-display font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
						>
							Rikhza
						</Link>
					</motion.div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navLinks.map((link, index) => (
							<motion.div
								key={`desktop-${link.id}`}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.1 * index,
								}}
							>
								<Link
									href={link.href}
									className={`relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
										activeSection ===
										link.href
											.replace("#", "")
											.replace("/", "")
											? "text-blue-600 dark:text-blue-400"
											: ""
									}`}
								>
									{link.name}
									<motion.span
										className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400"
										initial={false}
										animate={{
											width:
												activeSection ===
												link.href
													.replace("#", "")
													.replace("/", "")
													? "100%"
													: "0%",
										}}
										transition={{ duration: 0.3 }}
									/>
								</Link>
							</motion.div>
						))}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.6 }}
						>
							<ThemeToggle />
						</motion.div>
					</nav>

					{/* Mobile Navigation Toggle */}
					<div className="flex items-center md:hidden">
						<ThemeToggle />
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsOpen(!isOpen)}
							className="ml-4 text-gray-700 dark:text-gray-300 focus:outline-none"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</motion.button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			<AnimatePresence mode="sync">
				{isOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden backdrop-blur-md bg-white/70 dark:bg-gray-900/70 mt-2 mx-4 rounded-lg overflow-hidden shadow-lg"
					>
						<nav className="flex flex-col py-4">
							{navLinks.map((link, index) => (
								<motion.div
									key={`mobile-${link.id}`}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
								>
									<Link
										href={link.href}
										className={`px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
											activeSection ===
											link.href
												.replace("#", "")
												.replace("/", "")
												? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
												: ""
										}`}
										onClick={() => setIsOpen(false)}
									>
										{link.name}
									</Link>
								</motion.div>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
