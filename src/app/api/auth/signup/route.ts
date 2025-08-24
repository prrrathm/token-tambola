import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: "Email & password required" }, { status: 400 });
		}

		const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
		if (existing.length > 0) {
			return NextResponse.json({ error: "User already exists" }, { status: 400 });
		}

		const hashed = await hashPassword(password);

		await db.insert(users).values({
			name,
			email,
			password: hashed,
		});

		return NextResponse.json({ message: "User created" }, { status: 201 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
