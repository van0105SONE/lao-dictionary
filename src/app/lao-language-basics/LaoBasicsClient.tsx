"use client";

import { useState } from "react";

// ─── Data extracted from ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ ເຫຼັ້ມ 1 (2024) ───────

const CHAPTERS = [
  {
    id: "overview",
    icon: "📖",
    titleLo: "ພາບລວມ",
    titleEn: "Overview",
  },
  {
    id: "consonants",
    icon: "🔤",
    titleLo: "ພະຍັນຊະນະ",
    titleEn: "Consonants",
  },
  {
    id: "vowels",
    icon: "🎵",
    titleLo: "ສະຫຼະ",
    titleEn: "Vowels",
  },
  {
    id: "tones",
    icon: "🎼",
    titleLo: "ວັນນະຍຸດ",
    titleEn: "Tone Marks",
  },
  {
    id: "words",
    icon: "📝",
    titleLo: "ຄຳ ແລະ ໂຄງສ້າງ",
    titleEn: "Words & Structure",
  },
  {
    id: "reference",
    icon: "📚",
    titleLo: "ອ້າງອີງ",
    titleEn: "Reference",
  },
];

// 33 Lao Consonants
const CONSONANTS = [
  { char: "ກ", romanized: "k", class: "middle", sound: "k (gap)" },
  { char: "ຂ", romanized: "kh", class: "high", sound: "kh (khao)" },
  { char: "ຄ", romanized: "kh", class: "low", sound: "kh (khon)" },
  { char: "ງ", romanized: "ng", class: "low", sound: "ng (ngoo)" },
  { char: "ຈ", romanized: "ch/j", class: "middle", sound: "j (jao)" },
  { char: "ສ", romanized: "s", class: "high", sound: "s (saeng)" },
  { char: "ຊ", romanized: "s/x", class: "low", sound: "s (xao)" },
  { char: "ຍ", romanized: "ny/y", class: "low", sound: "ny (nyaa)" },
  { char: "ດ", romanized: "d", class: "middle", sound: "d (dek)" },
  { char: "ຕ", romanized: "t", class: "middle", sound: "t (ta)" },
  { char: "ຖ", romanized: "th", class: "high", sound: "th (thaang)" },
  { char: "ທ", romanized: "th", class: "low", sound: "th (than)" },
  { char: "ນ", romanized: "n", class: "low", sound: "n (nok)" },
  { char: "ບ", romanized: "b", class: "middle", sound: "b (ban)" },
  { char: "ປ", romanized: "p", class: "middle", sound: "p (pa)" },
  { char: "ຜ", romanized: "ph", class: "high", sound: "ph (phaeng)" },
  { char: "ຝ", romanized: "f", class: "high", sound: "f (fai)" },
  { char: "ພ", romanized: "ph", class: "low", sound: "ph (phak)" },
  { char: "ຟ", romanized: "f", class: "low", sound: "f (fan)" },
  { char: "ມ", romanized: "m", class: "low", sound: "m (maa)" },
  { char: "ຢ", romanized: "y", class: "middle", sound: "y (yaa)" },
  { char: "ຣ", romanized: "r", class: "low", sound: "r (rot)" },
  { char: "ລ", romanized: "l", class: "low", sound: "l (lao)" },
  { char: "ວ", romanized: "w/v", class: "low", sound: "v (vela)" },
  { char: "ຫ", romanized: "h", class: "high", sound: "h (hak)" },
  { char: "ອ", romanized: "a/-", class: "middle", sound: "- (aa)" },
  { char: "ຮ", romanized: "h", class: "low", sound: "h (hom)" },
  { char: "ຯ", romanized: "–", class: "special", sound: "(ellipsis)" },
  { char: "ໜ", romanized: "n", class: "high", sound: "n (naa)" },
  { char: "ໝ", romanized: "m", class: "high", sound: "m (maa)" },
  { char: "ຼ", romanized: "l", class: "low", sound: "l (combined)" },
  { char: "ຽ", romanized: "ia", class: "special", sound: "ia" },
  { char: "ຬ", romanized: "–", class: "special", sound: "(archaic)" },
];

