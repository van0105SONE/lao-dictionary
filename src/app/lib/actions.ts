// app/actions.ts
"use server";
import { db } from "@/db/drizzle";
import {
  correct_and_incorrect,
  definitions,
  definitionTexts,
  dictionary,
  examples,
  exampleSentences,
} from "@/db/schema";
import { LAOS_ORDER } from "@/shared/constant/global-contant";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { asc, desc, eq, like, or, sql } from "drizzle-orm";

export const getAllWords = async (keyword: string | undefined) => {
  let query: any = db.select().from(dictionary);

  // If keyword exists and is not empty → filter by starting letters
  if (keyword && keyword.trim() !== "") {
    const cleanKeyword = keyword.trim();
    query = query.where(like(dictionary.word, `${cleanKeyword}%`));
  }
  // Otherwise → no filter, get all

  // Always sort by correct Lao order, then by word
  query = query.orderBy(LAOS_ORDER, asc(dictionary.word));

  // Optional: limit results
  query = query.limit(50);

  const data = await query;
  const responseWord: DicionaryModel[] = [];
  for (const item of data) {
    const defs = await db
      .select()
      .from(definitions)
      .where(eq(definitions.wordId, item.id));

    const definitionDetails = await Promise.all(
      defs.map(async (d) => {
        const texts = await db
          .select()
          .from(definitionTexts)
          .where(eq(definitionTexts.definitionId, d.id));
        return texts;
      })
    );

    // fetch examples + example sentences
    const exs = await db
      .select()
      .from(examples)
      .where(eq(examples.wordId, item.id));

    const exampleDetails = await Promise.all(
      exs.map(async (e) => {
        const sentences = await db
          .select()
          .from(exampleSentences)
          .where(eq(exampleSentences.exampleId, e.id));
        return sentences;
      })
    );
    const mapData: DicionaryModel = {
      id: item.id,
      word: item.word,
      pronuncation: item.pronuncation,
      part_of_speech: item.part_of_speech ?? "",
      definitions: definitionDetails[0],
      examples: exampleDetails[0],
    };

    responseWord.push(mapData);
  }

  return responseWord;
};

export const getRecentWords = async () => {
  const data = await db
    .select()
    .from(dictionary)
    .limit(6)
    .orderBy(desc(dictionary.created_at));

  const responseWord: DicionaryModel[] = [];
  for (const item of data) {
    const defs = await db
      .select()
      .from(definitions)
      .where(eq(definitions.wordId, item.id));

    const definitionDetails = await Promise.all(
      defs.map(async (d) => {
        const texts = await db
          .select()
          .from(definitionTexts)
          .where(eq(definitionTexts.definitionId, d.id));
        return texts;
      })
    );

    // fetch examples + example sentences
    const exs = await db
      .select()
      .from(examples)
      .where(eq(examples.wordId, item.id));

    const exampleDetails = await Promise.all(
      exs.map(async (e) => {
        const sentences = await db
          .select()
          .from(exampleSentences)
          .where(eq(exampleSentences.exampleId, e.id));
        return sentences;
      })
    );
    const mapData: DicionaryModel = {
      id: item.id,
      word: item.word,
      pronuncation: item.pronuncation,
      part_of_speech: item.part_of_speech ?? "",
      definitions: definitionDetails[0],
      examples: exampleDetails[0],
    };

    responseWord.push(mapData);
  }
  return responseWord;
};


// get correct and incorrect word.
export const getRecentCorrectIncorrect = async () => {
  const data = await db
    .select()
    .from(correct_and_incorrect)
    .limit(6)
    .orderBy(correct_and_incorrect.correct_word);

  const responseWord = data.map((item) => {
    const mapData: CorrectIncorrect = {
      id: item.id,
      correct_word: item.correct_word,
      incorrect_word: item.incorrect_word,
      explanation: item.explanation ?? "",
    };
    return mapData;
  });
  return responseWord;
};

export const getCorrectIncorrectPairs = async (keyword?: string) => {
  let query: any = db.select().from(correct_and_incorrect);
  if (keyword?.trim()) {
    const term = keyword.trim();
    query = query.where(
      or(
        like(correct_and_incorrect.incorrect_word, `%${term}%`),
        like(correct_and_incorrect.incorrect_word, `%${term}%`)
      )
    );
  }

  const data: CorrectIncorrect[] = await query.limit(50).orderBy(correct_and_incorrect.correct_word);

  const responseWord = data.map((item) => {
    const mapData: CorrectIncorrect = {
      id: item.id,
      correct_word: item.correct_word,
      incorrect_word: item.incorrect_word,
      explanation: item.explanation ?? "",
    };
    return mapData;
  });
  return responseWord;
};
