import { useState } from 'react'
import type { VocabularyEntry } from '../data/types'
import { ConjugationModal } from './ConjugationModal'
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
  const [showConjugation, setShowConjugation] = useState(false)
  const hasConjugation = Boolean(entry.conjugation)

  const handleFaceKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFlip()
    }
  }

  return (
    <>
      <div className="flip-card">
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div
            className="flip-card-face flip-card-front"
            role="button"
            tabIndex={0}
            onClick={onFlip}
            onKeyDown={handleFaceKeyDown}
            aria-label="Retourner la carte (verso hébreu)"
          >
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
            <div
              className="flip-card-back-content"
              role="button"
              tabIndex={0}
              onClick={onFlip}
              onKeyDown={handleFaceKeyDown}
              aria-label="Retourner la carte (recto français)"
            >
              <span className="flip-card-label">Hébreu</span>
              <p className="flip-card-hebrew" dir="rtl" lang="he">
                {entry.hebrew}
              </p>
              <p className="flip-card-transcription">{entry.transcription}</p>
            </div>
            {hasConjugation && (
              <button
                type="button"
                className="flip-card-conj-btn"
                onClick={() => setShowConjugation(true)}
              >
                Tableau de conjugaison
              </button>
            )}
          </div>
        </div>
      </div>

      {showConjugation && entry.conjugation && (
        <ConjugationModal
          french={entry.french}
          hebrew={entry.hebrew}
          conjugation={entry.conjugation}
          onClose={() => setShowConjugation(false)}
        />
      )}
    </>
  )
}
