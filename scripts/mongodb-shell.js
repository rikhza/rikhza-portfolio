const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const client = new MongoClient(uri);

async function main() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("portfolio");
		const collection = db.collection("portfolios");

		// Example portfolio data
		const portfolioData = {
			title: "Sample Portfolio Item",
			description: "This is a sample portfolio item",
			imageUrl: "/uploads/processed/sample.jpg",
			technologies: ["React", "Node.js", "MongoDB"],
			projectUrl: "https://example.com",
			githubUrl: "https://github.com/example",
			featured: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Insert a sample portfolio item
		const result = await collection.insertOne(portfolioData);
		console.log("Inserted portfolio item:", result.insertedId);

		// Find all portfolio items
		const portfolios = await collection.find({}).toArray();
		console.log("All portfolio items:", portfolios);

		// Find featured portfolio items
		const featuredPortfolios = await collection
			.find({ featured: true })
			.toArray();
		console.log("Featured portfolio items:", featuredPortfolios);
	} catch (error) {
		console.error("Error:", error);
	} finally {
		await client.close();
		console.log("Disconnected from MongoDB");
	}
}

main().catch(console.error);
