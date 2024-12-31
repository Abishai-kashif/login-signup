import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

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

		// const user = await getUser(email);
		const user = {
			email: email,
			password: password,
		};

		if (!user) {
			return NextResponse.json({
				message: "invalid email or password",
			});
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);

		if (passwordsMatch) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}
	}

	return NextResponse.json({
		message: "invalid email or password",
	});
};
