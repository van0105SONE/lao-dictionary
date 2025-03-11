import { date } from "drizzle-orm/mysql-core";
import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const dictionary = pgTable("lao_dictionary", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    word: text("word").notNull(),
    pronunciation: text("pronunciation").notNull(),
    part_of_speech: text("part_of_speech"),
    created_at: timestamp().defaultNow().notNull(),
});


export const definitions = pgTable("definitions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    definition: text("definition").notNull(),
    language: text("language").notNull(),
    word_id: integer("word_id").references(() => dictionary.id),
});

export const examples = pgTable("examples", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    example: text("example").notNull(),
    language: text("language").notNull(),
    word_id: integer("word_id").references(() => dictionary.id),
});

