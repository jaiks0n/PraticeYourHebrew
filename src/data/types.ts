export interface VocabularyEntry {
  id: string
  french: string
  hebrew: string
  transcription: string
  category?: string
  tense?: 'present' | 'past' | 'future'
  person?: string
  verb?: string
}

export interface ConjugationEntry extends VocabularyEntry {
  tense: 'present'
}
