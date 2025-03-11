CREATE TABLE "definitions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "definitions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"definition" text NOT NULL,
	"language" text NOT NULL,
	"word_id" integer
);
--> statement-breakpoint
CREATE TABLE "lao_dictionary" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lao_dictionary_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"word" text NOT NULL,
	"pronunciation" text NOT NULL,
	"part_of_speech" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "examples" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "examples_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"example" text NOT NULL,
	"language" text NOT NULL,
	"word_id" integer
);
--> statement-breakpoint
ALTER TABLE "definitions" ADD CONSTRAINT "definitions_word_id_lao_dictionary_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."lao_dictionary"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examples" ADD CONSTRAINT "examples_word_id_lao_dictionary_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."lao_dictionary"("id") ON DELETE no action ON UPDATE no action;