import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
	const credentials = req.json();

	const parsedCredentials = z
		.object({
			email: z.string().email(),
			password: z.string().min(8),
		})
		.safeParse(credentials);

	if (parsedCredentials.success) {
		const { email, password } = parsedCredentials.data;

		// insert user to database

		// if inserted successfully, redirect to the dashboard (insert the password by bycrpting it)

		const isInserted = email && password ? true : false;

		if (isInserted) {
			const cookieStore = await cookies();
			cookieStore.set("isLoggedIn", "1");
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}

		return NextResponse.json({
			message: "Some database error occurred, Please try again",
		});
	}

	return NextResponse.json({
		message: "invalid email or password",
	});
};
