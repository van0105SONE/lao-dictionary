// Helper function to get the primary consonant for sorting
function getLaoSortKey(word: string): string {
  if (!word) return "ຯ"; // fallback

  const laoConsonantsOrder = [
    "ກ",
    "ຂ",
    "ຄ",
    "ຆ",
    "຃",
    "ງ",
    "ຈ",
    "ຉ",
    "ຊ",
    "ຌ",
    "ຍ",
    "ດ",
    "ຕ",
    "ຖ",
    "ທ",
    "ຘ",
    "ຣ",
    "ນ",
    "ບ",
    "ປ",
    "ຜ",
    "ຝ",
    "ພ",
    "ຟ",
    "ຖ",
    "ທ",
    "ມ",
    "ຢ",
    "ຣ",
    "ລ",
    "ວ",
    "ສ",
    "ຫ",
    "ອ",
    "ຮ",
  ];

  // Find first Lao consonant in the word
  for (const char of word) {
    const consonant = laoConsonantsOrder.find((c) => c === char);
    if (consonant) {
      return consonant;
    }
  }

  return "ຯ"; // etc symbol for words starting with vowels or no consonant
}
