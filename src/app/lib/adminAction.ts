"use server";
import { eq, not, param } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { definitions, dictionary, examples } from "@/db/schema";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { NextResponse } from "next/server";
import { PaginationModel } from "@/shared/model/PaginationModel";

export const addWord = async (params:string) => {
    try {
        const newWord:DicionaryModel = JSON.parse(params)
        // Insert the word into the dictionary table
        const result = await db.insert(dictionary).values({
            word: newWord.lao_word,
            part_of_speech: newWord.part_of_speech,
            pronunciation: newWord.pronunciation,
            search_countL: 0, // Fixed typo: `search_countL` -> `search_count`
        }).returning({ insertedId: dictionary.id }); // Adjust based on your schema

        const wordId = result[0].insertedId; // Get the ID of the inserted word
        console.log("it work here")
        if (newWord.definitions && newWord.definitions.length > 0) {
           const listOfDefinitions =   (newWord.definitions.map((item) => ({
                word_id: wordId,
                definition: item.definition,
                language: item.language
            })));

            await db.insert(definitions).values(
                listOfDefinitions
            );
        }

        // Insert examples into the examples table
        if (newWord.examples && newWord.examples.length > 0) {
            const listOfExamples = newWord.examples.map((item) => ({
                word_id: wordId,
                example: item.example,
                language: item.language
            }));
            await db.insert(examples).values(
             listOfExamples
            );
        }

        // Return a success response
        return {
            isSuccess: true, 
            message: "Successful"
        };
    } catch (error) {
        console.error("Error adding word:", error);
        return {
            isSuccess: false, 
            message: "Fail"
        };
    }
};

export const getWordList = async (filter:PaginationModel) => {
    const data = await db.select().from(dictionary).offset((filter.page - 1) * filter.limit).limit(filter.limit);
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
}