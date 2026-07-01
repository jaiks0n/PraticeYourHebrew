import type { JasonVocabularyEntry } from '../data/jason-vovabulary'
import '../styles/flip-card.css'
import '../styles/devside.css'

interface DevsideFlipCardProps {
  entry: JasonVocabularyEntry
  isFlipped: boolean
  onFlip: () => void
}

export function DevsideFlipCard({ entry, isFlipped, onFlip }: DevsideFlipCardProps) {
  const handleFaceKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFlip()
    }
  }

  return (
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
            <p className="devside-flip-card-english">{entry.english}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
