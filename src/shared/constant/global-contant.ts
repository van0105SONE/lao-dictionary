export const LAO_ALPHABET = [
  {
    character: "ກ",
    image: "/chars/chicken.png",
    word: "ໄກ່",
  },
  {
    character: "ຂ",
    image: "/chars/eggs.jpg",
    word: "ໄຂ່",
  },
  {
    character: "ຄ",
    image: "/chars/buffalo.jpg",
    word: "ຄວາຍ",
  },
  {
    character: "ງ",
    image: "/chars/ox.jpg",
    word: "ງົວ",
  },

  {
    character: "ຈ",
    image: "/chars/cup.jpg",
    word: "ຈອກ",
  },
  {
    character: "ສ",
    image: "/chars/tiger.jpg",
    word: "ເສືອ",
  },
  {
    character: "ຊ",
    image: "/chars/elepant.png",
    word: "ຊ້າງ",
  },
  {
    character: "ຍ",
    image: "/chars/mosquito.jpg",
    word: "ຍູງ",
  },
  {
    character: "ດ",
    image: "/chars/kids.jpg",
    word: "ເດັກ",
  },
  {
    character: "ຕ",
    image: "/chars/eye.jpg",
    word: "ຕາ",
  },
  {
    character: "ຖ",
    image: "/chars/bag.jpg",
    word: "ຖົງ",
  },
  {
    character: "ທ",
    image: "/chars/lao-flag.jpg",
    word: "ທົງ",
  },
  {
    character: "ນ",
    image: "/chars/bird.jpg",
    word: "ນົກ",
  },
  {
    character: "ບ",
    image: "/chars/goaat.jpg",
    word: "ແບ້",
  },
  {
    character: "ປ",
    image: "/chars/fish.jpg",
    word: "ປາ",
  },
  {
    character: "ຜ",
    image: "/chars/bee.jpg",
    word: "ເຜິ້ງ",
  },
  {
    character: "ຝ",
    image: "/chars/rain.jpg",
    word: "ຝົນ",
  },
  {
    character: "ຟ",
    image: "/chars/fire.jpg",
    word: "ໄຟ",
  },
  {
    character: "ຢ",
    image: "/chars/medicine.jpg",
    word: "ຢາ",
  },
  {
    character: "ຣ",
    image: "/chars/radar.jpg",
    word: "ຣາດາ",
  },
  {
    character: "ລ",
    image: "/chars/monkey.jpg",
    word: "ລີງ",
  },
  {
    character: "ວ",
    image: "/chars/handfaan.jpg",
    word: "ວີ",
  },
  {
    character: "ຫ",
    image: "/chars/goose.jpg",
    word: "ຫ່ານ",
  },
  {
    character: "ອ",
    image: "/chars/goose.jpg",
    word: "ໂອ",
  },
  {
    character: "ຮ",
    image: "/chars/goose.jpg",
    word: "ເຮືອນ",
  },
];

export const COMBINE_ALPHABET = [
  {
    character: "ຫງ",
    image: "",
    word: "",
  },
  {
    character: "ຫຍ",
    image: "",
    word: "",
  },
  {
    character: "ຫນ",
    image: "",
    word: "",
  },
  {
    character: "ຫມ",
    image: "",
    word: "",
  },

  {
    character: "ຫລ",
    image: "",
    word: "",
  },
  {
    character: "ວ",
    image: "",
    word: "",
  },
];

export const SARA = [
  {
    character: "xະ",
    image: "",
    word: "",
  },
  {
    character: "xາ",
    image: "",
    word: "",
  },
  {
    character: "xີ",
    image: "",
    word: "",
  },
  {
    character: "xີ",
    image: "",
    word: "",
  },

  {
    character: "xື",
    image: "",
    word: "",
  },
  {
    character: "xື",
    image: "",
    word: "",
  },
  {
    character: "xຸ",
    image: "",
    word: "",
  },
  {
    character: "xູ",
    image: "",
    word: "",
  },
  {
    character: "ເxະ",
    image: "",
    word: "",
  },
  {
    character: "ເx",
    image: "",
    word: "",
  },
  {
    character: "ແxະ",
    image: "",
    word: "",
  },
  {
    character: "ແx",
    image: "",
    word: "",
  },
  {
    character: "ໂxະ",
    image: "",
    word: "",
  },
  {
    character: "ເxາະ",
    image: "",
    word: "",
  },
  {
    character: "xໍ",
    image: "",
    word: "",
  },
  {
    character: "ເxິ",
    image: "",
    word: "",
  },
  {
    character: "ເxີ",
    image: "",
    word: "",
  },
  {
    character: "ເxົຍ",
    image: "",
    word: "",
  },
  {
    character: "ເxຍ",
    image: "",
    word: "",
  },
  {
    character: "ົxວະ",
    image: "",
    word: "",
  },
  {
    character: "ົxວ",
    image: "",
    word: "",
  },
  {
    character: "ົxວະ",
    image: "",
    word: "",
  },
  {
    character: "ົxວ",
    image: "",
    word: "",
  },
  {
    character: "ເxືອ",
    image: "",
    word: "",
  },
  {
    character: "ໄx",
    image: "",
    word: "",
  },
  {
    character: "ໃx",
    image: "",
    word: "",
  },
  {
    character: "ເxົາ",
    image: "",
    word: "",
  },
  {
    character: "xຳ",
    image: "",
    word: "",
  },
];

export const LANGUAGE_SUPPORT = [
  { code: "lao", name: "Lao" },
  { code: "en", name: "English" },
  { code: "th", name: "Thai" },
];

export const LAOS_ORDER = `
  CASE 
    WHEN word LIKE 'ກ%' THEN 1
    WHEN word LIKE 'ຂ%' THEN 2
    WHEN word LIKE 'ຄ%' THEN 3
    WHEN word LIKE 'ງ%' THEN 4
    WHEN word LIKE 'ຈ%' THEN 5
    WHEN word LIKE 'ຊ%' THEN 6
    WHEN word LIKE 'ຍ%' THEN 7
    WHEN word LIKE 'ດ%' THEN 8
    WHEN word LIKE 'ຕ%' THEN 9
    WHEN word LIKE 'ຖ%' THEN 10
    WHEN word LIKE 'ທ%' THEN 11
    WHEN word LIKE 'ນ%' THEN 12
    WHEN word LIKE 'ບ%' THEN 13
    WHEN word LIKE 'ປ%' THEN 14
    WHEN word LIKE 'ຜ%' THEN 15
    WHEN word LIKE 'ພ%' THEN 16
    WHEN word LIKE 'ຟ%' THEN 17
    WHEN word LIKE 'ມ%' THEN 18
    WHEN word LIKE 'ຢ%' THEN 19
    WHEN word LIKE 'ຣ%' THEN 20
    WHEN word LIKE 'ລ%' THEN 21
    WHEN word LIKE 'ວ%' THEN 22
    WHEN word LIKE 'ສ%' THEN 23
    WHEN word LIKE 'ຫ%' THEN 24
    WHEN word LIKE 'ອ%' THEN 25
    WHEN word LIKE 'ຮ%' THEN 26
    ELSE 99
  END
`;
