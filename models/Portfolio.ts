import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	technologies: [{ type: String }],
	projectUrl: { type: String },
	githubUrl: { type: String, required: true },
	featured: { type: Boolean, default: false },
	category: { type: String, enum: ["development", "data"], required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Portfolio =
	mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
