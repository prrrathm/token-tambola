CREATE TYPE "public"."claim_type" AS ENUM('first-line', 'middle-line', 'last-line', 'corners', 'early-five', 'house-1', 'house-2');--> statement-breakpoint
CREATE TABLE "claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"show_num_id" uuid NOT NULL,
	"claim_type" "claim_type" NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"claim_status" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone,
	"size" integer NOT NULL,
	CONSTRAINT "size_check" CHECK ("games"."size" >= 4 AND "games"."size" <= 50)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"numbers" jsonb NOT NULL,
	"game_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"numbers_crossed" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
CREATE TABLE "show_numbers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"num" integer NOT NULL,
	"game_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_show_num_id_show_numbers_id_fk" FOREIGN KEY ("show_num_id") REFERENCES "public"."show_numbers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "show_numbers" ADD CONSTRAINT "show_numbers_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;