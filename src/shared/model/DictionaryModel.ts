export interface DicionaryModel {
  definitions: { language: string; definition: string }[];
  examples: { language: string; example: string }[];
  lao_word: string;
  part_of_speech: string;
  pronunciation: string;
}