// Short + Long vowels
const VOWELS_SHORT = [
  { form: "◌ະ", ipa: "a", name: "ສະຫຼະ ອະ", romanized: "a" },
  { form: "◌ິ", ipa: "i", name: "ສະຫຼະ ອິ", romanized: "i" },
  { form: "◌ຶ", ipa: "ɯ", name: "ສະຫຼະ ອຶ", romanized: "ue" },
  { form: "◌ຸ", ipa: "u", name: "ສະຫຼະ ອຸ", romanized: "u" },
  { form: "ແ◌ະ", ipa: "ɛ", name: "ສະຫຼະ ແອະ", romanized: "ae" },
  { form: "◌ົ", ipa: "o", name: "ສະຫຼະ ໂ◌ະ", romanized: "o" },
  { form: "ເ◌ະ", ipa: "e", name: "ສະຫຼະ ເອະ", romanized: "e" },
  { form: "ໂ◌ະ", ipa: "o", name: "ສະຫຼະ ໂ◌ະ", romanized: "o" },
  { form: "ເ◌າະ", ipa: "ɔ", name: "ສະຫຼະ ເ◌າະ", romanized: "o" },
];
const VOWELS_LONG = [
  { form: "◌າ", ipa: "aː", name: "ສະຫຼະ ອາ", romanized: "aa" },
  { form: "◌ີ", ipa: "iː", name: "ສະຫຼະ ອີ", romanized: "ii" },
  { form: "◌ື", ipa: "ɯː", name: "ສະຫຼະ ອື", romanized: "uee" },
  { form: "◌ູ", ipa: "uː", name: "ສະຫຼະ ອູ", romanized: "uu" },
  { form: "ແ◌", ipa: "ɛː", name: "ສະຫຼະ ແອ", romanized: "aee" },
  { form: "◌ໍ/◌ອ", ipa: "oː", name: "ສະຫຼະ ◌ໍ", romanized: "oo" },
  { form: "ເ◌", ipa: "eː", name: "ສະຫຼະ ເອ", romanized: "ee" },
  { form: "ໂ◌", ipa: "oː", name: "ສະຫຼະ ໂ◌", romanized: "oo" },
  { form: "◌ໍ", ipa: "ɔː", name: "ສະຫຼະ ◌ໍ", romanized: "o" },
];

// 6 Tones
const TONES = [
  {
    name: "ສາມັນ",
    nameEn: "Mid Level",
    mark: "(ບໍ່ມີວັນນະຍຸດ)",
    markEn: "No mark",
    description: "ສຽງກາງ ບໍ່ສູງ ບໍ່ຕ່ຳ",
    descriptionEn: "Mid-level tone, neither high nor low",
    example: "ກາ",
    color: "#4F959D",
    arrow: "→",
  },
  {
    name: "ເອກ",
    nameEn: "Low Falling",
    mark: "◌້",
    markEn: "Mai Ek",
    description: "ສຽງຕ່ຳ ຕົກ",
    descriptionEn: "Low falling tone",
    example: "ກ້າ",
    color: "#E74C3C",
    arrow: "↘",
  },
  {
    name: "ໂທ",
    nameEn: "High Rising",
    mark: "◌໊",
    markEn: "Mai Tho",
    description: "ສຽງສູງ ຂຶ້ນ",
    descriptionEn: "High rising tone",
    example: "ກ໊າ",
    color: "#2ECC71",
    arrow: "↗",
  },
  {
    name: "ຕີ",
    nameEn: "High Level",
    mark: "◌໋",
    markEn: "Mai Tri",
    description: "ສຽງສູງ ສະໝ່ຳສະເໝີ",
    descriptionEn: "High level tone",
    example: "ກ໋າ",
    color: "#9B59B6",
    arrow: "⟶",
  },
  {
    name: "ຈັດຕະວາ",
    nameEn: "Rising",
    mark: "◌໌",
    markEn: "Mai Chattawa",
    description: "ສຽງຂຶ້ນ-ລົງ",
    descriptionEn: "Rising then falling tone",
    example: "ກ໌າ",
    color: "#F39C12",
    arrow: "↗↘",
  },
  {
    name: "ຕ່ຳ",
    nameEn: "Low Level",
    mark: "(ຄ + ບໍ່ມີ)",
    markEn: "Low class inherent",
    description: "ສຽງຕ່ຳ ສະໝ່ຳ",
    descriptionEn: "Low level tone (inherent in low-class consonants)",
    example: "ຄາ",
    color: "#1ABC9C",
    arrow: "→ (low)",
  },
];

// Word formation types
const WORD_TYPES = [
  {
    icon: "1️⃣",
    nameLo: "ຄຳດ່ຽວ (ຄຳດຽວ)",
    nameEn: "Simple Words",
    descLo: "ຄຳທີ່ມີໜ່ວຍຄຳດ່ຽວ ໝາຍຄວາມໄດ້ໂດຍຕົວເອງ",
    descEn: "Words with a single morpheme that carry meaning on their own",
    examples: ["ນ້ຳ", "ໄຟ", "ດິນ", "ລົມ", "ຫີນ"],
  },
  {
    icon: "2️⃣",
    nameLo: "ຄຳປະສົມ",
    nameEn: "Compound Words",
    descLo: "ຄຳທີ່ປະກອບດ້ວຍຄຳດ່ຽວ 2 ຄຳ ຫຼື ຫຼາຍກວ່ານັ້ນລວມກັນ",
    descEn: "Words formed by combining two or more simple words",
    examples: ["ນ້ຳໃຈ", "ລົດໄຟ", "ໝາກຫ້ຽວ", "ຫ້ອງນ້ຳ"],
  },
  {
    icon: "3️⃣",
    nameLo: "ຄຳຊ້ຳ",
    nameEn: "Reduplicated Words",
    descLo: "ຄຳທີ່ໃຊ້ວິທີຊ້ຳຕົວ ຫຼື ບາງສ່ວນ",
    descEn: "Words formed by full or partial reduplication",
    examples: ["ດີດີ", "ຊ້າໆ", "ໃຫຍ່ໂຕ", "ສວຍງາມ"],
  },
  {
    icon: "4️⃣",
    nameLo: "ຄຳຮັບໃຊ້",
    nameEn: "Borrowed Words",
    descLo: "ຄຳທີ່ຢືມຈາກພາສາຕ່າງປະເທດ",
    descEn: "Words borrowed from foreign languages",
    examples: ["ໂທລະສັບ", "ໂທລະພາບ", "ຄອມພິວເຕີ", "ອິນເຕີເນັດ"],
  },
];

