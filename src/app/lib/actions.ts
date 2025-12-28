// app/actions.ts
"use server";
import { db } from "@/db/drizzle";
import { correct_and_incorrect, dictionary } from "@/db/schema";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import { DicionaryModel } from "@/shared/model/DictionaryModel";

export const getRecentWords = async () => {
  const data = await db
    .select()
    .from(dictionary)
    .limit(5)
    .orderBy(dictionary.created_at);
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

export const getRecentCorrectIncorrect = async () => {
  const data = await db
    .select()
    .from(correct_and_incorrect)
    .limit(5)
  const responseWord = data.map((item) => {
    const mapData: CorrectIncorrect = {
      id: item.id,
      correct_word: item.correct_word,
      incorrect_word: item.incorrect_word,
      explanation: item.explanation ?? ''
    }
    return mapData;
  });
  return responseWord;
};
