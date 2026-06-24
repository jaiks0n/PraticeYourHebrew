export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'particle'
  | 'interjection'
  | 'expression'
  | 'number'
  | 'proper_noun'

export const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'particle',
  'interjection',
  'expression',
  'number',
  'proper_noun',
] as const satisfies readonly PartOfSpeech[]

export type NounGender = 'masculine' | 'feminine'

export type Binyan =
  | 'paal'
  | 'nifal'
  | 'piel'
  | 'pual'
  | 'hifil'
  | 'hufal'
  | 'hitpael'

export const BINYANIM = [
  'paal',
  'nifal',
  'piel',
  'pual',
  'hifil',
  'hufal',
  'hitpael',
] as const satisfies readonly Binyan[]

/** Thèmes recommandés + catégories encore présentes dans vocabulary-verbes.ts (legacy, à migrer pendant la relecture). */
export type VocabularyCategory =
  | 'Salutations & Expressions'
  | 'Nourriture & Restaurant'
  | 'Corps & Santé'
  | 'Famille & Relations'
  | 'Maison & Ville'
  | 'Voyage & Loisirs'
  | 'Travail & Métiers'
  | 'Nature & Météo'
  | 'Temps & Dates'
  | 'Nombres & Quantités'
  | 'Vêtements & Shopping'
  | 'École & Éducation'
  | 'Transport'
  | 'Adjectifs & Qualités'
  | 'Verbes modaux'
  | 'Religion & Culture'
  | 'Technologie'
  | 'Actions & Verbes'
  | 'Animaux & Nature'
  | 'Couleurs & Descriptions'
  | 'Expressions générales'
  | 'Lieux & Directions'
  | 'Maison & Famille'
  | 'Météo & Nature'
  | 'Ville & Architecture'

export const VOCABULARY_CATEGORIES = [
  'Salutations & Expressions',
  'Nourriture & Restaurant',
  'Corps & Santé',
  'Famille & Relations',
  'Maison & Ville',
  'Voyage & Loisirs',
  'Travail & Métiers',
  'Nature & Météo',
  'Temps & Dates',
  'Nombres & Quantités',
  'Vêtements & Shopping',
  'École & Éducation',
  'Transport',
  'Adjectifs & Qualités',
  'Verbes modaux',
  'Religion & Culture',
  'Technologie',
  'Actions & Verbes',
  'Animaux & Nature',
  'Couleurs & Descriptions',
  'Expressions générales',
  'Lieux & Directions',
  'Maison & Famille',
  'Météo & Nature',
  'Ville & Architecture',
] as const satisfies readonly VocabularyCategory[]

export interface ConjugationCell {
  hebrew: string
  transcription: string
  french?: string
}

/** Clés pour passé / futur — correspondent aux cases du tableau (personne + nombre + genre). */
export type ConjugationPersonKey =
  | '1sg'
  | '1pl'
  | '2msg'
  | '2fsg'
  | '2mpl'
  | '2fpl'
  | '3msg'
  | '3fsg'
  | '3mpl'
  | '3fpl'
  | '3pl'

/** Clés pour impératif (pas de personne). */
export type ConjugationImperativeKey = 'msg' | 'fsg' | 'mpl' | 'fpl'

export interface ConjugationTable {
  present?: Partial<Record<ConjugationImperativeKey, ConjugationCell>>
  past?: Partial<Record<ConjugationPersonKey, ConjugationCell>>
  future?: Partial<Record<ConjugationPersonKey, ConjugationCell>>
  imperative?: Partial<Record<ConjugationImperativeKey, ConjugationCell>>
  infinitive?: ConjugationCell
}

export interface VocabularyEntry {
  id: string
  french: string
  hebrew: string
  transcription: string
  /** Forme plurielle — affichée après « / » quand présente */
  hebrewPlural?: string
  transcriptionPlural?: string
  /** Thème — utiliser une valeur de `VocabularyCategory` ; `string` accepté pour les anciennes catégories. */
  category?: VocabularyCategory | string
  tense?: 'present' | 'past' | 'future'
  person?: string
  verb?: string
  partOfSpeech?: PartOfSpeech
  gender?: NounGender
  binyan?: Binyan
  /** Racine (shoresh) — verbes uniquement, ex. 'א-כ-ל' ou 'נ-ש-ק-ה' */
  root?: string
  /** Tableau de conjugaison — verbes du deck actif uniquement */
  conjugation?: ConjugationTable
  /** Note pédagogique optionnelle (exception, règle, etc.) */
  note?: string
}
