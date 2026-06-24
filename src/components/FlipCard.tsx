import { useState } from 'react'
import type { Binyan, NounGender, VocabularyEntry } from '../data/types'
import { formatHebrewDisplay, formatTranscriptionDisplay } from '../utils/formatNounHebrew'
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

const GENDER_LABELS: Record<NounGender, string> = {
  masculine: 'Masculin',
  feminine: 'Féminin',
}

const BINYAN_LABELS: Record<Binyan, string> = {
  paal: "Pa'al",
  nifal: "Nif'al",
  piel: "Pi'el",
  pual: "Pu'al",
  hifil: "Hif'il",
  hufal: "Huf'al",
  hitpael: "Hitpa'el",
}

const VISIBLE_BINYANIM: Binyan[] = ['paal', 'nifal', 'piel', 'hifil', 'hitpael']

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
                {formatHebrewDisplay(entry)}
              </p>
              <p className="flip-card-transcription">{formatTranscriptionDisplay(entry)}</p>              {entry.gender && (
                <span className={`flip-card-gender flip-card-gender--${entry.gender}`}>
                  {GENDER_LABELS[entry.gender]}
                </span>
              )}
              {entry.binyan && VISIBLE_BINYANIM.includes(entry.binyan) && (
                <span className={`flip-card-binyan flip-card-binyan--${entry.binyan}`}>
                  {BINYAN_LABELS[entry.binyan]}
                </span>
              )}
              {entry.note && (
                <p className="flip-card-note">{entry.note}</p>
              )}
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
