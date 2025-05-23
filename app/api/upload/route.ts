import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ error: "No file uploaded" },
				{ status: 400 }
			);
		}

		// Validate file type
		if (!file.type.startsWith("image/")) {
			return NextResponse.json(
				{ error: "File must be an image" },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Create unique filename
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const filename = `${uniqueSuffix}-${file.name}`;

		// Ensure uploads directory exists
		const uploadDir = join(process.cwd(), "public/uploads");
		const filepath = join(uploadDir, filename);

		// Write file to disk
		await writeFile(filepath, buffer);

		// Return the public URL
		return NextResponse.json({
			url: `/uploads/${filename}`,
			success: true,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json(
			{ error: "Error uploading file" },
			{ status: 500 }
		);
	}
}
