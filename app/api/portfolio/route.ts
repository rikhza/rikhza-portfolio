import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function GET() {
	try {
		await connectDB();
		const portfolios = await Portfolio.find({}).sort({ createdAt: -1 });
		return NextResponse.json(portfolios);
	} catch (error) {
		console.error("Error fetching portfolios:", error);
		return NextResponse.json(
			{ error: "Failed to fetch portfolios" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		await connectDB();
		const body = await request.json();

		const newPortfolio = new Portfolio({
			...body,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const savedPortfolio = await newPortfolio.save();
		return NextResponse.json(savedPortfolio, { status: 201 });
	} catch (error) {
		console.error("Error creating portfolio item:", error);
		return NextResponse.json(
			{ error: "Failed to create portfolio item" },
			{ status: 500 }
		);
	}
}
