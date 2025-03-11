"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import {  definitions, dictionary, examples } from "@/db/schema";
import { DicionaryModel } from "@/shared/model/DictionaryModel";


export const searchWord = async (keyword: string) => {
  const data = await db.select().from(dictionary).where(eq(dictionary.word, keyword));
  const responseWord = data.map((item) => {

    const mapData: DicionaryModel = {
      id: item.id,
      lao_word: item.word,
      pronunciation: item.pronunciation,
      part_of_speech: item.part_of_speech ?? "",
      definitions: [],
      examples: []
    }
    return mapData;
  })
  return responseWord;
};

export const getWordById = async (id: number) => {
  const data = await db.select().from(dictionary).where(eq(dictionary.id, id));
  if (data) {
    const resDefinitions = await db.select().from(definitions).where(eq(definitions.id, data[0].id));
    const resExamples = await db.select().from(examples).where(eq(examples.id, data[0].id))
    const mapData: DicionaryModel = {
      id: data[0].id,
      lao_word: data[0].word,
      pronunciation: data[0].pronunciation,
      part_of_speech: data[0].part_of_speech ?? "",
      definitions: resDefinitions.map((item) => {
        return { language: item.language, definition: item.definition }
      }),
      examples: resExamples.map((item) => {
        return { language: item.language, example: item.example }
      }),
    }
    return mapData;
  }
  return null;
}


