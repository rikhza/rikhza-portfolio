import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();
		console.log("Login attempt for username:", username);

		await connectDB();
		const user = await User.findOne({ username });
		console.log("User found:", user ? "Yes" : "No");

		if (!user || user.password !== password) {
			console.log("Invalid credentials for username:", username);
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Create response
		const response = NextResponse.json(
			{
				success: true,
				message: "Login successful",
				user: {
					username: user.username,
					role: user.role,
				},
			},
			{ status: 200 }
		);

		// Set session cookie
		response.cookies.set({
			name: "session",
			value: JSON.stringify({ username: user.username, role: user.role }),
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 86400, // 1 day
			path: "/",
		});

		console.log("Session cookie set");
		return response;
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "Login failed" }, { status: 500 });
	}
}
