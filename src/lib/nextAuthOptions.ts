import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import { randomBytes, randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [
		// Remove credentials provider - we'll handle this manually
	],
	session: {
		strategy: "database", // ✅ Database sessions
		maxAge: 7 * 24 * 60 * 60, // 7 days
		generateSessionToken: () => randomUUID?.() ?? randomBytes(32).toString("hex"),
	},
	callbacks: {
		async session({ session, user }) {
			// Add user ID to session
			if (session?.user && user) {
				session.user.email = user.email;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