const CLASS_COLORS: Record<string, string> = {
  middle: "#4F959D",
  high: "#205781",
  low: "#8B5CF6",
  special: "#6B7280",
};

export default function LaoBasicsClient() {
  const [activeChapter, setActiveChapter] = useState("overview");
  const [selectedConsonant, setSelectedConsonant] = useState<null | (typeof CONSONANTS)[0]>(null);
  const [filterClass, setFilterClass] = useState<string>("all");

  const filteredConsonants =
    filterClass === "all"
      ? CONSONANTS
      : CONSONANTS.filter((c) => c.class === filterClass);

  return (
    <div style={{ fontFamily: "'Noto Serif Lao', serif" }}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
          color: "white",
          padding: "80px 24px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Lao chars */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "240px",
            fontWeight: 900,
            opacity: 0.04,
            userSelect: "none",
            letterSpacing: "20px",
          }}
        >
          ກຂຄ
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", background: "rgba(255,255,255,0.15)", padding: "4px 14px", borderRadius: "20px", backdropFilter: "blur(4px)" }}>
              📄 267 ໜ້າ · 4 ພາກ · ສ.ສ.ກ. 2024
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ
          </h1>
          <p
            style={{
              fontSize: "18px",
              opacity: 0.85,
              marginBottom: "8px",
              fontStyle: "italic",
              fontWeight: 300,
            }}
            lang="en"
          >
            Basic Principles of Lao Language Usage — Volume 1
          </p>
          <p style={{ fontSize: "14px", opacity: 0.6, marginBottom: "36px" }} lang="en">
            Published by the Ministry of Education and Sports, Laos PDR · 2024
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {[
              { num: "267", label: "ໜ້າທັງໝົດ", labelEn: "Total Pages" },
              { num: "33", label: "ພະຍັນຊະນະ", labelEn: "Consonants" },
              { num: "24", label: "ສະຫຼະ", labelEn: "Vowels" },
              { num: "6", label: "ວັນນະຍຸດ", labelEn: "Tones" },
              { num: "4", label: "ພາກ", labelEn: "Chapters" },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "14px 24px",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  minWidth: "100px",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: 800 }}>{s.num}</div>
                <div style={{ fontSize: "13px", opacity: 0.9 }}>{s.label}</div>
                <div style={{ fontSize: "11px", opacity: 0.6 }} lang="en">{s.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PDF Download Banner ────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(90deg, #205781, #4F959D)",
          color: "white",
          padding: "14px 24px",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        <a
          href="/resource/ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ-ເຫຼັ້ມ-1.pdf"
          download
          style={{
            color: "white",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          📥 ດາວໂຫຼດ PDF ຕົ້ນສະບັບ
          <span style={{ opacity: 0.75, fontWeight: 400, fontSize: "13px" }} lang="en">
            · Download original PDF
          </span>
        </a>
      </div>

      {/* ── Tab navigation ────────────────────────────────────────────── */}
      <nav
        role="tablist"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "4px",
          padding: "16px 24px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            role="tab"
            aria-selected={activeChapter === ch.id}
            onClick={() => setActiveChapter(ch.id)}
            id={`tab-${ch.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              fontSize: "14px",
              fontWeight: activeChapter === ch.id ? 700 : 500,
              background: activeChapter === ch.id ? "#205781" : "transparent",
              color: activeChapter === ch.id ? "white" : "#374151",
              transition: "all 0.2s",
            }}
          >
            <span>{ch.icon}</span>
            <span>{ch.titleLo}</span>
          </button>
        ))}
      </nav>

      {/* ── Content panels ────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* OVERVIEW ─────────────────────────────────────────────────── */}
        {activeChapter === "overview" && (
          <div>
            <SectionTitle lo="ພາບລວມ ແລະ ສາລະບານ" en="Overview & Table of Contents" />

            {/* Book info card */}
            <div
              style={{
                background: "linear-gradient(135deg, #f8faff 0%, #fff8f0 100%)",
                border: "1px solid #e0e7ff",
                borderRadius: "16px",
                padding: "32px",
                marginBottom: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                { label: "ຊື່ປຶ້ມ", labelEn: "Title", value: "ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ ເຫຼັ້ມ 1" },
                { label: "ຜູ້ຈັດພິມ", labelEn: "Publisher", value: "ກະຊວງສຶກສາທິການ ແລະ ກິລາ, ສ.ປ.ປ.ລາວ" },
                { label: "ປີພິມ", labelEn: "Year", value: "2024" },
                { label: "ຈຳນວນໜ້າ", labelEn: "Pages", value: "267 ໜ້າ" },
                { label: "ເນື້ອໃນ", labelEn: "Content", value: "4 ພາກ ຕົ້ນຕໍ" },
                { label: "ພາສາ", labelEn: "Language", value: "ລາວ" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                    {item.label} <span lang="en">/ {item.labelEn}</span>
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#1F2937" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              style={{
                background: "#f0f9ff",
                borderLeft: "4px solid #4F959D",
                borderRadius: "0 12px 12px 0",
                padding: "20px 24px",
                marginBottom: "32px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#205781", marginBottom: "12px" }}>
                ສະຫຼຸບເນື້ອໃນ <span lang="en" style={{ fontWeight: 400, fontSize: "15px", color: "#4F959D" }}>/ Summary</span>
              </h2>
              <p style={{ color: "#374151", lineHeight: 1.8, marginBottom: "12px" }}>
                ປຶ້ມ <strong>ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ ເຫຼັ້ມ 1</strong> ແມ່ນຄູ່ມືທາງການຂອງກະຊວງສຶກສາທິການ
                ທີ່ລວບລວມຫຼັກການ ແລະ ກົດລະບຽບການໃຊ້ພາສາລາວໄດ້ຢ່າງຖືກຕ້ອງ. ເນື້ອໃນຄອບຄຸມ
                ຕັ້ງແຕ່ລະບົບສຽງ (ພະຍັນຊະນະ, ສະຫຼະ, ວັນນະຍຸດ) ໄປຮອດຄຳ ແລະ ໂຄງສ້າງ
                ທາງໄວຍາກອນ.
              </p>
              <p style={{ color: "#374151", lineHeight: 1.8 }} lang="en">
                This official textbook from the Ministry of Education and Sports provides
                comprehensive guidelines for correct Lao language usage — covering phonology
                (consonants, vowels, tones), word formation, word classes, and sentence
                structure. An essential reference for students, teachers, and Lao language
                learners.
              </p>
            </div>

            {/* Chapter cards */}
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>
              ສາລະບານ <span lang="en" style={{ fontWeight: 400, fontSize: "16px", color: "#6B7280" }}>/ Table of Contents</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                {
                  num: "I",
                  lo: "ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ ດ້ານເສີຍງ ແລະ ລະບົບ",
                  en: "Phonology & Script System",
                  page: "1–193",
                  topics: ["ພະຍັນຊະນະ 33 ຕົວ", "ສະຫຼະ 24 ຮູບ", "ວັນນະຍຸດ 6 ລັກສະນະ", "ຄຳສັບ ແລະ ໂຄງສ້າງ"],
                  color: "#205781",
                },
                {
                  num: "II",
                  lo: "ຫຼັກການດ້ານການນຳໃຊ້ຄຳ",
                  en: "Word Usage Principles",
                  page: "194–251",
                  topics: ["ຄຳນຳ", "ຄຳກິລິຍາ", "ຄຳຄຸນນາມ", "ຄຳວິເສດ", "ຄຳບຸບ"],
                  color: "#4F959D",
                },
                {
                  num: "III",
                  lo: "ລາຍການໃຊ້ຄຳຢ່າງຖືກຕ້ອງ",
                  en: "Correct Word Usage List",
                  page: "252+",
                  topics: ["ຄຳທີ່ໃຊ້ຜິດເລື້ອຍໆ", "ຄຳຖືກ ແລະ ຜິດ", "ຕົວຢ່າງ"],
                  color: "#8B5CF6",
                },
                {
                  num: "IV",
                  lo: "ຫຼັກການດ້ານໂຄງສ້າງປະໂຫຍກ",
                  en: "Sentence Structure Principles",
                  page: "194–267",
                  topics: ["ປະໂຫຍກງ່າຍ", "ປະໂຫຍກສ້ອງ", "ການນຳໃຊ້", "ຕົວຢ່າງ"],
                  color: "#F59E0B",
                },
              ].map((ch) => (
                <div
                  key={ch.num}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ background: ch.color, padding: "16px 20px", color: "white" }}>
                    <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "4px" }}>ພາກທີ / Chapter</div>
                    <div style={{ fontSize: "24px", fontWeight: 800 }}>{ch.num}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginTop: "4px" }}>{ch.lo}</div>
                    <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "2px" }} lang="en">{ch.en}</div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "10px" }}>
                      ໜ້າ {ch.page}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                      {ch.topics.map((t) => (
                        <li key={t} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151" }}>
                          <span style={{ color: ch.color }}>•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSONANTS ────────────────────────────────────────────────── */}
        {activeChapter === "consonants" && (
          <div>
            <SectionTitle lo="ພະຍັນຊະນະລາວ 33 ຕົວ" en="33 Lao Consonants" />
            <p style={{ color: "#6B7280", marginBottom: "24px", lineHeight: 1.7 }}>
              ພາສາລາວມີພະຍັນຊະນະທັງໝົດ <strong style={{ color: "#205781" }}>33 ຕົວ</strong> ແບ່ງອອກເປັນ 3 ໝວດ:
              ໝວດກາງ, ໝວດສູງ ແລະ ໝວດຕ່ຳ. ໝວດຂອງພະຍັນຊະນະກຳນົດວັນນະຍຸດຂອງຄຳ.
              <span lang="en" style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>
                Lao has 33 consonants classified into 3 classes: middle, high, and low — which determine the tone of syllables.
              </span>
            </p>

            {/* Filter */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
              {["all", "middle", "high", "low", "special"].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "20px",
                    border: "2px solid",
                    borderColor: filterClass === cls ? CLASS_COLORS[cls] || "#374151" : "#e5e7eb",
                    background: filterClass === cls ? CLASS_COLORS[cls] || "#374151" : "white",
                    color: filterClass === cls ? "white" : "#374151",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "13px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  {cls === "all" ? "ທັງໝົດ / All" :
                    cls === "middle" ? "ໝວດກາງ / Middle" :
                      cls === "high" ? "ໝວດສູງ / High" :
                        cls === "low" ? "ໝວດຕ່ຳ / Low" : "ພິເສດ / Special"}
                </button>
              ))}
            </div>

            {/* Consonant grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              {filteredConsonants.map((c) => (
                <button
                  key={c.char}
                  onClick={() => setSelectedConsonant(selectedConsonant?.char === c.char ? null : c)}
                  title={`${c.char} (${c.romanized}) — ${c.sound}`}
                  style={{
                    background: selectedConsonant?.char === c.char
                      ? CLASS_COLORS[c.class]
                      : "white",
                    border: `2px solid ${CLASS_COLORS[c.class] || "#9CA3AF"}`,
                    borderRadius: "12px",
                    padding: "16px 8px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                    color: selectedConsonant?.char === c.char ? "white" : "#1F2937",
                    boxShadow: selectedConsonant?.char === c.char
                      ? `0 4px 16px ${CLASS_COLORS[c.class]}44`
                      : "0 1px 4px rgba(0,0,0,0.05)",
                    transform: selectedConsonant?.char === c.char ? "scale(1.05)" : "scale(1)",
                    fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontSize: "32px", fontWeight: 800 }}>{c.char}</div>
                  <div style={{ fontSize: "11px", opacity: 0.75, marginTop: "4px" }}>{c.romanized}</div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {selectedConsonant && (
              <div
                style={{
                  background: "linear-gradient(135deg, #f0f9ff, #f8faff)",
                  border: `2px solid ${CLASS_COLORS[selectedConsonant.class]}`,
                  borderRadius: "16px",
                  padding: "24px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "24px",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    background: CLASS_COLORS[selectedConsonant.class],
                    color: "white",
                    borderRadius: "16px",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "60px",
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {selectedConsonant.char}
                </div>
                <div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                    <span style={{ background: CLASS_COLORS[selectedConsonant.class], color: "white", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 600 }}>
                      ໝວດ {selectedConsonant.class === "middle" ? "ກາງ" : selectedConsonant.class === "high" ? "ສູງ" : selectedConsonant.class === "low" ? "ຕ່ຳ" : "ພິເສດ"}
                    </span>
                    <span style={{ background: "#f3f4f6", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", color: "#374151" }}>
                      {selectedConsonant.romanized}
                    </span>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{selectedConsonant.sound}</div>
                  <div style={{ fontSize: "14px", color: "#6B7280" }} lang="en">
                    Class: <strong>{selectedConsonant.class}</strong> · Romanization: <strong>{selectedConsonant.romanized}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Class legend */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { cls: "middle", lo: "ໝວດກາງ", en: "Middle class — 9 consonants. Produce mid or low tones." },
                { cls: "high", lo: "ໝວດສູງ", en: "High class — 11 consonants. Produce high or rising tones." },
                { cls: "low", lo: "ໝວດຕ່ຳ", en: "Low class — 11 consonants. Produce low or falling tones." },
              ].map((item) => (
                <div
                  key={item.cls}
                  style={{
                    background: "white",
                    border: `2px solid ${CLASS_COLORS[item.cls]}`,
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: CLASS_COLORS[item.cls],
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: CLASS_COLORS[item.cls], marginBottom: "4px" }}>{item.lo}</div>
                    <div style={{ fontSize: "13px", color: "#6B7280" }} lang="en">{item.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOWELS ─────────────────────────────────────────────────────── */}
        {activeChapter === "vowels" && (
          <div>
            <SectionTitle lo="ສະຫຼະລາວ 24 ຮູບ" en="24 Lao Vowels" />
            <p style={{ color: "#6B7280", marginBottom: "28px", lineHeight: 1.7 }}>
              ພາສາລາວມີສະຫຼະທັງໝົດ <strong style={{ color: "#205781" }}>24 ຮູບ</strong> ແບ່ງເປັນ
              ສະຫຼະສັ້ນ 9 ຮູບ, ສະຫຼະຍາວ 9 ຮູບ ແລະ ສະຫຼະປະສົມ 6 ຮູບ.
              <span lang="en" style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>
                Lao has 24 vowels: 9 short vowels, 9 long vowels, and 6 diphthongs/special vowels.
              </span>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {/* Short vowels */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#205781", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ background: "#205781", color: "white", borderRadius: "6px", padding: "2px 10px", fontSize: "13px" }}>ສັ້ນ</span>
                  ສະຫຼະສັ້ນ <span lang="en" style={{ fontWeight: 400, fontSize: "14px", color: "#6B7280" }}>/ Short Vowels</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {VOWELS_SHORT.map((v) => (
                    <VowelRow key={v.name} vowel={v} color="#205781" />
                  ))}
                </div>
              </div>

              {/* Long vowels */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#4F959D", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ background: "#4F959D", color: "white", borderRadius: "6px", padding: "2px 10px", fontSize: "13px" }}>ຍາວ</span>
                  ສະຫຼະຍາວ <span lang="en" style={{ fontWeight: 400, fontSize: "14px", color: "#6B7280" }}>/ Long Vowels</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {VOWELS_LONG.map((v) => (
                    <VowelRow key={v.name} vowel={v} color="#4F959D" />
                  ))}
                </div>
              </div>
            </div>

            {/* Diphthongs note */}
            <div
              style={{
                marginTop: "28px",
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              <h3 style={{ fontWeight: 700, color: "#92400e", marginBottom: "10px" }}>
                ສະຫຼະປະສົມ <span lang="en" style={{ fontWeight: 400, fontSize: "14px" }}>/ Diphthongs & Complex Vowels</span>
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {[
                  { form: "ເ◌ຍ / ◌ຽ", name: "ia", romanized: "ia" },
                  { form: "ເ◌ືອ", name: "ɯa", romanized: "uea" },
                  { form: "◌ົວ / ◌ວ", name: "ua", romanized: "ua" },
                  { form: "ໄ◌ / ໃ◌", name: "aj", romanized: "ai" },
                  { form: "◌າວ", name: "aːw", romanized: "ao" },
                  { form: "ເ◌ຍ", name: "iaw", romanized: "iao" },
                ].map((d) => (
                  <div
                    key={d.romanized}
                    style={{
                      background: "white",
                      border: "1px solid #fed7aa",
                      borderRadius: "10px",
                      padding: "10px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "#92400e" }}>{d.form}</div>
                    <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>{d.romanized}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TONES ──────────────────────────────────────────────────────── */}
        {activeChapter === "tones" && (
          <div>
            <SectionTitle lo="ວັນນະຍຸດ 6 ລັກສະນະ" en="6 Lao Tone Marks" />
            <p style={{ color: "#6B7280", marginBottom: "28px", lineHeight: 1.7 }}>
              ພາສາລາວເປັນພາສາຮູບເງົາ ມີ <strong style={{ color: "#205781" }}>6 ສຽງວັນນະຍຸດ</strong>.
              ວັນນະຍຸດຂຶ້ນຢູ່ກັບ: ໝວດພະຍັນຊະນະຕົ້ນ + ວັນນະຍຸດສັນຍາ + ປະເພດຄຳ.
              <span lang="en" style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>
                Lao is a tonal language with 6 distinct tones. The tone of a syllable depends on: the consonant class + tone mark + syllable type.
              </span>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {TONES.map((tone) => (
                <div
                  key={tone.name}
                  style={{
                    background: "white",
                    border: `2px solid ${tone.color}22`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${tone.color}15, ${tone.color}08)`,
                      borderBottom: `2px solid ${tone.color}22`,
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        background: tone.color,
                        color: "white",
                        width: "60px",
                        height: "60px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        fontWeight: 900,
                        flexShrink: 0,
                      }}
                    >
                      {tone.example}
                    </div>
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: tone.color }}>{tone.name}</div>
                      <div style={{ fontSize: "13px", color: "#6B7280" }} lang="en">{tone.nameEn}</div>
                      <div style={{ fontSize: "20px", marginTop: "4px" }}>{tone.arrow}</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ background: `${tone.color}15`, color: tone.color, borderRadius: "6px", padding: "3px 10px", fontSize: "16px", fontWeight: 700 }}>
                        {tone.mark}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6B7280" }} lang="en">{tone.markEn}</span>
                    </div>
                    <p style={{ color: "#374151", fontSize: "14px", marginBottom: "4px" }}>{tone.description}</p>
                    <p style={{ color: "#9CA3AF", fontSize: "13px" }} lang="en">{tone.descriptionEn}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tone table */}
            <div
              style={{
                marginTop: "32px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <div style={{ background: "#1F2937", color: "white", padding: "16px 20px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "16px" }}>
                  ຕາຕະລາງວັນນະຍຸດ <span lang="en" style={{ fontWeight: 400, fontSize: "13px", opacity: 0.7 }}>/ Tone Chart</span>
                </h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["ໝວດ / Class", "ບໍ່ມີ / None", "◌້ Mai Ek", "◌໊ Mai Tho", "◌໋ Mai Tri", "◌໌ Mai Jat"].map((h) => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "center", borderBottom: "1px solid #e5e7eb", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cls: "ກາງ / Mid", cls_en: "Middle", tones: ["ສາມັນ ↠", "ເອກ ↘", "ໂທ ↗", "ຕີ ↠ (high)", "ຈັດຕະວາ ↗↘"] },
                      { cls: "ສູງ / High", cls_en: "High", tones: ["ສາມັນ ↠ (high)", "ເອກ ↘", "ໂທ ↗", "ຕີ ↠", "ຈັດຕະວາ ↗↘"] },
                      { cls: "ຕ່ຳ / Low", cls_en: "Low", tones: ["ຕ່ຳ ↠ (low)", "ຕ່ຳ ↘", "ສາມັນ ↠", "ໂທ ↗", "–"] },
                    ].map((row, i) => (
                      <tr key={row.cls} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 700, color: "#205781", borderBottom: "1px solid #f3f4f6" }}>
                          {row.cls}
                        </td>
                        {row.tones.map((t, j) => (
                          <td key={j} style={{ padding: "12px 16px", textAlign: "center", color: "#374151", borderBottom: "1px solid #f3f4f6" }}>
                            {t}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* WORDS ──────────────────────────────────────────────────────── */}
        {activeChapter === "words" && (
          <div>
            <SectionTitle lo="ຄຳ ແລະ ໂຄງສ້າງຄຳ" en="Words & Word Structure" />
            <p style={{ color: "#6B7280", marginBottom: "28px", lineHeight: 1.7 }}>
              ຄຳໃນພາສາລາວແມ່ນໜ່ວຍພາສາທີ່ມີຄວາມໝາຍ. ຄຳສາມາດແບ່ງໄດ້ຕາມລັກສະນະ
              ການສ້າງ ເປັນ 4 ປະເພດຕົ້ນຕໍ.
              <span lang="en" style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>
                Lao words are meaningful language units. They can be classified by their formation into 4 main types.
              </span>
            </p>

            {/* Word types */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "36px" }}>
              {WORD_TYPES.map((wt) => (
                <div
                  key={wt.nameEn}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{wt.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937", marginBottom: "4px" }}>{wt.nameLo}</h3>
                  <p style={{ fontSize: "13px", color: "#4F959D", marginBottom: "12px" }} lang="en">{wt.nameEn}</p>
                  <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, marginBottom: "8px" }}>{wt.descLo}</p>
                  <p style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: 1.5, marginBottom: "16px" }} lang="en">{wt.descEn}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {wt.examples.map((ex) => (
                      <span
                        key={ex}
                        style={{
                          background: "#f0f9ff",
                          border: "1px solid #bae6fd",
                          color: "#0369a1",
                          borderRadius: "8px",
                          padding: "4px 12px",
                          fontSize: "15px",
                          fontWeight: 600,
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Word classes */}
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1F2937", marginBottom: "20px" }}>
              ໝວດຄຳ <span lang="en" style={{ fontWeight: 400, fontSize: "16px", color: "#6B7280" }}>/ Parts of Speech</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { lo: "ຄຳນາມ", en: "Noun", icon: "🏠", ex: "ເຮືອນ, ຄົນ, ໝາ" },
                { lo: "ຄຳກິລິຍາ", en: "Verb", icon: "🏃", ex: "ກິນ, ດື່ມ, ຍ່າງ" },
                { lo: "ຄຳຄຸນນາມ", en: "Adjective", icon: "✨", ex: "ດີ, ຊົ່ວ, ໃຫຍ່" },
                { lo: "ຄຳວິເສດ", en: "Adverb", icon: "⚡", ex: "ໄວ, ຊ້າ, ດັງ" },
                { lo: "ຄຳສັນຍາ", en: "Conjunction", icon: "🔗", ex: "ແລະ, ຫຼື, ແຕ່" },
                { lo: "ຄຳບຸບ", en: "Preposition", icon: "📍", ex: "ໃນ, ເທິງ, ລຸ່ມ" },
                { lo: "ຄຳສຳພັນ", en: "Pronoun", icon: "👤", ex: "ຂ້ອຍ, ເຈົ້າ, ລາວ" },
                { lo: "ຄຳອຸທານ", en: "Interjection", icon: "💬", ex: "ໂອ, ອາ, ໂອ້" },
              ].map((item) => (
                <div
                  key={item.en}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: "#205781", marginBottom: "2px" }}>{item.lo}</div>
                  <div style={{ fontSize: "12px", color: "#4F959D", marginBottom: "8px" }} lang="en">{item.en}</div>
                  <div style={{ fontSize: "13px", color: "#9CA3AF" }}>{item.ex}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REFERENCE ──────────────────────────────────────────────────── */}
        {activeChapter === "reference" && (
          <div>
            <SectionTitle lo="ຂໍ້ມູນອ້າງອີງ" en="Reference Information" />

            <div
              style={{
                background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                color: "white",
                borderRadius: "20px",
                padding: "32px",
                marginBottom: "32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "-20px",
                  fontSize: "120px",
                  opacity: 0.06,
                  userSelect: "none",
                }}
              >
                📚
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>
                ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ ເຫຼັ້ມ 1
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: "20px" }} lang="en">
                Basic Principles of Lao Language Usage — Volume 1 is an official educational
                reference published by the Ministry of Education and Sports of the Lao People&apos;s
                Democratic Republic in 2024.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {[
                  { label: "ກະຊວງ / Ministry", value: "ສຶກສາທິການ ແລະ ກິລາ" },
                  { label: "ປີ / Year", value: "2024" },
                  { label: "ພາສາ / Language", value: "ລາວ" },
                  { label: "ໜ້າ / Pages", value: "267" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "14px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div style={{ fontSize: "11px", opacity: 0.6, marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontWeight: 700 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick reference cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                {
                  title: "ສະຫຼຸບໄວ — ຕົວເລກ",
                  titleEn: "Quick Stats",
                  items: [
                    { k: "ພະຍັນຊະນະ / Consonants", v: "33 ຕົວ" },
                    { k: "ສະຫຼະ / Vowels", v: "24 ຮູບ" },
                    { k: "ວັນນະຍຸດ / Tones", v: "6 ສຽງ" },
                    { k: "ໝວດພະຍັນ / Consonant Classes", v: "3 ໝວດ" },
                    { k: "ໝວດຄຳ / Word Classes", v: "8+ ປະເພດ" },
                  ],
                  color: "#205781",
                },
                {
                  title: "ການຂຽນທີ່ຖືກຕ້ອງ",
                  titleEn: "Correct Writing Tips",
                  items: [
                    { k: "ໃຊ້ຟອນທ໌ລາວ", v: "Noto Sans/Serif Lao" },
                    { k: "ລຳດັບການຂຽນ", v: "ສ + ສ + ວັນ + ຕ" },
                    { k: "ຊ່ອງໄຟ", v: "ບໍ່ໃຊ້ຊ່ອງໄຟລະຫວ່າງ" },
                    { k: "ເຄື່ອງໝາຍວັກ", v: "ໃຊ້ຈຸດ, ຈຸດສໍ" },
                    { k: "ຕົວໜັງສືໃຫຍ່", v: "ພາສາລາວບໍ່ມີ" },
                  ],
                  color: "#4F959D",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: "white",
                    border: `2px solid ${card.color}22`,
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ background: card.color, color: "white", padding: "16px 20px" }}>
                    <div style={{ fontWeight: 700 }}>{card.title}</div>
                    <div style={{ fontSize: "12px", opacity: 0.75 }} lang="en">{card.titleEn}</div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    {card.items.map((item) => (
                      <div
                        key={item.k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: "1px solid #f3f4f6",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "13px", color: "#6B7280" }}>{item.k}</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: card.color, textAlign: "right" }}>{item.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Download button */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <a
                href="/resource/ຫຼັກການພື້ນຖານການນຳໃຊ້ພາສາລາວ-ເຫຼັ້ມ-1.pdf"
                download
                id="pdf-download-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #205781, #4F959D)",
                  color: "white",
                  padding: "16px 32px",
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "16px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(32,87,129,0.35)",
                  transition: "transform 0.2s",
                }}
              >
                📥 ດາວໂຫຼດ PDF ຕົ້ນສະບັບ
                <span style={{ fontWeight: 400, fontSize: "13px", opacity: 0.85 }} lang="en">
                  Download original PDF
                </span>
              </a>
              <p style={{ color: "#9CA3AF", fontSize: "13px", marginTop: "12px" }}>
                PDF ຕົ້ນສະບັບ · ຂໍ້ມູນຈາກ ກະຊວງສຶກສາທິການ ແລະ ກິລາ · 2024
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({ lo, en }: { lo: string; en: string }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#1F2937", marginBottom: "6px" }}>
        {lo}
      </h2>
      <p style={{ color: "#4F959D", fontSize: "16px" }} lang="en">
        {en}
      </p>
      <div style={{ width: "60px", height: "4px", background: "linear-gradient(90deg, #205781, #4F959D)", borderRadius: "2px", marginTop: "10px" }} />
    </div>
  );
}

function VowelRow({ vowel, color }: { vowel: { form: string; ipa: string; name: string; romanized: string }; color: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        alignItems: "center",
        gap: "12px",
        padding: "10px 14px",
        background: "white",
        border: `1px solid ${color}22`,
        borderRadius: "10px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: 700, color, textAlign: "center" }}>{vowel.form}</div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>{vowel.name}</div>
        <div style={{ fontSize: "11px", color: "#9CA3AF" }}>/{vowel.ipa}/</div>
      </div>
      <div style={{ background: `${color}15`, color, borderRadius: "6px", padding: "3px 10px", fontSize: "13px", fontWeight: 600 }}>
        {vowel.romanized}
      </div>
    </div>
  );
}
