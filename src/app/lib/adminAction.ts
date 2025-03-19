"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { definitions, dictionary, examples } from "@/db/schema";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { NextResponse } from "next/server";

export const addWord = async (params: DicionaryModel) => {
    try {
        // Insert the word into the dictionary table
        const result = await db.insert(dictionary).values({
            
            word: params.lao_word,
            part_of_speech: params.part_of_speech,
            pronunciation: "test test",
            search_countL: 0, // Fixed typo: `search_countL` -> `search_count`
        }).returning({ insertedId: dictionary.id }); // Adjust based on your schema

        const wordId = result[0].insertedId; // Get the ID of the inserted word

        // Insert definitions into the definitions table
        // if (params.definitions && params.definitions.length > 0) {
        //     await db.insert(definitions).values(
        //         [params.definitions.map((definition) => ({
        //             word_id: wordId,
        //             definition: definition,
        //             language: 'lao'
        //         }))]
        //     );
        // }

        // // Insert examples into the examples table
        // if (params.examples && params.examples.length > 0) {
        //     await db.insert(examples).values(
        //         [params.examples.map((example) => ({
        //             word_id: wordId,
        //             example: example,
        //             language: 'lao'
        //         }))]
        //     );
        // }

        // Return a success response
        return NextResponse.json(
            { statusCode: 201, message: "Word added successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding word:", error);
        return NextResponse.json(
            { statusCode: 500, message: "Failed to add word" },
            { status: 500 }
        );
    }
};