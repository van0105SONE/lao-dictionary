// app/actions.ts
"use server";
import { db } from "@/db/drizzle";
import { correct_and_incorrect, definitions, definitionTexts, dictionary, examples, exampleSentences } from "@/db/schema";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { eq } from "drizzle-orm";

export const getRecentWords = async () => {
  const data = await db
    .select()
    .from(dictionary)
    .limit(5)
    .orderBy(dictionary.created_at);

   const  responseWord:DicionaryModel[] = []
  for(const item of data){
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
    
    responseWord.push(mapData)
  };
  return responseWord;
};

export const getRecentCorrectIncorrect = async () => {
  const data = await db.select().from(correct_and_incorrect).limit(5);

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
