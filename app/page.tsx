import { Suspense } from "react";
import Hero from "@/components/sections/hero";
import ResumeSection from "@/components/sections/resume-section";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import BlogSection from "@/components/sections/blog-section";
import Contact from "@/components/sections/contact";
import SectionLoader from "@/components/section-loader";
import {
	FolderIcon,
	BookOpenIcon,
	MailIcon,
	GraduationCapIcon,
} from "lucide-react";

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<Hero />

			{/* Resume Section */}
			<section
				id="resume"
				className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900"
			>
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<div className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-6">
							<GraduationCapIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
							My Resume
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
							Explore my professional journey, skills, and
							achievements
						</p>
					</div>
					<Suspense fallback={<SectionLoader />}>
						<ResumeSection />
					</Suspense>
				</div>
			</section>

			{/* Portfolio Section */}
			<section id="portfolio" className="py-24">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<div className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-6">
							<FolderIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
							My Projects
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
							Discover my latest work and creative endeavors
						</p>
					</div>
					<Suspense fallback={<SectionLoader />}>
						<PortfolioSection />
					</Suspense>
				</div>
			</section>

			{/* Blog Section */}
			<section
				id="blog"
				className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900"
			>
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<div className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-6">
							<BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
							My Blog
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
							Thoughts, insights, and stories from my journey
						</p>
					</div>
					<Suspense fallback={<SectionLoader />}>
						<BlogSection />
					</Suspense>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-24">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<div className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-6">
							<MailIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
							Get In Touch
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
							Let's connect and discuss your next project
						</p>
					</div>
					<Contact />
				</div>
			</section>
		</main>
	);
}
