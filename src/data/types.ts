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

export const NOUN_GENDERS = ['masculine', 'feminine'] as const satisfies readonly NounGender[]

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

/** Thèmes recommandés + catégories encore présentes dans vocabulary.ts (legacy, à migrer pendant la relecture). */
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

export interface VocabularyEntry {
  id: string
  french: string
  hebrew: string
  transcription: string
  /** Thème — utiliser une valeur de `VocabularyCategory` ; `string` accepté pour les anciennes catégories. */
  category?: VocabularyCategory | string
  tense?: 'present' | 'past' | 'future'
  person?: string
  verb?: string
  partOfSpeech?: PartOfSpeech
  gender?: NounGender
  binyan?: Binyan
}

export interface ConjugationEntry extends VocabularyEntry {
  tense: 'present'
}

export interface NounGenderEntry {
  id: string
  hebrew: string
  transcription: string
  french: string
  gender: NounGender
  category?: VocabularyCategory | string
}
