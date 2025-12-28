export interface DicionaryModel {
  id: number;
  definitions: Definition[];
  examples: Example[];
  word: string;
  part_of_speech: string;
  pronuncation: string;
}
