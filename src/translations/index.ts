import type { Lang } from "@/context/LanguageContext";

// ─── Full translation dictionary ─────────────────────────────────────────────

const translations = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav_home:            { lo: "ໜ້າຫຼັກ",             en: "Home" },
  nav_correct:         { lo: "ຄຳຜິດ ແລະ ຖືກ",        en: "Correct & Incorrect" },
  nav_about:           { lo: "ກ່ຽວກັບພວກເຮົາ",        en: "About Us" },
  nav_contact:         { lo: "ຕິດຕໍ່ພວກເຮົາ",        en: "Contact" },
  lang_toggle:         { lo: "EN",                   en: "ລາວ" },

  // ── Search component ─────────────────────────────────────────────────────
  search_title:        { lo: "ຄົ້ນຫາຄຳສັບ",          en: "Search Words" },
  search_placeholder:  { lo: "ພິມຄຳສັບລາວທີ່ຕ້ອງການຄົ້ນຫາ... (ຕົວຢ່າງ: ນໍ້າ, ສະບາຍດີ)", en: "Type a Lao or English word… (e.g. water, hello)" },
  search_hint:         { lo: "ໃຊ້ປຸ່ມ ↑ ↓ ເພື່ອເລືອກ, Enter ເພື່ອເຂົ້າໄປ", en: "Use ↑ ↓ to navigate, Enter to open" },
  search_no_result:    { lo: "ບໍ່ພົບຄຳ", en: "No results for" },
  search_try_another:  { lo: "ລອງກວດສອບການສະກົດ ຫຼື ຄົ້ນຫາດ້ວຍຄຳອື່ນ", en: "Check your spelling or try a different term" },
  search_found:        { lo: "ພົບ", en: "Found" },
  search_words:        { lo: "ຄຳ", en: "word(s)" },
  search_select:       { lo: "ເລືອກ", en: "select" },
  search_open:         { lo: "ເຂົ້າໄປ", en: "open" },
  search_close:        { lo: "ປິດ", en: "close" },
  search_clear:        { lo: "ລ້າງການຄົ້ນຫາ", en: "Clear search" },
  match_contains:      { lo: "ມີໃນຄຳ", en: "contains" },
  match_fuzzy:         { lo: "ໃກ້ຄຽງ", en: "similar" },

  // ── Home page sidebar ─────────────────────────────────────────────────────
  home_how_title:      { lo: "📖 ວິທີໃຊ້ເວັບໄຊ",       en: "📖 How to Use" },
  home_how_1:          { lo: "ພິມຄຳສັບລາວ ຫຼື ອັງກິດ ໃນຊ່ອງຄົ້ນຫາ", en: "Type a Lao or English word in the search box" },
  home_how_2:          { lo: "ເລືອກຄຳສັບເພື່ອເບິ່ງຄວາມໝາຍ ແລະ ຕົວຢ່າງ", en: "Select a word to see its meaning and examples" },
  home_how_3:          { lo: "ກວດເບິ່ງ ຄຳຖືກ ແລະ ຜິດ ເພື່ອຮຽນການສະກົດ", en: "Check Correct & Incorrect to learn proper spelling" },
  home_links_title:    { lo: "🔗 ລິ້ງດ່ວນ",             en: "🔗 Quick Links" },
  home_link_correct:   { lo: "ຄຳຖືກ ແລະ ຜິດ",          en: "Correct & Incorrect" },
  home_link_about:     { lo: "ກ່ຽວກັບພວກເຮົາ",          en: "About Us" },

  // ── Correct-Incorrect list page ──────────────────────────────────────────
  ci_page_title:       { lo: "ຄຳສັບ",                  en: "Lao Words" },
  ci_page_correct:     { lo: "ຖືກ",                    en: "Correct" },
  ci_page_and:         { lo: "ແລະ",                    en: "&" },
  ci_page_incorrect:   { lo: "ຜິດ",                    en: "Incorrect" },
  ci_loading_count:    { lo: "ກຳລັງໂຫຼດ...",            en: "Loading…" },
  ci_count_suffix:     { lo: "ຕົວຢ່າງທີ່ພົບເລື້ອຍ",     en: "common examples" },
  ci_search_ph:        { lo: "ຄົ້ນຫາຄຳຜິດ ຫຼື ຄຳຖືກ... (ຕົວຢ່າງ: ດີ້ ຫຼື ສະບາຍດີ)", en: "Search words… (e.g. sabaidee)" },
  ci_loading_data:     { lo: "ກຳລັງໂຫຼດຂໍ້ມູນ...",      en: "Loading data…" },
  ci_not_found:        { lo: "ບໍ່ພົບຄຳທີ່ຄົ້ນຫາ",        en: "No results found" },
  ci_view_detail:      { lo: "ເບິ່ງລາຍລະອຽດ",           en: "View Detail" },
  ci_tips_title:       { lo: "💡 ເຄັດລັບການສະກົດ",      en: "💡 Spelling Tips" },
  ci_tip_1:            { lo: "ກວດເບິ່ງສະຫຼະ ແລະ ວັນນະຍຸດ ໃຫ້ຖືກຕ້ອງ", en: "Check vowels and tone marks carefully" },
  ci_tip_2:            { lo: "ຫຼີກລ້ຽງການໃຊ້ຕົວເລກສຽງທີ່ບໍ່ຈຳເປັນ", en: "Avoid unnecessary tone markers" },
  ci_tip_3:            { lo: "ອ່ານຄຳອະທິບາຍເພື່ອເຂົ້າໃຈກົດຂອງພາສາ", en: "Read explanations to understand language rules" },
  ci_links_title:      { lo: "🔗 ລິ້ງທີ່ກ່ຽວຂ້ອງ",       en: "🔗 Related Links" },
  ci_link_search:      { lo: "ຄົ້ນຫາຄຳສັບ",             en: "Search Words" },
  ci_link_about:       { lo: "ກ່ຽວກັບພວກເຮົາ",           en: "About Us" },

  // ── Correct-Incorrect badge labels ──────────────────────────────────────
  badge_incorrect:     { lo: "ຜິດ",                    en: "Wrong" },
  badge_correct:       { lo: "ຖືກ",                    en: "Correct" },
  badge_ci_label:      { lo: "ຄຳຖືກ ແລະ ຜິດ",          en: "Correct & Incorrect" },

  // ── Correct-Incorrect detail page ────────────────────────────────────────
  ci_back:             { lo: "ກັບໄປລາຍການ",             en: "Back to list" },
  ci_explanation:      { lo: "ຄຳອະທິບາຍ",              en: "Explanation" },
  ci_not_found_msg:    { lo: "ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການ",   en: "Data not found" },
  ci_share_btn:        { lo: "ສ້າງຮູບແຊ໌ Social Media", en: "Create Social Image" },
  ci_share_size:       { lo: "📐 ເລືອກຂະໜາດ",           en: "📐 Choose Size" },
  ci_share_close:      { lo: "✕",                       en: "✕" },
  ci_share_loading:    { lo: "ກຳລັງສ້າງຮູບ...",          en: "Generating image…" },
  ci_share_download:   { lo: "ດາວໂຫຼດ / ບັນທຶກຮູບ",    en: "Download / Save Image" },
  ci_share_ios_hint:   { lo: "📱 iPhone/iPad: ກົດ \"ດາວໂຫຼດ\" → ຈິກຮູບຄ້າງ → \"ບັນທຶກຮູບ\"", en: "📱 iPhone/iPad: tap Download → long-press image → Save to Photos" },
  ci_share_done:       { lo: "ດາວໂຫຼດແລ້ວ ນຳໄປໂພສໄດ້ເລີ້ຍ 🎉", en: "Downloaded! Ready to post 🎉" },

  // ── MistakeCorrectSection ─────────────────────────────────────────────────
  mistake_section_title: { lo: "ຕົວຢ່າງຄຳຜິດ ແລະ ຄຳຖືກ", en: "Common Spelling Mistakes" },

  // ── About page ────────────────────────────────────────────────────────────
  about_title:         { lo: "ກ່ຽວກັບພວກເຮົາ",          en: "About Us" },
  about_subtitle:      { lo: "ພື້ນທີ່ແຫ່ງກຸ່ມຄົນ ເພື່ອການອະນຸລັກ ແລະ ເຜີຍແຜ່ຄວາມງົດງາມຂອງພາສາລາວ.", en: "A community space dedicated to preserving and sharing the beauty of the Lao language." },
  about_vision_title:  { lo: "ວິໄສທັດຂອງພວກເຮົາ",       en: "Our Vision" },
  about_vision_p1:     { lo: "ພວກເຮົາສ້າງ ວັດຈະນານຸກົມພາສາລາວ ນີ້ຂຶ້ນມາເພື່ອຮັບໃຊ້ຊຸມຊົນລາວໃນທົ່ວໂລກ — ໂດຍການເປັນສູນລວມໃຫ້ແກ່ເຈົ້າຂອງພາສາ, ຜູ້ທີ່ກຳລັງ ຮຽນພາສາລາວ, ຊາວລາວທີ່ຢູ່ຕ່າງປະເທດ, ແລະ ຜູ້ທີ່ສົນໃຈໃນວັດທະນະທຳລາວ ໄດ້ເຂົ້າມານຳໃຊ້ໃນບ່ອນດຽວທີ່ເຂົ້າເຖິງໄດ້ງ່າຍ.", en: "We built this Lao dictionary to serve the Lao community worldwide — as a central hub for native speakers, Lao learners, overseas Lao people, and anyone interested in Lao culture." },
  about_vision_p2:     { lo: "ໃນຍຸກທີ່ ປັນຍາປະດິດ (AI) ເຂົ້າມາມີບົດບາດຫຼາຍຂຶ້ນ, ການຊອກຫາຂໍ້ມູນພາສາລາວທີ່ຖືກຕ້ອງ ແລະ ເຊື່ອຖືໄດ້ນັ້ນກາຍເປັນເລື່ອງຍາກ. ພວກເຮົາຈຶ່ງເຊື່ອວ່າທຸກໆ ຄຳສັບລາວ ສົມຄວນໄດ້ຮັບການບັນທຶກ, ການກວດສອບຄວາມຖືກຕ້ອງ, ແລະ ການສືບທອດຕໍ່ໆກັນໄປ.", en: "In an era where AI is increasingly prominent, finding accurate and reliable Lao language information is becoming harder. We believe every Lao word deserves to be recorded, verified, and passed on to future generations." },

  // ── Contact page ──────────────────────────────────────────────────────────
  contact_title:       { lo: "ຕິດຕໍ່",                  en: "Contact" },
  contact_title2:      { lo: "ພວກເຮົາ",                 en: "Us" },
  contact_subtitle:    { lo: "ພວກເຮົາຍິນດີຮັບຟັງທຸກຄຳແນະນຳ ແລະ ຄຳຄິດເຫັນ ເພື່ອປັບປຸງວັດຈະນານຸກົມລາວ-ອັງກິດ ໃຫ້ດີຂຶ້ນ.", en: "We welcome all feedback and suggestions to improve the Lao-English dictionary." },
  contact_how_title:   { lo: "ສິ່ງທີ່ທ່ານສາມາດແຈ້ງໃຫ້ພວກເຮົາຊາບ", en: "How you can help" },
  contact_card_wp_desc:{ lo: "ສົ່ງຄຳແນະນຳ ຫຼື ຄຳຖາມ", en: "Send suggestions or questions" },
  contact_card_web_title:   { lo: "ເວັບໄຊ",             en: "Website" },
  contact_card_web_desc:    { lo: "ເຂົ້າເບິ່ງເວັບໄຊຂອງພວກເຮົາ", en: "Visit our website" },
  contact_card_loc_title:   { lo: "ສະຖານທີ່",           en: "Location" },
  contact_card_loc_desc:    { lo: "ທີມພັດທະນາ",         en: "Development team" },
  contact_item_error_title: { lo: "ແຈ້ງຄຳຜິດ",          en: "Report Errors" },
  contact_item_error_desc:  { lo: "ຫາກພົບຄຳທີ່ສະກົດຜິດ ຫຼື ແປຜິດ", en: "If you find misspelled or mistranslated words" },
  contact_item_add_title:   { lo: "ເພີ່ມຄຳສັບ",          en: "Add Words" },
  contact_item_add_desc:    { lo: "ແນະນຳຄຳສັບໃໝ່ທີ່ຄວນມີໃນວັດຈະນານຸກົມ", en: "Suggest new words to add to the dictionary" },
  contact_item_sugg_title:  { lo: "ຄຳແນະນຳ",            en: "Suggestions" },
  contact_item_sugg_desc:   { lo: "ແນະນຳຟີເຈີໃໝ່ ຫຼື ປັບປຸງເວັບໄຊ", en: "Suggest new features or website improvements" },
  contact_item_collab_title:{ lo: "ຮ່ວມພັດທະນາ",        en: "Collaborate" },
  contact_item_collab_desc: { lo: "ສົນໃຈຮ່ວມພັດທະນາ ຫຼື ສະໜັບສະໜູນ", en: "Interested in contributing or sponsoring" },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer_brand:        { lo: "ຄຳສັບພາສາລາວ",            en: "Lao Dictionary" },
  footer_desc:         { lo: "ວັດຈະນານຸກົມລາວ-ອັງກິດ ອອນລາຍ ຟຣີ. ແຫຼ່ງຮຽນພາສາລາວທີ່ເຊື່ອຖືໄດ້ ລວບລວມຄຳສັບ, ການອອກສຽງ, ຄຳຖືກ ແລະ ຜິດ ແລະ ຕົວຢ່າງປະໂຫຍກ.", en: "Free online Lao-English dictionary. A reliable resource for Lao vocabulary, pronunciation, correct & incorrect spellings, and example sentences." },
  footer_links_title:  { lo: "ລິ້ງທີ່ເປັນປະໂຫຍດ",       en: "Useful Links" },
  footer_home:         { lo: "ໜ້າຫຼັກ (Home)",           en: "Home" },
  footer_correct:      { lo: "ຄຳຖືກ ແລະ ຜິດ",           en: "Correct & Incorrect" },
  footer_about:        { lo: "ກ່ຽວກັບພວກເຮົາ",           en: "About Us" },
  footer_privacy:      { lo: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",  en: "Privacy Policy" },
  footer_contact:      { lo: "ຕິດຕໍ່ພວກເຮົາ",           en: "Contact" },
  footer_info_title:   { lo: "ຂໍ້ມູນເພີ່ມເຕີມ",           en: "More Info" },
  footer_info_desc:    { lo: "ເວັບໄຊນີ້ສ້າງຂຶ້ນເພື່ອອະນຸລັກ ແລະ ເຜີຍແຜ່ພາສາລາວໃຫ້ແກ່ຊຸມຊົນລາວໃນທົ່ວໂລກ. ຫາກທ່ານມີຄຳແນະນຳ ຫຼື ຕ້ອງການປະກອບສ່ວນ ກະລຸນາຕິດຕໍ່ຫາພວກເຮົາ.", en: "This website was created to preserve and promote the Lao language for the global Lao community. If you have suggestions or want to contribute, please contact us." },
  footer_copy:         { lo: "ຄຳສັບພາສາລາວ (laoswords.com) • Made with ❤️ for the Lao community", en: "Lao Dictionary (laoswords.com) • Made with ❤️ for the Lao community" },
} satisfies Record<string, Record<Lang, string>>;

export type TranslationKey = keyof typeof translations;

/** Get a translated string for the given key and language. */
export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}
