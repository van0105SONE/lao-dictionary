"use server";
import { eq, like } from "drizzle-orm";
import { db } from "@/db/drizzle";
import {
  definitions,
  definitionTexts,
  dictionary,
  examples,
  exampleSentences,
} from "@/db/schema";
import { DicionaryModel } from "@/shared/model/DictionaryModel";

export const searchWord = async (keyword: string) => {
  const data = await db
    .select()
    .from(dictionary)
    .where(like(dictionary.word, `${keyword}%`));

  const responseWord = data.map((item) => {
    const mapData: DicionaryModel = {
      id: item.id,
      word: item.word,
      pronuncation: item.pronuncation,
      part_of_speech: item.part_of_speech ?? "",
      definitions: [],
      examples: [],
    };
    return mapData;
  });
  return responseWord;
};

export const getWordByWord = async (word: string) => {

  const decoded = decodeURIComponent(word);
  const data = await db
    .select()
    .from(dictionary)
    .where(eq(dictionary.word, decoded));

  if (data) {
    const defs = await db
      .select()
      .from(definitions)
      .where(eq(definitions.wordId, data[0].id));

    const definitionDetails = await Promise.all(
      defs.map(async (d) => {
        const texts = await db
          .select()
          .from(definitionTexts)
          .where(eq(definitionTexts.definitionId, d.id));
        return texts;
      }),
    );

    // fetch examples + example sentences
    const exs = await db
      .select()
      .from(examples)
      .where(eq(examples.wordId, data[0].id));

    const exampleDetails = await Promise.all(
      exs.map(async (e) => {
        const sentences = await db
          .select()
          .from(exampleSentences)
          .where(eq(exampleSentences.exampleId, e.id));
        return sentences;
      }),
    );

    const mapData: DicionaryModel = {
      id: data[0].id,
      word: data[0].word,
      pronuncation: data[0].pronuncation,
      part_of_speech: data[0].part_of_speech ?? "",
      definitions: definitionDetails[0],
      examples: exampleDetails[0],
    };

    return mapData;
  }
  return data;
};
