import { date } from "drizzle-orm/mysql-core";
import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const dictionary = pgTable("lao_dictionary", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  word: text("word").notNull(),
  pronuncation: text("pronunciation").notNull(),
  part_of_speech: text("part_of_speech"),
  search_countL: integer("search_count"),
  created_at: timestamp().defaultNow().notNull(),
});

export const definitions = pgTable("definitions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  wordId: integer("word_id")
    .notNull()
    .references(() => dictionary.id),
});

export const definitionTexts = pgTable("definition_texts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  definitionId: integer("definition_id")
    .notNull()
    .references(() => definitions.id, { onDelete: "cascade" }),

  kind: text("kind").notNull(),
  // "meaning" | "note"

  language: text("language").notNull(),
  // or: languageEnum("language").notNull()

  text: text("text").notNull(),
});

export const examples = pgTable("examples", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  wordId: integer("word_id")
    .notNull()
    .references(() => dictionary.id),
});

export const exampleSentences = pgTable("example_sentences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  exampleId: integer("example_id")
    .notNull()
    .references(() => examples.id, { onDelete: "cascade" }),

  text: text("text").notNull(),
});

export const correct_and_incorrect = pgTable("correct_and_incorrect", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  correct_word: text("correct_word").notNull(),
  incorrect_word: text("incorrect_word").notNull(),
  explanation: text("explanation"),
  word_id: integer("word_id").references(() => dictionary.id),
});
