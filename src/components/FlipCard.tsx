import type { VocabularyEntry } from '../data/types'
import '../styles/flip-card.css'

interface FlipCardProps {
  entry: VocabularyEntry
  isFlipped: boolean
  onFlip: () => void
}

const TENSE_LABELS: Record<string, string> = {
  present: 'Présent',
  past: 'Passé',
  future: 'Futur',
}

export function FlipCard({ entry, isFlipped, onFlip }: FlipCardProps) {
  return (
    <button
      type="button"
      className="flip-card"
      onClick={onFlip}
      aria-label={isFlipped ? 'Retourner la carte (recto)' : 'Retourner la carte (verso)'}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-face flip-card-front">
          <span className="flip-card-label">Français</span>
          {(entry.tense || entry.person) && (
            <div className="flip-card-badges">
              {entry.tense && (
                <span className="flip-card-badge">{TENSE_LABELS[entry.tense] ?? entry.tense}</span>
              )}
              {entry.person && (
                <span className="flip-card-badge">{entry.person}</span>
              )}
            </div>
          )}
          <p className="flip-card-french">{entry.french}</p>
        </div>
        <div className="flip-card-face flip-card-back">
          <span className="flip-card-label">Hébreu</span>
          <p className="flip-card-hebrew" dir="rtl" lang="he">
            {entry.hebrew}
          </p>
          <p className="flip-card-transcription">{entry.transcription}</p>
        </div>
      </div>
    </button>
  )
}
