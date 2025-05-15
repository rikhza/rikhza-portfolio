import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		// Get session from request headers
		const cookieHeader = request.headers.get("cookie");
		const sessionCookie = cookieHeader
			?.split(";")
			.find((c) => c.trim().startsWith("session="))
			?.split("=")[1];

		if (!sessionCookie) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		try {
			const session = JSON.parse(decodeURIComponent(sessionCookie));
			if (session.username && session.role) {
				return NextResponse.json({
					authenticated: true,
					user: {
						username: session.username,
						role: session.role,
					},
				});
			}
			return NextResponse.json({ authenticated: false }, { status: 401 });
		} catch (error) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}
	} catch (error) {
		return NextResponse.json({ authenticated: false }, { status: 401 });
	}
}
