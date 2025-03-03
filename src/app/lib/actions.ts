// app/actions.ts
"use server";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { neon } from "@neondatabase/serverless";

export async function getData():Promise<DicionaryModel[]> {
    const sql = neon(process.env.DATABASE_URL || "");
    const data = await sql`SELECT 
    ld.lao_word, 
    ld.pronunciation, 
    ld.part_of_speech, 
    d.language AS definition_language, 
    d.definition, 
    eu.language AS example_language, 
    eu.example
FROM 
    lao_dictionary ld
LEFT JOIN 
    definition d ON ld.id = d.lao_word_id
LEFT JOIN 
    example_usage eu ON ld.id = eu.lao_word_id
WHERE 
    ld.lao_word = 'ສະບາຍດີ'
    AND (d.language = 'la' OR d.language IS NULL)
    AND (eu.language = 'la' OR eu.language IS NULL); `;

const transformedData: DicionaryModel = {
    lao_word: data[0].lao_word,
    pronunciation: data[0].pronunciation,
    part_of_speech: data[0].part_of_speech,
    definitions: data
      .filter((row) => row.definition_language) // Filter out rows without definitions
      .map((row) => ({
        language: row.definition_language,
        definition: row.definition,
      })),
    examples: data
      .filter((row) => row.example_language) // Filter out rows without examples
      .map((row) => ({
        language: row.example_language,
        example: row.example,
      })),
  };

  return [transformedData]; // Return as an array of DictionaryEntry
}