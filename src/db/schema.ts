// schema.ts
import {
	pgTable,
	uuid,
	varchar,
	text,
	timestamp,
	integer,
	boolean,
	jsonb,
	pgEnum,
	check,
	primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// --------------------
// ENUMS
// --------------------
export const claimTypeEnum = pgEnum("claim_type", [
	"first-line",
	"middle-line",
	"last-line",
	"corners",
	"early-five",
	"house-1",
	"house-2",
]);

// --------------------
// AUTH TABLES (NextAuth required tables)
// --------------------
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: timestamp("email_verified", { withTimezone: true }),
	image: text("image"),
	// Your custom fields
	password: text("password"), // Made optional as OAuth users might not have passwords
});

export const accounts = pgTable(
	"accounts",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: varchar("type", { length: 255 }).notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("provider_account_id", {
			length: 255,
		}).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: varchar("session_state", { length: 255 }),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
	}),
);

export const sessions = pgTable("sessions", {
	sessionToken: varchar("session_token", { length: 255 }).primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
	"verification_tokens",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { withTimezone: true }).notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.identifier, table.token] }),
	}),
);

// --------------------
// YOUR CUSTOM TABLES
// --------------------
export const games = pgTable(
	"games",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		endedAt: timestamp("ended_at", { withTimezone: true }),
		size: integer("size").notNull(),
	},
	(table) => ({
		sizeCheck: check(
			"size_check",
			sql`${table.size} >= 4 AND ${table.size} <= 50`,
		),
	}),
);

export const gameSessions = pgTable("game_sessions", {
	id: uuid("id").defaultRandom().primaryKey(),
	numbers: jsonb("numbers").$type<number[]>().notNull(), // length 27 enforced in app logic
	gameId: uuid("game_id")
		.references(() => games.id, { onDelete: "cascade" })
		.notNull(),
	userId: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	numbersCrossed: jsonb("numbers_crossed").$type<number[]>().default([]), // min 0 max 90 enforced in app logic
});

export const showNumbers = pgTable("show_numbers", {
	id: uuid("id").defaultRandom().primaryKey(),
	num: integer("num").notNull(),
	gameId: uuid("game_id")
		.references(() => games.id, { onDelete: "cascade" })
		.notNull(),
});

export const claims = pgTable("claims", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	showNumId: uuid("show_num_id")
		.references(() => showNumbers.id, { onDelete: "cascade" })
		.notNull(),
	claimType: claimTypeEnum("claim_type").notNull(),
	verified: boolean("verified").default(false).notNull(),
	claimStatus: boolean("claim_status").default(false).notNull(),
});

// --------------------
// TYPE EXPORTS
// --------------------
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;
export type GameSession = typeof gameSessions.$inferSelect;
export type NewGameSession = typeof gameSessions.$inferInsert;
