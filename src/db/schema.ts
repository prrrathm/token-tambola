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
// USER TABLE
// --------------------
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: text("password").notNull(),
});

// --------------------
// GAME TABLE
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

// --------------------
// SESSION TABLE
// --------------------
export const sessions = pgTable("sessions", {
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

// --------------------
// SHOW NUMBER TABLE
// --------------------
export const showNumbers = pgTable("show_numbers", {
	id: uuid("id").defaultRandom().primaryKey(),
	num: integer("num").notNull(),
	gameId: uuid("game_id")
		.references(() => games.id, { onDelete: "cascade" })
		.notNull(),
});

// --------------------
// CLAIMS TABLE
// --------------------
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
