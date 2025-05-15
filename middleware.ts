import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Get the pathname of the request
	const path = request.nextUrl.pathname;

	// Define public paths that don't require authentication
	const isPublicPath = path === "/login";

	// Get the session from the cookies
	const session = request.cookies.get("session")?.value;

	// Redirect logic
	if (isPublicPath && session) {
		// If user is logged in and tries to access login page, redirect to admin
		return NextResponse.redirect(new URL("/admin/portfolio", request.url));
	}

	if (!isPublicPath && !session) {
		// If user is not logged in and tries to access protected route, redirect to login
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// If user is accessing a protected route, verify the session
	if (!isPublicPath && session) {
		try {
			const sessionData = JSON.parse(decodeURIComponent(session));
			if (!sessionData.username || !sessionData.role) {
				// If session is invalid, clear the cookie and redirect to login
				const response = NextResponse.redirect(
					new URL("/login", request.url)
				);
				response.cookies.delete("session");
				return response;
			}
		} catch (error) {
			// If session is invalid, clear the cookie and redirect to login
			const response = NextResponse.redirect(
				new URL("/login", request.url)
			);
			response.cookies.delete("session");
			return response;
		}
	}

	return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
	matcher: ["/admin/:path*", "/login"],
};
