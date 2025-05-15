const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const client = new MongoClient(uri);

async function manageDatabase() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("portfolio");
		const collection = db.collection("portfolios");

		// Function to display all portfolios
		async function displayAllPortfolios() {
			const portfolios = await collection.find({}).toArray();
			console.log("\nAll Portfolio Items:");
			portfolios.forEach((portfolio) => {
				console.log(`\nID: ${portfolio._id}`);
				console.log(`Title: ${portfolio.title}`);
				console.log(`Description: ${portfolio.description}`);
				console.log(
					`Technologies: ${portfolio.technologies.join(", ")}`
				);
				console.log(`Featured: ${portfolio.featured}`);
			});
		}

		// Function to add a new portfolio
		async function addPortfolio(portfolioData) {
			const result = await collection.insertOne(portfolioData);
			console.log(`\nAdded new portfolio with ID: ${result.insertedId}`);
		}

		// Function to update a portfolio
		async function updatePortfolio(id, updateData) {
			const result = await collection.updateOne(
				{ _id: id },
				{ $set: { ...updateData, updatedAt: new Date() } }
			);
			console.log(
				`\nUpdated portfolio: ${result.modifiedCount} document(s) modified`
			);
		}

		// Function to delete a portfolio
		async function deletePortfolio(id) {
			const result = await collection.deleteOne({ _id: id });
			console.log(
				`\nDeleted portfolio: ${result.deletedCount} document(s) deleted`
			);
		}

		// Function to toggle featured status
		async function toggleFeatured(id) {
			const portfolio = await collection.findOne({ _id: id });
			if (portfolio) {
				const result = await collection.updateOne(
					{ _id: id },
					{
						$set: {
							featured: !portfolio.featured,
							updatedAt: new Date(),
						},
					}
				);
				console.log(
					`\nToggled featured status for portfolio: ${result.modifiedCount} document(s) modified`
				);
			}
		}

		// Example usage:
		console.log("\nDatabase Management Options:");
		console.log("1. Display all portfolios");
		console.log("2. Add new portfolio");
		console.log("3. Update portfolio");
		console.log("4. Delete portfolio");
		console.log("5. Toggle featured status");
		console.log("6. Exit");

		// You can implement a command-line interface here to interact with these functions
		// For now, we'll just display all portfolios
		await displayAllPortfolios();
	} catch (error) {
		console.error("Error:", error);
	} finally {
		await client.close();
		console.log("\nDisconnected from MongoDB");
	}
}

manageDatabase().catch(console.error);
