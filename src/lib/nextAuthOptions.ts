import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const [user] = await db
					.select()
					.from(users)
					.where(eq(users.email, credentials.email))
					.limit(1);

				if (!user || !user.password) return null;

				const valid = await verifyPassword(credentials.password, user.password);
				if (!valid) return null;

				return { id: user.id, email: user.email, name: user.name };
			},
		}),
	],
	session: {
		strategy: "database", // store sessions in DB
	},
	pages: {
		signIn: "/auth/signin", // optional custom signin page
	},
	secret: process.env.NEXTAUTH_SECRET,
};
