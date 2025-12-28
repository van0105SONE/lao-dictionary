export interface DicionaryModel {
  id: number;
  meaning: string;
  definitions: Definition[];
  examples: Example[];
  word: string;
  part_of_speech: string;
  pronuncation: string;
}
