import { useCallback, useEffect, useRef, useState } from 'react'
import type { VocabularyEntry } from '../data/types'
import { FlipCard } from './FlipCard'
import shuffleIcon from '../assets/shuffle.svg'
import flipIcon from '../assets/flip.svg'

interface FlashcardExerciseProps {
  cards: VocabularyEntry[]
  title?: string
}

// Doit correspondre à la durée dans flip-card.css (0.5s)
const FLIP_DURATION_MS = 500

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function FlashcardExercise({ cards: sourceCards, title }: FlashcardExerciseProps) {
  const [cards, setCards] = useState(sourceCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const isFlippedRef = useRef(isFlipped)
  const isNavigatingRef = useRef(false)
  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  isFlippedRef.current = isFlipped

  const currentCard = cards[currentIndex]

  const afterFlipIfNeeded = useCallback((action: () => void) => {
    if (isNavigatingRef.current) return

    if (isFlippedRef.current) {
      isNavigatingRef.current = true
      setIsNavigating(true)
      setIsFlipped(false)
      navigateTimeoutRef.current = setTimeout(() => {
        action()
        isNavigatingRef.current = false
        setIsNavigating(false)
        navigateTimeoutRef.current = null
      }, FLIP_DURATION_MS)
    } else {
      action()
    }
  }, [])

  const goToNext = useCallback(() => {
    afterFlipIfNeeded(() => {
      setCurrentIndex((index) => (index < cards.length - 1 ? index + 1 : 0))
    })
  }, [afterFlipIfNeeded, cards.length])

  const handleShuffle = () => {
    afterFlipIfNeeded(() => {
      setCards(shuffleArray(sourceCards))
      setCurrentIndex(0)
    })
  }

  const handleFlip = useCallback(() => {
    if (!isNavigatingRef.current) {
      setIsFlipped((flipped) => !flipped)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goToNext()
      if (event.key === ' ') {
        event.preventDefault()
        handleFlip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, handleFlip])

  if (sourceCards.length === 0) {
    return (
      <div className="exercise">
        {title && <h2 className="exercise-title">{title}</h2>}
        <p className="exercise-empty">Aucune carte dans ce lexique.</p>
      </div>
    )
  }

  if (!currentCard) return null

  return (
    <div className="exercise">
      {title && <h2 className="exercise-title">{title}</h2>}
      <div className="exercise-header">
        <p className="exercise-counter">
          {currentIndex + 1} / {cards.length}
        </p>
      </div>

      <FlipCard
        key={currentCard.id}
        entry={currentCard}
        isFlipped={isFlipped}
        onFlip={() => !isNavigating && setIsFlipped((flipped) => !flipped)}
      />

      <div className="exercise-controls">
        <button type="button" className="btn btn-secondary btn-with-icon" onClick={handleShuffle} disabled={isNavigating}>
        <img src={shuffleIcon} alt="" className="btn-icon" width={18} height={18} />
          Mélanger les cartes
        </button>
        <button type="button" className="btn btn-flip btn-with-icon" onClick={handleFlip} disabled={isNavigating}>
        <img src={flipIcon} alt="" className="btn-icon" width={18} height={18} />
          {isFlipped ? 'Voir le français' : 'Voir La Traduction'}
        </button>
        <button type="button" className="btn btn-primary" onClick={goToNext} disabled={isNavigating}>
          Carte Suivante
        </button>
      </div>

     
    </div>
  )
}