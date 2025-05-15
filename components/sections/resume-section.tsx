"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Briefcase,
	GraduationCap,
	Award,
	Languages,
	Code,
	GitBranch,
	Cloud,
	Server,
	Database,
	Users,
	MessageSquare,
	Lightbulb,
	GitPullRequest,
	Terminal,
	Laptop,
	FileCode,
	Network,
	Settings,
	LayoutGrid,
	Command,
	Boxes,
	Workflow,
	Brain,
	Handshake,
	Presentation,
	Trophy,
} from "lucide-react";
import { ReactElement } from "react";

interface SkillItem {
	text: string;
	icon: ReactElement;
}

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
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export default function ResumeSection() {
	const [activeTab, setActiveTab] = useState("education");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const education = [
		{
			id: "edu-1",
			degree: "Master's Degree, Computer Science",
			institution: "Binus University",
			period: "Sep 2023 - Aug 2025",
			details: "Data Science Concentration",
			gpa: "GPA: 3.93",
		},
		{
			id: "edu-2",
			degree: "Bachelor's Degree, Information System",
			institution: "Binus University",
			period: "Sep 2020 - Sep 2024",
			details: "Digital Technology Concentration",
			gpa: "GPA: 3.85",
		},
	];

	const experience = [
		{
			id: "exp-1",
			position: "IT System Architect",
			company: "Ministry of Land Agency (ATR/BPN)",
			period: "Oct 2024 - Mar 2025",
			responsibilities: [
				"Developed a document intelligence system improving tracking efficiency by 50%.",
				"Managed architecture and analysis of 2,500+ documents monthly.",
				"Collaborated with departments for technical alignment and performance optimization.",
			],
		},
		{
			id: "exp-2",
			position: "Intern System Developer",
			company: "PT Sarana Solusindo Informatika",
			period: "Feb 2023 - Aug 2023",
			responsibilities: [
				"Developed 3+ apps with Microsoft Power Platform for process automation.",
				"Created Power BI dashboards and integrated data tools into business workflow.",
				"Assisted in UAT testing, deployment, and client training.",
			],
		},
		{
			id: "exp-3",
			position: "Intern FoC and NoC Staff",
			company: "Goesar Optix",
			period: "Mar 2019 - Jun 2019",
			responsibilities: [
				"Maintained Linux-based systems and supported 50+ devices with 99% uptime.",
				"Configured network devices and contributed to IT infrastructure setup.",
				"Troubleshot and assisted with firmware and system monitoring.",
			],
		},
	];

	const skills = [
		{
			id: "skill-1",
			category: "Technical Skills",
			items: [
				{
					text: "Project & Team Management (Microsoft Project, Agile Methodologies)",
					icon: (
						<Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Cloud & DevOps (AWS, Alibaba Cloud, Linux Server Admin, Git, CI/CD)",
					icon: (
						<Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Programming (Java, JavaScript, TypeScript, Python, C++, SQL)",
					icon: (
						<Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Web & App Development (Microsoft Power Platform, HTML/CSS/JS, Mendix, Git, REST API)",
					icon: (
						<FileCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Data Analytics (Power BI, SQL Server, Excel, Python Pandas/NumPy, DAX)",
					icon: (
						<Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Database Management (SQL Server, CRUD, Relational Data Modeling)",
					icon: (
						<Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
			],
		},
		{
			id: "skill-2",
			category: "Soft Skills",
			items: [
				{
					text: "Leadership & Training",
					icon: (
						<Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Stakeholder Engagement",
					icon: (
						<Handshake className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
				{
					text: "Communication & Collaboration",
					icon: (
						<MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					),
				},
			],
		},
	];

	const certifications = [
		{ id: "cert-1", name: "CompTIA Linux+" },
		{ id: "cert-2", name: "AWS Certified Solution Architect" },
		{ id: "cert-3", name: "Alibaba ACA Cloud Computing" },
		{ id: "cert-4", name: "Mendix Rapid Developer" },
		{ id: "cert-5", name: "DataCamp Intermediate SQL" },
		{ id: "cert-6", name: "Apsara Alibaba Clouder AI" },
	];

	const awards = [
		{
			id: "award-1",
			name: "President of Binus Student Learning Community (BSLC) Alam Sutera 2022",
		},
		{ id: "award-2", name: "SIS Appreciation 2022" },
		{ id: "award-3", name: "Best Presenter of BICOSDA Conference" },
	];

	const languages = [
		{ id: "lang-1", name: "Bahasa Indonesia" },
		{ id: "lang-2", name: "English" },
		{ id: "lang-3", name: "Japanese" },
	];

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<Tabs
				defaultValue="education"
				value={activeTab}
				onValueChange={setActiveTab}
				className="relative"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="sticky top-4 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg mb-8"
				>
					{isMobile ? (
						<div className="overflow-x-auto pb-2 px-1 scrollbar-hide">
							<TabsList className="flex w-max p-1.5 glass-card backdrop-blur-sm border border-blue-100/50 dark:border-blue-900/50 shadow-lg shadow-blue-500/10 rounded-xl">
								<TabsTrigger
									value="education"
									className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100/50 dark:data-[state=active]:bg-blue-900/50 rounded-lg py-3 px-4 min-w-[80px] data-[state=active]:shadow-md"
								>
									<GraduationCap
										size={18}
										className="text-blue-600 dark:text-blue-400"
									/>
									<span>Edu</span>
								</TabsTrigger>
								<TabsTrigger
									value="experience"
									className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100/50 dark:data-[state=active]:bg-blue-900/50 rounded-lg py-3 px-4 min-w-[80px] data-[state=active]:shadow-md"
								>
									<Briefcase
										size={18}
										className="text-blue-600 dark:text-blue-400"
									/>
									<span>Exp</span>
								</TabsTrigger>
								<TabsTrigger
									value="skills"
									className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100/50 dark:data-[state=active]:bg-blue-900/50 rounded-lg py-3 px-4 min-w-[80px] data-[state=active]:shadow-md"
								>
									<Code
										size={18}
										className="text-blue-600 dark:text-blue-400"
									/>
									<span>Skills</span>
								</TabsTrigger>
								<TabsTrigger
									value="certifications"
									className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100/50 dark:data-[state=active]:bg-blue-900/50 rounded-lg py-3 px-4 min-w-[80px] data-[state=active]:shadow-md"
								>
									<Award
										size={18}
										className="text-blue-600 dark:text-blue-400"
									/>
									<span>Cert</span>
								</TabsTrigger>
								<TabsTrigger
									value="languages"
									className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 data-[state=active]:bg-blue-100/50 dark:data-[state=active]:bg-blue-900/50 rounded-lg py-3 px-4 min-w-[80px] data-[state=active]:shadow-md"
								>
									<Languages
										size={18}
										className="text-blue-600 dark:text-blue-400"
									/>
									<span>Lang</span>
								</TabsTrigger>
							</TabsList>
						</div>
					) : (
						<div className="p-2 glass-card backdrop-blur-sm border border-blue-100/50 dark:border-blue-900/50 shadow-lg shadow-blue-500/10 rounded-xl">
							<TabsList className="grid grid-cols-5 gap-3">
								<TabsTrigger
									value="education"
									className="relative flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r from-blue-50 to-blue-100/50 dark:data-[state=active]:from-blue-900/50 dark:data-[state=active]:to-blue-800/50 rounded-lg py-4 px-6 data-[state=active]:shadow-md group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
									<GraduationCap
										size={22}
										className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
									/>
									<span className="font-medium text-base">
										Education
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="experience"
									className="relative flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r from-blue-50 to-blue-100/50 dark:data-[state=active]:from-blue-900/50 dark:data-[state=active]:to-blue-800/50 rounded-lg py-4 px-6 data-[state=active]:shadow-md group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
									<Briefcase
										size={22}
										className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
									/>
									<span className="font-medium text-base">
										Experience
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="skills"
									className="relative flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r from-blue-50 to-blue-100/50 dark:data-[state=active]:from-blue-900/50 dark:data-[state=active]:to-blue-800/50 rounded-lg py-4 px-6 data-[state=active]:shadow-md group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
									<Code
										size={22}
										className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
									/>
									<span className="font-medium text-base">
										Skills
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="certifications"
									className="relative flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r from-blue-50 to-blue-100/50 dark:data-[state=active]:from-blue-900/50 dark:data-[state=active]:to-blue-800/50 rounded-lg py-4 px-6 data-[state=active]:shadow-md group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
									<Award
										size={22}
										className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
									/>
									<span className="font-medium text-base">
										Certifications
									</span>
								</TabsTrigger>
								<TabsTrigger
									value="languages"
									className="relative flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] data-[state=active]:bg-gradient-to-r from-blue-50 to-blue-100/50 dark:data-[state=active]:from-blue-900/50 dark:data-[state=active]:to-blue-800/50 rounded-lg py-4 px-6 data-[state=active]:shadow-md group overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
									<Languages
										size={22}
										className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
									/>
									<span className="font-medium text-base">
										Languages
									</span>
								</TabsTrigger>
							</TabsList>
						</div>
					)}
				</motion.div>

				<AnimatePresence mode="wait">
					<TabsContent key="education-tab" value="education">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="space-y-4 sm:space-y-6"
						>
							{education.map((item, index) => (
								<motion.div
									key={item.id}
									variants={itemVariants}
									className="glass-card p-4 sm:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 border border-blue-100/50 dark:border-blue-900/50 rounded-xl"
								>
									<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
										<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
											{item.degree}
										</h3>
										<span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full inline-flex items-center justify-center">
											{item.period}
										</span>
									</div>
									<h4 className="text-base sm:text-lg font-medium mb-2 flex items-center gap-2">
										<GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										{item.institution}
									</h4>
									<p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
										{item.details}
									</p>
									<p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mt-2 flex items-center gap-2">
										<Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
										{item.gpa}
									</p>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>

					<TabsContent key="experience-tab" value="experience">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="space-y-4 sm:space-y-6"
						>
							{experience.map((item, index) => (
								<motion.div
									key={item.id}
									variants={itemVariants}
									className="glass-card p-4 sm:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 border border-blue-100/50 dark:border-blue-900/50 rounded-xl"
								>
									<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
										<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
											{item.position}
										</h3>
										<span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full inline-flex items-center justify-center">
											{item.period}
										</span>
									</div>
									<h4 className="text-base sm:text-lg font-medium mb-4 flex items-center gap-2">
										<Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										{item.company}
									</h4>
									<motion.ul
										variants={containerVariants}
										initial="hidden"
										animate="visible"
										className="space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-300"
									>
										{item.responsibilities.map(
											(resp, i) => (
												<motion.li
													key={`${item.id}-resp-${i}`}
													variants={itemVariants}
													className="flex items-start gap-3 p-2 sm:p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 text-sm sm:text-base"
												>
													<span className="text-blue-600 dark:text-blue-400 mt-1.5">
														•
													</span>
													{resp}
												</motion.li>
											)
										)}
									</motion.ul>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>

					<TabsContent key="skills-tab" value="skills">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="space-y-4 sm:space-y-6"
						>
							{skills.map((skillGroup, index) => (
								<motion.div
									key={skillGroup.id}
									variants={itemVariants}
									className="glass-card p-4 sm:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 border border-blue-100/50 dark:border-blue-900/50 rounded-xl"
								>
									<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4 sm:mb-6 flex items-center gap-2">
										{skillGroup.category ===
										"Technical Skills" ? (
											<Code className="w-5 h-5 sm:w-6 sm:h-6" />
										) : (
											<Users className="w-5 h-5 sm:w-6 sm:h-6" />
										)}
										{skillGroup.category}
									</h3>
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
										className="grid gap-3 sm:gap-4"
									>
										{skillGroup.items.map((skill, i) => (
											<motion.div
												key={`${skillGroup.id}-skill-${i}`}
												variants={itemVariants}
												className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
											>
												<div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/50">
													{skill.icon}
												</div>
												<p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
													{skill.text}
												</p>
											</motion.div>
										))}
									</motion.div>
								</motion.div>
							))}
						</motion.div>
					</TabsContent>

					<TabsContent
						key="certifications-tab"
						value="certifications"
					>
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="glass-card p-4 sm:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 border border-blue-100/50 dark:border-blue-900/50 rounded-xl"
						>
							<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4 sm:mb-6 flex items-center gap-2">
								<Award className="w-5 h-5 sm:w-6 sm:h-6" />
								Certifications & Awards
							</h3>
							<div className="mb-6 sm:mb-8">
								<h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
									<Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									Certifications
								</h4>
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="visible"
									className="grid gap-2 sm:gap-3"
								>
									{certifications.map((cert, i) => (
										<motion.div
											key={cert.id}
											variants={itemVariants}
											className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
										>
											<div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/50">
												<Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
											</div>
											<span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
												{cert.name}
											</span>
										</motion.div>
									))}
								</motion.div>
							</div>
							<div>
								<h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
									<Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									Awards
								</h4>
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="visible"
									className="grid gap-2 sm:gap-3"
								>
									{awards.map((award, i) => (
										<motion.div
											key={award.id}
											variants={itemVariants}
											className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
										>
											<div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/50">
												<Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
											</div>
											<span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
												{award.name}
											</span>
										</motion.div>
									))}
								</motion.div>
							</div>
						</motion.div>
					</TabsContent>

					<TabsContent key="languages-tab" value="languages">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="glass-card p-4 sm:p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 border border-blue-100/50 dark:border-blue-900/50 rounded-xl"
						>
							<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4 sm:mb-6 flex items-center gap-2">
								<Languages className="w-5 h-5 sm:w-6 sm:h-6" />
								Languages
							</h3>
							<motion.div
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								className="grid gap-2 sm:gap-3"
							>
								{languages.map((lang, i) => (
									<motion.div
										key={lang.id}
										variants={itemVariants}
										className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
									>
										<div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/50">
											<Languages className="w-4 h-4 text-blue-600 dark:text-blue-400" />
										</div>
										<span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
											{lang.name}
										</span>
									</motion.div>
								))}
							</motion.div>
						</motion.div>
					</TabsContent>
				</AnimatePresence>
			</Tabs>
		</div>
	);
}
