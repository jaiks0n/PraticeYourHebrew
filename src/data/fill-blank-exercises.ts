export interface FillBlankHint {
  infinitiveHebrew: string
  tense: 'présent' | 'passé' | 'futur'
  genderLabel?: string
}

export interface FillBlankAnswer {
  hebrew: string
  transcription: string
}

export interface FillBlankExercise {
  id: string
  type: 'verb_fill_blank'
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  active: boolean
  sentence: {
    beforeBlank: string
    afterBlank: string
  }
  hint: FillBlankHint
  french: string
  answer: FillBlankAnswer
  /** Transcription phonétique de la phrase complète (avec la bonne réponse). */
  sentenceTranscription: string
}

export const fillBlankExercises: FillBlankExercise[] = [
  {
    id: 'fb-001',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' ללכת לקולנוע הערב.',
    },
    hint: { infinitiveHebrew: 'לרצות', tense: 'présent', genderLabel: 'm.' },
    french: 'Je veux aller au cinéma ce soir.',
    answer: { hebrew: 'רוצה', transcription: 'rotze' },
    sentenceTranscription: "ani rotse lalekhet lekolnoa ha'erev",
  },
  {
    id: 'fb-003',
    type: 'verb_fill_blank',
    category: 'École & Éducation',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אנחנו ',
      afterBlank: ' את השאלה.',
    },
    hint: { infinitiveHebrew: 'להבין', tense: 'présent',genderLabel: 'm. pl.' },
    french: 'Nous comprenons la question.',
    answer: { hebrew: 'מבינים', transcription: 'mevinim' },
    sentenceTranscription: "anachnu mevinim et ahashe'elah",
  },
  {
    id: 'fb-005',
    type: 'verb_fill_blank',
    category: 'Maison & Famille',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אתה ',
      afterBlank: ' בתל אביב?',
    },
    hint: { infinitiveHebrew: 'לגור', tense: 'présent', genderLabel: 'm.' },
    french: 'Tu habites à Tel Aviv ?',
    answer: { hebrew: 'גר', transcription: 'gar' },
    sentenceTranscription: 'ata gar be Tel Aviv?',
  },
  {
    id: 'fb-008',
    type: 'verb_fill_blank',
    category: 'Nourriture & Restaurant',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'את ',
      afterBlank: ' ארוחת בוקר כל יום?',
    },
    hint: { infinitiveHebrew: 'לאכול', tense: 'présent', genderLabel: 'f.' },
    french: 'Tu manges le petit-déjeuner tous les jours ?',
    answer: { hebrew: 'אוכלת', transcription: 'ochelet' },
    sentenceTranscription: 'at ochelet aruchat boker kol yom?',
  },
  {
    id: 'fb-009',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' ללכת לקולנוע הערב.',
    },
    hint: { infinitiveHebrew: 'לרצות', tense: 'présent', genderLabel: 'm.' },
    french: 'Je veux aller au cinéma ce soir.',
    answer: { hebrew: 'רוצה', transcription: 'rotze' },
    sentenceTranscription: 'ani rotze lalechet lakolnoa haerev.',
},
{
    id: 'fb-010',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אנחנו ',
      afterBlank: ' את השאלה.',
    },
    hint: { infinitiveHebrew: 'להבין', tense: 'présent', genderLabel: 'm. pl.' },
    french: 'Nous comprenons la question.',
    answer: { hebrew: 'מבינים', transcription: 'mevinim' },
    sentenceTranscription: 'anachnu mevinim et hashe\'ela.',
},
{
    id: 'fb-011',
    type: 'verb_fill_blank',
    category: 'Maison & Famille',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אתה ',
      afterBlank: ' בתל אביב?',
    },
    hint: { infinitiveHebrew: 'לגור', tense: 'présent', genderLabel: 'm.' },
    french: 'Tu habites à Tel Aviv ?',
    answer: { hebrew: 'גר', transcription: 'gar' },
    sentenceTranscription: 'ata gar betel aviv?',
},
{
    id: 'fb-012',
    type: 'verb_fill_blank',
    category: 'Travail & Métiers',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'היא ',
      afterBlank: ' במשרד החדש.',
    },
    hint: { infinitiveHebrew: 'לעבוד', tense: 'présent', genderLabel: 'f.' },
    french: 'Elle travaille dans le nouveau bureau.',
    answer: { hebrew: 'עובדת', transcription: 'ovedet' },
    sentenceTranscription: 'hi ovedet bamisrad hechadash.',
},
{
    id: 'fb-013',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' ספר מעניין.',
    },
    hint: { infinitiveHebrew: 'לקרוא', tense: 'présent', genderLabel: 'm.' },
    french: 'Je lis un livre intéressant.',
    answer: { hebrew: 'קורא', transcription: 'kore' },
    sentenceTranscription: 'ani kore sefer me\'anyen.',
},
{
    id: 'fb-014',
    type: 'verb_fill_blank',
    category: 'Nourriture & Restaurant',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'הם ',
      afterBlank: ' מים כל הזמן.',
    },
    hint: { infinitiveHebrew: 'לשתות', tense: 'présent', genderLabel: 'm. pl.' },
    french: 'Ils boivent de l\'eau tout le temps.',
    answer: { hebrew: 'שותים', transcription: 'shotim' },
    sentenceTranscription: 'hem shotim mayim kol hazman.',
},
{
    id: 'fb-015',
    type: 'verb_fill_blank',
    category: 'Corps & Santé',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'הילד ',
      afterBlank: ' שמונה שעות בלילה.',
    },
    hint: { infinitiveHebrew: 'לישון', tense: 'présent', genderLabel: 'm.' },
    french: 'L\'enfant dort huit heures par nuit.',
    answer: { hebrew: 'ישן', transcription: 'yashen' },
    sentenceTranscription: 'hayeled yashen shmone sha\'ot balayla.',
},
{
    id: 'fb-016',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'את ',
      afterBlank: ' את הדלת בבקשה?',
    },
    hint: { infinitiveHebrew: 'לפתוח', tense: 'présent', genderLabel: 'f.' },
    french: 'Tu ouvres la porte s\'il te plaît ?',
    answer: { hebrew: 'פותחת', transcription: 'potachat' },
    sentenceTranscription: 'at potachat et hadelet bevakasha?',
},
{
    id: 'fb-017',
    type: 'verb_fill_blank',
    category: 'Vêtements & Shopping',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אנחנו ',
      afterBlank: ' בגדים חדשים.',
    },
    hint: { infinitiveHebrew: 'לקנות', tense: 'présent', genderLabel: 'm. pl.' },
    french: 'Nous achetons de nouveaux vêtements.',
    answer: { hebrew: 'קונים', transcription: 'konim' },
    sentenceTranscription: 'anachnu konim begadim chadashim.',
},
{
    id: 'fb-018',
    type: 'verb_fill_blank',
    category: 'Famille & Relations',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' את המשפחה שלי מאוד.',
    },
    hint: { infinitiveHebrew: 'לאהוב', tense: 'présent', genderLabel: 'm.' },
    french: 'J\'aime beaucoup ma famille.',
    answer: { hebrew: 'אוהב', transcription: 'ohev' },
    sentenceTranscription: 'ani ohev et hamishpacha sheli me\'od.',
},
{
    id: 'fb-019',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'הוא ',
      afterBlank: ' לדבר עברית.',
    },
    hint: { infinitiveHebrew: 'להתחיל', tense: 'présent', genderLabel: 'm.' },
    french: 'Il commence à parler hébreu.',
    answer: { hebrew: 'מתחיל', transcription: 'matchil' },
    sentenceTranscription: 'hu matchil ledaber ivrit.',
},
{
    id: 'fb-020',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'הן ',
      afterBlank: ' עבודה בעיר.',
    },
    hint: { infinitiveHebrew: 'לחפש', tense: 'présent', genderLabel: 'f. pl.' },
    french: 'Elles cherchent du travail en ville.',
    answer: { hebrew: 'מחפשות', transcription: 'mechapsot' },
    sentenceTranscription: 'hen mechapsot avoda ba\'ir.',
},
{
    id: 'fb-021',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' את המפתחות שלי!',
    },
    hint: { infinitiveHebrew: 'למצוא', tense: 'présent', genderLabel: 'm.' },
    french: 'Je trouve mes clés !',
    answer: { hebrew: 'מוצא', transcription: 'motze' },
    sentenceTranscription: 'ani motze et hamaftechot sheli!',
},
{
    id: 'fb-022',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'את ',
      afterBlank: ' עזרה מהוריך?',
    },
    hint: { infinitiveHebrew: 'לבקש', tense: 'présent', genderLabel: 'f.' },
    french: 'Tu demandes de l\'aide à tes parents ?',
    answer: { hebrew: 'מבקשת', transcription: 'mevakeshet' },
    sentenceTranscription: 'at mevakeshet ezra mehoraich?',
},
{
    id: 'fb-023',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'הילדים ',
      afterBlank: ' לשאלות המורה.',
    },
    hint: { infinitiveHebrew: 'לענות', tense: 'présent', genderLabel: 'm. pl.' },
    french: 'Les enfants répondent aux questions du professeur.',
    answer: { hebrew: 'עונים', transcription: 'onim' },
    sentenceTranscription: 'hayeladim onim lishe\'elot hamore.',
},
{
    id: 'fb-024',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' למוזיקה כל בוקר.',
    },
    hint: { infinitiveHebrew: 'להקשיב', tense: 'présent', genderLabel: 'm.' },
    french: 'J\'écoute de la musique chaque matin.',
    answer: { hebrew: 'מקשיב', transcription: 'makshiv' },
    sentenceTranscription: 'ani makshiv lemuzika kol boker.',
},
{
    id: 'fb-025',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'את ',
      afterBlank: ' לי במטבח?',
    },
    hint: { infinitiveHebrew: 'לעזור', tense: 'présent', genderLabel: 'f.' },
    french: 'Tu m\'aides dans la cuisine ?',
    answer: { hebrew: 'עוזרת', transcription: 'ozeret' },
    sentenceTranscription: 'at ozeret li bamitbach?',
},
{
    id: 'fb-026',
    type: 'verb_fill_blank',
    category: 'École & Éducation',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אנחנו ',
      afterBlank: ' עברית באוניברסיטה.',
    },
    hint: { infinitiveHebrew: 'ללמוד', tense: 'présent', genderLabel: 'm. pl.' },
    french: 'Nous apprenons l\'hébreu à l\'université.',
    answer: { hebrew: 'לומדים', transcription: 'lomdim' },
    sentenceTranscription: 'anachnu lomdim ivrit ba\'universita.',
},
{
    id: 'fb-027',
    type: 'verb_fill_blank',
    category: 'Travail & Métiers',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'המורה ',
      afterBlank: ' אנגלית בבית הספר.',
    },
    hint: { infinitiveHebrew: 'ללמד', tense: 'présent', genderLabel: 'f.' },
    french: 'La professeure enseigne l\'anglais à l\'école.',
    answer: { hebrew: 'מלמדת', transcription: 'melamedet' },
    sentenceTranscription: 'hamora melamedet anglit beveit hasefer.',
},
{
    id: 'fb-028',
    type: 'verb_fill_blank',
    category: 'Actions & Verbes',
    difficulty: 'beginner',
    active: true,
    sentence: {
      beforeBlank: 'אני ',
      afterBlank: ' שהמזג אוויר ישתפר מחר.',
    },
    hint: { infinitiveHebrew: 'לקוות', tense: 'présent', genderLabel: 'm.' },
    french: 'J\'espère que le temps s\'améliorera demain.',
    answer: { hebrew: 'מקווה', transcription: 'mekave' },
    sentenceTranscription: 'ani mekave shehamezeg avir yishtaper machar.',
},
 
]
