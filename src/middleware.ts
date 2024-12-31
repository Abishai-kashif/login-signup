import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export const middleware = async (request: NextRequest) => {
// 	const cookieStore = await cookies();
// 	const isLoggedIn = cookieStore.get("isLoggedIn");

// 	if (!isLoggedIn) {
// 		return NextResponse.redirect(new URL("/login", request.url));
// 	}

// 	if (isLoggedIn?.value === "0") {
// 		return NextResponse.redirect(new URL("/login", request.url));
// 	}

// 	if (isLoggedIn?.value === "1" && request.nextUrl.pathname === "/login") {
// 		return NextResponse.redirect(new URL("/", request.url));
// 	}

// 	return NextResponse.next();
// };

// export const config = {
// 	matcher: ["/", "/login"],
// };

export const middleware = async (req: NextRequest) => {
	const cookieStore = await cookies();
	const isLoggedIn = !!cookieStore.get("isLoggedIn");

	const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

	if (isOnDashboard) {
		if (isLoggedIn) {
			// if already authenticated, give them authority to the dashboard page.
			return NextResponse.next();
		}

		// otherwise redirect them to login to let them authenticate themself's first
		return NextResponse.redirect(new URL("/login", req.url));
	} else if (isLoggedIn) {
		// and person isLoggedIn redirect them directly to dashboard
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
