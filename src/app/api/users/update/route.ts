import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthOptions";

export async function PUT(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { name, image } = await req.json();

		await db.update(users).set({ name, image }).where(eq(users.email, session.user.email));

		return NextResponse.json({ message: "User updated" });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
