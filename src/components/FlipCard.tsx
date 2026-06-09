import { useRef, useState } from 'react'
import type { VocabularyEntry } from '../data/types'
import '../styles/flip-card.css'

interface FlipCardProps {
  entry: VocabularyEntry
  isFlipped: boolean
  onFlip: () => void
  audioFolder?: string
}

const TENSE_LABELS: Record<string, string> = {
  present: 'Présent',
  past: 'Passé',
  future: 'Futur',
}

const AUDIO_EXTENSIONS = ['mp3', 'mp4'] as const

function getAudioUrls(audioFolder: string, entryId: string) {
  return AUDIO_EXTENSIONS.map((ext) => `/audio/${audioFolder}/${entryId}.${ext}`)
}

export function FlipCard({ entry, isFlipped, onFlip, audioFolder }: FlipCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioIndexRef = useRef(0)
  const [audioError, setAudioError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const isConjugation = Boolean(entry.tense)
  const hint = isConjugation
    ? 'Conjuguez à voix haute, puis cliquez'
    : 'Dites le mot à voix haute, puis cliquez'

  const audioUrls = audioFolder ? getAudioUrls(audioFolder, entry.id) : []

  const handlePlayAudio = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (!audioRef.current || audioUrls.length === 0) return

    setAudioError(false)
    setIsPlaying(false)
    audioIndexRef.current = 0
    audioRef.current.src = audioUrls[0]
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => setAudioError(true))
  }

  const handleAudioEnded = () => setIsPlaying(false)
  const handleAudioPlay = () => setIsPlaying(true)
  const handleAudioError = () => {
    const audio = audioRef.current
    if (!audio) return

    const nextIndex = audioIndexRef.current + 1
    if (nextIndex < audioUrls.length) {
      audioIndexRef.current = nextIndex
      audio.src = audioUrls[nextIndex]
      audio.play().catch(() => setAudioError(true))
      return
    }

    setIsPlaying(false)
    setAudioError(true)
  }

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
          <p className="flip-card-hint">{hint}</p>
        </div>
        <div className="flip-card-face flip-card-back">
          <span className="flip-card-label">Hébreu</span>
          <p className="flip-card-hebrew" dir="rtl" lang="he">
            {entry.hebrew}
          </p>
          <p className="flip-card-transcription">{entry.transcription}</p>
          {audioUrls.length > 0 && (
            <>
              <button
                type="button"
                className="flip-card-audio-btn"
                onClick={handlePlayAudio}
                aria-label="Écouter la prononciation"
              >
                {isPlaying ? 'Lecture...' : 'Écouter'}
              </button>
              {audioError && (
                <span className="flip-card-audio-error">Audio non disponible</span>
              )}
              <audio
                ref={audioRef}
                preload="none"
                onEnded={handleAudioEnded}
                onPlay={handleAudioPlay}
                onError={handleAudioError}
              />
            </>
          )}
        </div>
      </div>
    </button>
  )
}
