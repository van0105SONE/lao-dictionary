"use server";
import { eq, like, or } from "drizzle-orm";
import { db } from "@/db/drizzle";
import {
  correct_and_incorrect,
  definitions,
  definitionTexts,
  dictionary,
  examples,
  exampleSentences,
} from "@/db/schema";
import { DicionaryModel } from "@/shared/model/DictionaryModel";
import { CorrectIncorrect } from "@/shared/model/CorrectIncorrect";

// ── Types ─────────────────────────────────────────────────────────────────────
export type MatchType = "prefix" | "contains" | "fuzzy";
export type SearchResult = DicionaryModel & { matchType: MatchType };

// ── Levenshtein distance (pure TS, no deps) ───────────────────────────────────
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  // Use 1-D DP for memory efficiency
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      curr[j] =
        a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
    }
    prev = curr;
  }
  return prev[n];
}

// ── searchWord: prefix → contains → fuzzy (Levenshtein) ──────────────────────
export const searchWord = async (keyword: string): Promise<SearchResult[]> => {
  if (!keyword.trim()) return [];
  const clean = keyword.trim();

  // 1. Broad DB fetch: prefix + contains
  const rows = await db
    .select()
    .from(dictionary)
    .where(
      or(
        like(dictionary.word, `${clean}%`),  // starts with
        like(dictionary.word, `%${clean}%`)  // contains
      )
    )
    .limit(40);

  // 2. If keyword ≥ 2 chars, also fetch a fuzzy neighbourhood:
  //    words starting with first 2 characters (catches 1-char-off misses)
  let fuzzyRows: typeof rows = [];
  if (clean.length >= 2) {
    const prefix2 = clean.slice(0, 2);
    const extra = await db
      .select()
      .from(dictionary)
      .where(like(dictionary.word, `${prefix2}%`))
      .limit(30);
    const seen = new Set(rows.map((r) => r.id));
    fuzzyRows = extra.filter((r) => !seen.has(r.id));
  }

  const all = [...rows, ...fuzzyRows];

  // 3. Classify each result
  const results: SearchResult[] = all.map((item) => {
    const w = item.word;
    let matchType: MatchType;
    if (w.startsWith(clean)) {
      matchType = "prefix";
    } else if (w.includes(clean)) {
      matchType = "contains";
    } else {
      matchType = "fuzzy";
    }
    return {
      id: item.id,
      word: item.word,
      pronuncation: item.pronuncation,
      part_of_speech: item.part_of_speech ?? "",
      definitions: [],
      examples: [],
      matchType,
    };
  });

  // 4. Sort: prefix first, contains second, fuzzy last; ties broken by edit distance
  const order: Record<MatchType, number> = { prefix: 0, contains: 1, fuzzy: 2 };
  results.sort((a, b) => {
    if (order[a.matchType] !== order[b.matchType]) {
      return order[a.matchType] - order[b.matchType];
    }
    return levenshtein(a.word, clean) - levenshtein(b.word, clean);
  });

  return results.slice(0, 15);
};

// ── getWordByWord ─────────────────────────────────────────────────────────────
export const getWordByWord = async (word: string) => {
  const decoded = decodeURIComponent(word);
  const data = await db
    .select()
    .from(dictionary)
    .where(eq(dictionary.word, decoded));

  if (!data[0]) return null;

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
    })
  );

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
    })
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
};

// ── getCorrectIncorrectById ───────────────────────────────────────────────────
export const getCorrectIncorrectById = async (
  id: number
): Promise<CorrectIncorrect | null> => {
  const data = await db
    .select()
    .from(correct_and_incorrect)
    .where(eq(correct_and_incorrect.id, id));

  if (!data[0]) return null;

  return {
    id: data[0].id,
    correct_word: data[0].correct_word,
    incorrect_word: data[0].incorrect_word,
    explanation: data[0].explanation ?? "",
  };
};
