import type { VocabularyEntry } from '../data/types'

export function formatHebrewDisplay(entry: Pick<VocabularyEntry, 'hebrew' | 'hebrewPlural'>): string {
  return entry.hebrewPlural ? `${entry.hebrew} / ${entry.hebrewPlural}` : entry.hebrew
}

export function formatTranscriptionDisplay(
  entry: Pick<VocabularyEntry, 'transcription' | 'transcriptionPlural'>,
): string {
  return entry.transcriptionPlural ? `${entry.transcription} / ${entry.transcriptionPlural}` : entry.transcription
}
