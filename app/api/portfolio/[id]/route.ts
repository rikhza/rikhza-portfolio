import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();
		const body = await request.json();

		const updatedItem = await Portfolio.findByIdAndUpdate(
			params.id,
			{ ...body, updatedAt: new Date() },
			{ new: true }
		);

		if (!updatedItem) {
			return NextResponse.json(
				{ error: "Portfolio item not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(updatedItem);
	} catch (error) {
		console.error("Error updating portfolio item:", error);
		return NextResponse.json(
			{ error: "Failed to update portfolio item" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();
		const deletedItem = await Portfolio.findByIdAndDelete(params.id);

		if (!deletedItem) {
			return NextResponse.json(
				{ error: "Portfolio item not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Portfolio item deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting portfolio item:", error);
		return NextResponse.json(
			{ error: "Failed to delete portfolio item" },
			{ status: 500 }
		);
	}
}
