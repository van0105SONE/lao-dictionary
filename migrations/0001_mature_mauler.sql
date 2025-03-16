CREATE TABLE "correct_and_incorrect" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "correct_and_incorrect_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"correct_word" text NOT NULL,
	"incorrect_word" text NOT NULL,
	"explaination" text,
	"word_id" integer
);
--> statement-breakpoint
ALTER TABLE "lao_dictionary" ADD COLUMN "search_count" integer;--> statement-breakpoint
ALTER TABLE "correct_and_incorrect" ADD CONSTRAINT "correct_and_incorrect_word_id_lao_dictionary_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."lao_dictionary"("id") ON DELETE no action ON UPDATE no action;