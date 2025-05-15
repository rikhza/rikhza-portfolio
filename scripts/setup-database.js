const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const client = new MongoClient(uri);

const samplePortfolios = [
	{
		title: "E-commerce Website",
		description:
			"A full-stack e-commerce platform built with Next.js and MongoDB",
		imageUrl: "/uploads/processed/ecommerce.jpg",
		technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
		projectUrl: "https://ecommerce-example.com",
		githubUrl: "https://github.com/example/ecommerce",
		featured: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Task Management App",
		description:
			"A collaborative task management application with real-time updates",
		imageUrl: "/uploads/processed/taskmanager.jpg",
		technologies: ["React", "Node.js", "Socket.io", "Express"],
		projectUrl: "https://taskmanager-example.com",
		githubUrl: "https://github.com/example/taskmanager",
		featured: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Portfolio Website",
		description:
			"A modern portfolio website showcasing my projects and skills",
		imageUrl: "/uploads/processed/portfolio.jpg",
		technologies: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
		],
		projectUrl: "https://portfolio-example.com",
		githubUrl: "https://github.com/example/portfolio",
		featured: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

async function setupDatabase() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("portfolio");
		const collection = db.collection("portfolios");

		// Drop existing collection if it exists
		await collection
			.drop()
			.catch(() =>
				console.log("Collection does not exist, creating new one")
			);

		// Create indexes
		await collection.createIndex({ title: 1 }, { unique: true });
		await collection.createIndex({ featured: 1 });
		await collection.createIndex({ createdAt: -1 });

		// Insert sample data
		const result = await collection.insertMany(samplePortfolios);
		console.log(`Inserted ${result.insertedCount} portfolio items`);

		// Verify the data
		const count = await collection.countDocuments();
		console.log(`Total documents in collection: ${count}`);

		// Display all portfolio items
		const portfolios = await collection.find({}).toArray();
		console.log("\nAll portfolio items:");
		portfolios.forEach((portfolio) => {
			console.log(`\nTitle: ${portfolio.title}`);
			console.log(`Description: ${portfolio.description}`);
			console.log(`Technologies: ${portfolio.technologies.join(", ")}`);
			console.log(`Featured: ${portfolio.featured}`);
		});

		// Display featured items
		const featuredCount = await collection.countDocuments({
			featured: true,
		});
		console.log(`\nTotal featured items: ${featuredCount}`);
	} catch (error) {
		console.error("Error:", error);
	} finally {
		await client.close();
		console.log("\nDisconnected from MongoDB");
	}
}

setupDatabase().catch(console.error);
